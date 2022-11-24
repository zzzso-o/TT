package com.tt9ood.api.service;

import com.tt9ood.db.entity.User;

public interface GoogleService {
    User createUser(String emailFromGoogle);
}
