package com.tt9ood.api.controller;

import com.tt9ood.api.service.GoogleService;
import com.tt9ood.common.model.response.BaseResponseBody;
import com.tt9ood.db.entity.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/google")
public class GoogleController {

    @Autowired
    GoogleService googleService;

    @PostMapping("/register")
    @ApiOperation(value = "구글 로그인 이후로 반환되는 정보를 통한 회원 가입", notes = "구글 정보를 활용해 유저 정보를 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="회원가입 정보", required = true) String emailFromGoogle) {

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        String replaceEmail = emailFromGoogle.replace("%40", "@").replace("=", "");
        User user = googleService.createUser(replaceEmail);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
