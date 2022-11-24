package com.tt9ood.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

import javax.persistence.*;

/**
 * 유저 모델 정의.
 */
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Setter
@Getter
//public class User extends BaseEntity{
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_code")
    private Long userCode;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_nickname")
    private String userNickname;

    @Column(name = "user_phone")
    private String userPhone;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_gender")
    private String userGender;

    @Column(name = "user_authority")
    private String userAuthority;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "user_pw")
    private String userPw;

    public void update(String userNickname, String userPhone, String userEmail, String userPw){
        this.userNickname = userNickname;
        this.userPhone = userPhone;
        this.userEmail = userEmail;
        this.userPw = userPw;
    }
}
