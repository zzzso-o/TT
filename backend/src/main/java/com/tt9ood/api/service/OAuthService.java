package com.tt9ood.api.service;

import com.tt9ood.api.component.GoogleOAuthToken;
import com.tt9ood.api.component.GoogleOauth;
import com.tt9ood.api.component.GoogleUser;
import com.tt9ood.api.dto.UserDto;
import com.tt9ood.api.request.UserRegisterPostReq;
import com.tt9ood.api.response.UserLoginPostRes;
import com.tt9ood.common.util.JwtTokenUtil;
import com.tt9ood.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OAuthService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    private final GoogleOauth googleOauth;
    private final HttpServletResponse response;

    public String request() throws IOException {
        String redirectURL;

        // 소셜로그인을 요청하면 소셜로그인 페이지로 리다이렉트 해주는 프로세스이다.
        redirectURL=googleOauth.getOauthRedirectURL();
//        response.sendRedirect(redirectURL);
        return redirectURL;
    }

    public ResponseEntity<UserLoginPostRes> oAuthLogin(String code) throws IOException{
        // 구글로 일회성 코드를 보내 엑세스 토큰이 담긴 응답객체를 받아옴
        ResponseEntity<String> accessTokenResponse=googleOauth.requestAccessToken(code);
        // 응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담기
        GoogleOAuthToken oAuthToken=googleOauth.getAccessToken(accessTokenResponse);

        // 액세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답객체를 받아옴
        ResponseEntity<String> userInfoResponse=googleOauth.requestUserInfo(oAuthToken);
        // 다시 JSon 형식의 응답객체를 자바 객체로 역직렬화
        GoogleUser googleUser=googleOauth.getUserInfo(userInfoResponse);

        String user_id= googleUser.getEmail();

        // 우리 서버의 db와 대조하여 해당 user가 존재하는지 확인
        UserRegisterPostReq registerInfo=new UserRegisterPostReq();
        registerInfo.setUserId(googleUser.getId());
        registerInfo.setUserNickname(googleUser.getName());
        registerInfo.setUserEmail(googleUser.getEmail());
        registerInfo.setUserPhone("");
        registerInfo.setUserGender("");
        registerInfo.setUserPw("");


        // user가 존재하지 않는다면 회원가입
        List<UserDto> userList=userRepository.findByEmail(googleUser.getEmail());
        if(userList.size()==0){
            userService.createUser(registerInfo);
        }

        // 로그인
        String userId = googleUser.getId();
        Instant MAX_SECOND = Instant.now().plusSeconds(86400);

        return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId), JwtTokenUtil.getToken(MAX_SECOND, userId), userId,""));

    }

}
