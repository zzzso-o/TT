package com.tt9ood.api.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 시그널 전달 클래스 - 몬스터 정보
 */
@Getter
@Setter
@NoArgsConstructor
@ApiModel("MonSignalDto")
public class MonSignalDto {
    // 지역 이름
    int mapArea;
    // 몬스터 아이디
    int monsterId;
    // 등장하는 몬스터 숫자
    int monsterNum;
}
