package com.tt9ood.api.service;

import com.tt9ood.api.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tt9ood.api.request.UserRegisterPostReq;
import com.tt9ood.db.entity.User;
import com.tt9ood.db.repository.UserRepository;
import com.tt9ood.db.repository.UserRepositorySupport;

import java.util.List;

import javax.transaction.Transactional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public Boolean createUser(UserRegisterPostReq userRegisterInfo) {
		String userId = userRegisterInfo.getUserId();

		if (userRepositorySupport.findUserByUserId(userId).isPresent()) {
			return false;
		}
		else {
			User user = new User();
			user.setUserId(userId);
			user.setUserEmail(userRegisterInfo.getUserEmail());
			user.setUserGender(userRegisterInfo.getUserGender());
			user.setUserNickname(userRegisterInfo.getUserNickname());
			user.setUserPhone(userRegisterInfo.getUserPhone());
			// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
			user.setUserPw(passwordEncoder.encode(userRegisterInfo.getUserPw()));
			// notice 권한을 위해서 추가
			user.setUserAuthority("");

			System.out.println("==============================================");
			System.out.println(userRegisterInfo.getUserNickname());
			System.out.println("==============================================");

			userRepository.save(user);

			return true;
		}
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserId(userId).get();
		return user;
	}

	@Override
	public boolean emailExist(String email) {
		List<UserDto> userList=userRepository.findByEmail(email);
		if(userList.size()!=0)
			return true;
		else
			return false;

	}



	@Transactional
	@Override
	public void update(String userId, UserRegisterPostReq userDto) {
		User user = userRepository.findByUserId(userId).orElseThrow(()-> new IllegalArgumentException("해당하는 아이디 없음"));
		String encPassword = passwordEncoder.encode(userDto.getUserPw());
		user.update(userDto.getUserNickname(), userDto.getUserEmail(), userDto.getUserPhone(), encPassword);
		userRepository.flush();
	}

	@Transactional
	@Override
	public void delete(String userId) {
		User user = userRepository.findByUserId(userId).orElseThrow(()-> new IllegalArgumentException("해당하는 아이디 없음"));
		userRepository.delete(user);
	}
}
