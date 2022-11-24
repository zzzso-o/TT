package com.tt9ood.api.controller;

import com.tt9ood.api.component.GetSocialOAuthRes;
import com.tt9ood.api.response.UserLoginPostRes;
import com.tt9ood.api.service.OAuthService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Api(value = "구글 소셜로그인 API", tags = {"google."})
@CrossOrigin(origins = "https://accounts.google.com")
@RestController
@RequestMapping("/api/OAuth")
public class GoogleOauthController {

    @Autowired
    private OAuthService oAuthService;

    @GetMapping("google")
    public String socialLoginRedirect() throws IOException{
        return oAuthService.request();
    }

    @ResponseBody
    @GetMapping(value = "/google/callback")
    public ResponseEntity<UserLoginPostRes> callback(
            @RequestParam(name = "code") String code) throws Exception{
        System.out.println(">> 소셜 로그인 API 서버로부터 받은 code : "+code);
        return oAuthService.oAuthLogin(code);

    }

}
