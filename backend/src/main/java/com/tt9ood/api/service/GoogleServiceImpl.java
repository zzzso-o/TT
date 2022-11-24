package com.tt9ood.api.service;

import com.tt9ood.db.entity.User;
import com.tt9ood.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GoogleServiceImpl implements GoogleService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User createUser(String emailFromGoogle) {
        if (userRepository.findByUserId(emailFromGoogle).isPresent()) {
            System.out.println("emailFromGoogle = " + emailFromGoogle);
            Optional<User> byUserId = userRepository.findByUserId(emailFromGoogle);
            return byUserId.get();
        } else {
            User user = new User();
            user.setUserId(emailFromGoogle);
            user.setUserEmail(emailFromGoogle);
            user.setUserGender(null);
            user.setUserNickname(emailFromGoogle);
            user.setUserPhone(null);
            // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
            user.setUserPw(null);
            // notice 권한을 위해서 추가
            user.setUserAuthority("");
            return userRepository.save(user);
        }
    }
}
