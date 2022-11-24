package com.tt9ood.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/user/register) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 ID", example="your_id")
	String userId;
	@ApiModelProperty(name="유저 Password", example="your_password")
	String userPw;
	@ApiModelProperty(name="유저 별명", example="your_nickname")
	String userNickname;
	@ApiModelProperty(name="유저 전화번호", example="your_phone")
	String userPhone;
	@ApiModelProperty(name="유저 이메일", example="your_email")
	String userEmail;
	@ApiModelProperty(name="유저 성별", example="your_gender")
	String userGender;
}
