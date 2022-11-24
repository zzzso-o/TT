package com.tt9ood.api.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel("UserDto")
public class UserDto {

    private String userEmail;

    public UserDto(String userEmail) {
        this.userEmail = userEmail;
    }
}
