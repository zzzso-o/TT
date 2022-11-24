package com.tt9ood.api.response;

import com.tt9ood.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/user/login) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserLoginPostRes extends BaseResponseBody{
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;
	String refreshToken;
	String userId;
	String userAuthority;
	
	public static UserLoginPostRes of(Integer statusCode, String message, String accessToken, String refreshToken,
									  String userId, String userAuthority) {
		UserLoginPostRes res = new UserLoginPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		res.setRefreshToken(refreshToken);
		res.setUserId(userId);
		res.setUserAuthority(userAuthority);
		return res;
	}
}
