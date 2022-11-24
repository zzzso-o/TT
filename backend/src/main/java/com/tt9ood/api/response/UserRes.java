package com.tt9ood.api.response;

import com.tt9ood.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/user/userinfo) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	long userCode;
	@ApiModelProperty(name="유저 아이디")
	String userId;
	@ApiModelProperty(name="유저 별명", example="your_nickname")
	String userNickname;
	@ApiModelProperty(name="유저 전화번호", example="your_phone")
	String userPhone;
	@ApiModelProperty(name="유저 이메일", example="your_email")
	String userEmail;
	@ApiModelProperty(name="유저 성별", example="your_gender")
	String userGender;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserCode(user.getUserCode());
		res.setUserId(user.getUserId());
		res.setUserNickname(user.getUserNickname());
		res.setUserPhone(user.getUserPhone());
		res.setUserEmail(user.getUserEmail());
		res.setUserGender(user.getUserGender());
		return res;
	}
}
