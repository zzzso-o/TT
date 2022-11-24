package com.tt9ood.api.service;

import com.tt9ood.api.request.UserRegisterPostReq;
import com.tt9ood.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	Boolean createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	boolean emailExist(String email);

	void update(String userId, UserRegisterPostReq userDto);

	void delete(String userId);
}
