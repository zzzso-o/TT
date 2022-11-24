package com.tt9ood.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor
@Entity
public class RoomInfo {
    // 방 코드 번호 - 자동 생성
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_code")
    private long roomCode;
    // GM 유저 코드
    @Column(name = "room_gm_user_code")
    private long gmUserCode;
    // 플레이어1 코드
    @Column(name = "room_py1_user_code")
    private long py1Code;
    // 플레이어2 코드
    @Column(name = "room_py2_user_code")
    private long py2Code;
    // 플레이어3 코드
    @Column(name = "room_py3_user_code")
    private long py3Code;
    // 플레이어4 코드
    @Column(name = "room_py4_user_code")
    private long py4Code;
    // 플레이어5 코드
    @Column(name = "room_py5_user_code")
    private long py5Code;


}
