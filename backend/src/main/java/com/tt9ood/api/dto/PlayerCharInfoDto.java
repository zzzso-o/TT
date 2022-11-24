package com.tt9ood.api.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 플레이어 캐릭터 전달 클래스
 */
@Getter
@Setter
@NoArgsConstructor
@ApiModel("PlayerCharInfoDto")
public class PlayerCharInfoDto {

    private Long playerCode;
    private String playerSpecies;
    private String playerName;
    private String playerLook;
    private String playerValue;
    private String playerWeapon;
    private String playerArmor;
    private int playerHP;
    private int playerSup1;
    private int playerSup2;
    private int playerSup3;
    private Long playerUserCode;
    private int playerStat1;
    private int playerStat2;
    private int playerStat3;
    private int playerStat4;
    private int playerStat5;
    private int playerStat6;
    private String playerClassName;
    private String playerSkill1;
    private String playerSkill2;
    private String playerSkill3;

    public PlayerCharInfoDto(Long playerCode, Long playerUserCode, String playerSpecies, String playerName, String playerLook, String playerValue, String playerWeapon, String playerArmor, int playerHP, int playerSup1, int playerSup2, int playerSup3, int playerStat1, int playerStat2, int playerStat3, int playerStat4, int playerStat5, int playerStat6, String playerClassName, String playerSkill1, String playerSkill2, String playerSkill3) {
        this.playerCode = playerCode;
        this.playerUserCode = playerUserCode;
        this.playerSpecies = playerSpecies;
        this.playerName = playerName;
        this.playerLook = playerLook;
        this.playerValue = playerValue;
        this.playerWeapon = playerWeapon;
        this.playerArmor = playerArmor;
        this.playerHP = playerHP;
        this.playerSup1 = playerSup1;
        this.playerSup2 = playerSup2;
        this.playerSup3 = playerSup3;
        this.playerStat1 = playerStat1;
        this.playerStat2 = playerStat2;
        this.playerStat3 = playerStat3;
        this.playerStat4 = playerStat4;
        this.playerStat5 = playerStat5;
        this.playerStat6 = playerStat6;
        this.playerClassName = playerClassName;
        this.playerSkill1 = playerSkill1;
        this.playerSkill2 = playerSkill2;
        this.playerSkill3 = playerSkill3;
    }


    @Setter @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadProfile {
        private Long playerCode;
        private String playerSpecies;
        private String playerName;
        private String playerLook;
        private String playerValue;
        private String playerWeapon;
        private String playerArmor;
        private int playerMaxHP;
        private int playerHP;
        private int playerSup1;
        private int playerSup2;
        private int playerSup3;
        private Long playerUserCode;
        private int playerStat1;
        private int playerStat2;
        private int playerStat3;
        private int playerStat4;
        private int playerStat5;
        private int playerStat6;
        private String playerClassName;
        private String playerSkill1;
        private String playerSkill2;
        private String playerSkill3;
    }

    @Setter @Getter
    public static class HpInfo {
        private int amountOfChangeHp;
    }

    @Setter @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatInfo {
        private int statIndex;
        private int amountOfChangeStat;
    }
}
