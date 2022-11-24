package com.tt9ood.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class InGameProfileDto {
    String userNickname;
    String playerValue;
    String playerClassName;
    String playerName;
}
