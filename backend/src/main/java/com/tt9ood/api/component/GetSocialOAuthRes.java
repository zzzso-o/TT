package com.tt9ood.api.component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
// 클라이언트로 보낼 jwtToekn, accessToken 등이 담긴 객체
public class GetSocialOAuthRes {

    private String jwtToken;
    private int user_num;
    private String accessToken;
    private String tokenType;
}
