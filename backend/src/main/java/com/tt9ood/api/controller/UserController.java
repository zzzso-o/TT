package com.tt9ood.api.controller;

import com.tt9ood.api.response.UserLoginPostRes;
import com.tt9ood.common.util.JwtTokenUtil;
import com.tt9ood.db.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tt9ood.api.request.UserRegisterPostReq;
import com.tt9ood.api.service.UserService;
import com.tt9ood.common.model.response.BaseResponseBody;
import com.tt9ood.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User."})
@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/register")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		Boolean isCreated = userService.createUser(registerInfo);
		String message = "";
		if (isCreated) {
			message = "true";
		} else {
			message = "false";
		}
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, message));
	}
	
	@GetMapping("/userinfo/{userId}")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> userInfo(@PathVariable String userId) {

		return ResponseEntity.status(200).body(userService.getUserByUserId(userId));
	}

	@PutMapping("/userinfo/{userId}")
	@ApiOperation(value = "회원 본인 정보 수정", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> userUpdate(@PathVariable String userId, @RequestBody UserRegisterPostReq userDto) {
		userService.update(userId, userDto);
		return ResponseEntity.status(200).body(userId);
	}

	@DeleteMapping("/userinfo/{userId}")
	@ApiOperation(value = "회원 본인 정보 삭제", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> userDelete(@PathVariable String userId) {
		userService.delete(userId);
		return ResponseEntity.status(200).body(userId);
	}

	@GetMapping("/naver/connect")
	@ApiOperation(value = "네이버 인가코드 받기", notes = "네이버에서 인가코드를 받아온다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> naverConnect(){
		// state(위조방지를 위한 요청코드) 생성
		SecureRandom random=new SecureRandom();
		String state=new BigInteger(130,random).toString(32);

		// redirect
		StringBuffer url=new StringBuffer();
		url.append("https://nid.naver.com/oauth2.0/authorize?");
		url.append("client_id=jbcv39niumHGnhK8cBgn");
		url.append("&response_type=code");
		url.append("&redirect_uri=http://i7a809.p.ssafy.io/login/naver/login");
		url.append("&state="+state);

		return ResponseEntity.status(200).body("redirect:"+url);
	}

	@PostMapping("/naver/login")
	@ApiOperation(value = "네이버에서 토큰받기", notes = "인가코드를 이용하여 네이버에서 토큰을 받아온다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> naverLogin(@RequestParam(value="code") String code, @RequestParam(value="state") String state){

		//네이버에 요청하기
		WebClient webclient=WebClient.builder()
				.baseUrl("https://nid.naver.com")
				.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.build();

		JSONObject response=webclient.post()
				.uri(uriBuilder->uriBuilder
						.path("/oauth2.0/token")
						.queryParam("client_id","jbcv39niumHGnhK8cBgn")
						.queryParam("client_secret","yW8sibYPD6")
						.queryParam("grant_type","authorization_code")
						.queryParam("state",state)
						.queryParam("code",code)
						.build())
				.retrieve().bodyToMono(JSONObject.class).block();

		String token=response.getString("access_token");
		String userId=getUserInfo(token);

		// 로그인
		Instant MAX_SECOND = Instant.now().plusSeconds(86400);
		return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId), JwtTokenUtil.getToken(MAX_SECOND, userId), userId, ""));

	}

	public String getUserInfo(String accessToken){
		// 받아온 토큰을 이용하여 프로필정보 받아오기
		WebClient webclient=WebClient.builder()
				.baseUrl("https://openapi.naver.com")
				.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.build();

		JSONObject response=webclient.get()
				.uri(uriBuilder -> uriBuilder
						.path("/v1/nid/me")
						.build())
				.header("Authorization","Bearer "+accessToken)
				.retrieve()
				.bodyToMono(JSONObject.class).block();

		Map<String, Object> res=(Map<String, Object>) response.get("response");

		UserRegisterPostReq registerInfo=new UserRegisterPostReq();
		registerInfo.setUserId((String)res.get("id"));
		registerInfo.setUserNickname((String)res.get("nickname"));
		registerInfo.setUserEmail((String)res.get("email"));
		registerInfo.setUserPhone((String)res.get("mobile"));
		registerInfo.setUserGender((String)res.get("gender"));

		// 해당 이메일 아이디가 없으면 회원가입
		if(userService.emailExist((String)res.get("email"))){
			userService.createUser(registerInfo);
		}

		return (String)res.get("id");

	}

}
