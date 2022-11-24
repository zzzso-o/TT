package com.tt9ood.api.service;

import com.tt9ood.api.dto.PlayerCharInfoDto;
import com.tt9ood.db.entity.PlayerCharInfo;
import com.tt9ood.db.repository.PlayerCharInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@Service("PlayerCharInfoService")
public class PlayerCharInfoServiceImpl implements PlayerCharInfoService {

    @Autowired
    PlayerCharInfoRepository playerCharInfoRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public PlayerCharInfo createPlayerInfo(PlayerCharInfoDto playerInfoDto) {

        // 기존 플레이어가 있으면 삭제
        Optional<PlayerCharInfo> byId=playerCharInfoRepository.findByPlayerUserCode(playerInfoDto.getPlayerUserCode());
        // 없는 경우 출력형태 : byId = Optional.empty
        if(byId.isPresent()){
            deletePlayerInfo(byId.get().getPlayerCode());
        }

        PlayerCharInfo playerCharInfo=new PlayerCharInfo(playerInfoDto.getPlayerCode(),
                playerInfoDto.getPlayerUserCode(),
                playerInfoDto.getPlayerSpecies(),
                playerInfoDto.getPlayerName(),
                playerInfoDto.getPlayerLook(),
                playerInfoDto.getPlayerValue(),
                playerInfoDto.getPlayerWeapon(),
                playerInfoDto.getPlayerArmor(),
                playerInfoDto.getPlayerHP()+playerInfoDto.getPlayerStat3(), // 최대 hp = 캐릭터 고유 hp + 스탯의 체력
                playerInfoDto.getPlayerHP()+playerInfoDto.getPlayerStat3(), // 초기 생성시 현재 hp = 최대 hp = 캐릭터 고유 hp + 스탯의 체력
                playerInfoDto.getPlayerSup1(),
                playerInfoDto.getPlayerSup2(),
                playerInfoDto.getPlayerSup3(),
                playerInfoDto.getPlayerStat1(),
                playerInfoDto.getPlayerStat2(),
                playerInfoDto.getPlayerStat3(),
                playerInfoDto.getPlayerStat4(),
                playerInfoDto.getPlayerStat5(),
                playerInfoDto.getPlayerStat6(),
                playerInfoDto.getPlayerClassName(),
                playerInfoDto.getPlayerSkill1(),
                playerInfoDto.getPlayerSkill2(),
                playerInfoDto.getPlayerSkill3());
        return playerCharInfoRepository.save(playerCharInfo);
    }

    @Override
    public PlayerCharInfoDto.ReadProfile readPlayerInfo(long playerCode) {
        PlayerCharInfoDto.ReadProfile playerInfoDtoReadProfile = new PlayerCharInfoDto.ReadProfile();
        Optional<PlayerCharInfo> byId=playerCharInfoRepository.findByPlayerUserCode(playerCode);
        if(byId.isPresent()){
            PlayerCharInfo playerInfo=byId.get();
            playerInfoDtoReadProfile.setPlayerUserCode(playerInfo.getPlayerUserCode());
            playerInfoDtoReadProfile.setPlayerSpecies(playerInfo.getPlayerSpecies());
            playerInfoDtoReadProfile.setPlayerName(playerInfo.getPlayerName());
            playerInfoDtoReadProfile.setPlayerLook(playerInfo.getPlayerLook());
            playerInfoDtoReadProfile.setPlayerValue(playerInfo.getPlayerValue());
            playerInfoDtoReadProfile.setPlayerWeapon(playerInfo.getPlayerWeapon());
            playerInfoDtoReadProfile.setPlayerArmor(playerInfo.getPlayerArmor());
            playerInfoDtoReadProfile.setPlayerMaxHP(playerInfo.getPlayerMaxHP());
            playerInfoDtoReadProfile.setPlayerHP(playerInfo.getPlayerHP());
            playerInfoDtoReadProfile.setPlayerSup1(playerInfo.getPlayerSup1());
            playerInfoDtoReadProfile.setPlayerSup2(playerInfo.getPlayerSup2());
            playerInfoDtoReadProfile.setPlayerSup3(playerInfo.getPlayerSup3());
            playerInfoDtoReadProfile.setPlayerStat1(playerInfo.getPlayerStat1());
            playerInfoDtoReadProfile.setPlayerStat2(playerInfo.getPlayerStat2());
            playerInfoDtoReadProfile.setPlayerStat3(playerInfo.getPlayerStat3());
            playerInfoDtoReadProfile.setPlayerStat4(playerInfo.getPlayerStat4());
            playerInfoDtoReadProfile.setPlayerStat5(playerInfo.getPlayerStat5());
            playerInfoDtoReadProfile.setPlayerStat6(playerInfo.getPlayerStat6());
            playerInfoDtoReadProfile.setPlayerClassName(playerInfo.getPlayerClassName());
            playerInfoDtoReadProfile.setPlayerSkill1(playerInfo.getPlayerSkill1());
            playerInfoDtoReadProfile.setPlayerSkill2(playerInfo.getPlayerSkill2());
            playerInfoDtoReadProfile.setPlayerSkill3(playerInfo.getPlayerSkill3());

            return playerInfoDtoReadProfile;
        }
        return null;
    }

    @Override
    public PlayerCharInfoDto.ReadProfile updatePlayerInfo(long playerCode, PlayerCharInfoDto playerInfoForUpdate) {
        PlayerCharInfoDto.ReadProfile playerInfoDtoReadProfile = new PlayerCharInfoDto.ReadProfile();

        Optional<PlayerCharInfo> byId=playerCharInfoRepository.findByPlayerUserCode(playerCode);
        if(byId.isPresent()){
            PlayerCharInfo playerInfo=byId.get();

            playerInfo.updatePlayerCharInfo(
                    playerInfoForUpdate.getPlayerUserCode(),
                    playerInfoForUpdate.getPlayerSpecies(),
                    playerInfoForUpdate.getPlayerName(),
                    playerInfoForUpdate.getPlayerLook(),
                    playerInfoForUpdate.getPlayerValue(),
                    playerInfoForUpdate.getPlayerWeapon(),
                    playerInfoForUpdate.getPlayerArmor(),
                    playerInfoForUpdate.getPlayerHP(),
                    playerInfoForUpdate.getPlayerSup1(),
                    playerInfoForUpdate.getPlayerSup2(),
                    playerInfoForUpdate.getPlayerSup3(),
                    playerInfoForUpdate.getPlayerStat1(),
                    playerInfoForUpdate.getPlayerStat2(),
                    playerInfoForUpdate.getPlayerStat3(),
                    playerInfoForUpdate.getPlayerStat4(),
                    playerInfoForUpdate.getPlayerStat5(),
                    playerInfoForUpdate.getPlayerStat6(),
                    playerInfoForUpdate.getPlayerClassName(),
                    playerInfoForUpdate.getPlayerSkill1(),
                    playerInfoForUpdate.getPlayerSkill2(),
                    playerInfoForUpdate.getPlayerSkill3());

            playerCharInfoRepository.flush();
            entityManager.clear();

            playerInfoDtoReadProfile.setPlayerUserCode(playerInfo.getPlayerUserCode());
            playerInfoDtoReadProfile.setPlayerName(playerInfo.getPlayerName());
            playerInfoDtoReadProfile.setPlayerLook(playerInfo.getPlayerLook());
            playerInfoDtoReadProfile.setPlayerValue(playerInfo.getPlayerValue());
            playerInfoDtoReadProfile.setPlayerWeapon(playerInfo.getPlayerWeapon());
            playerInfoDtoReadProfile.setPlayerArmor(playerInfo.getPlayerArmor());
            playerInfoDtoReadProfile.setPlayerMaxHP(playerInfo.getPlayerMaxHP());
            playerInfoDtoReadProfile.setPlayerHP(playerInfo.getPlayerHP());
            playerInfoDtoReadProfile.setPlayerSup1(playerInfo.getPlayerSup1());
            playerInfoDtoReadProfile.setPlayerSup2(playerInfo.getPlayerSup2());
            playerInfoDtoReadProfile.setPlayerSup3(playerInfo.getPlayerSup3());
            playerInfoDtoReadProfile.setPlayerStat1(playerInfo.getPlayerStat1());
            playerInfoDtoReadProfile.setPlayerStat2(playerInfo.getPlayerStat2());
            playerInfoDtoReadProfile.setPlayerStat3(playerInfo.getPlayerStat3());
            playerInfoDtoReadProfile.setPlayerStat4(playerInfo.getPlayerStat4());
            playerInfoDtoReadProfile.setPlayerStat5(playerInfo.getPlayerStat5());
            playerInfoDtoReadProfile.setPlayerStat6(playerInfo.getPlayerStat6());
            playerInfoDtoReadProfile.setPlayerClassName(playerInfo.getPlayerClassName());
            playerInfoDtoReadProfile.setPlayerSkill1(playerInfo.getPlayerSkill1());
            playerInfoDtoReadProfile.setPlayerSkill2(playerInfo.getPlayerSkill2());
            playerInfoDtoReadProfile.setPlayerSkill3(playerInfo.getPlayerSkill3());

            return playerInfoDtoReadProfile;

        }
        return null;
    }

    // 회복 혹은 데미지
    @Override
    public int updatePlayerHp(long playerUserCode, int cureOrDamage) {
        // 유저 코드를 기반으로 플레이어 정보 호출
        PlayerCharInfo findPlayerInfo = playerCharInfoRepository.findByPlayerUserCode(playerUserCode).get();
        int playerHP = findPlayerInfo.getPlayerHP();// 현재 hp
        int playerMaxHP = findPlayerInfo.getPlayerMaxHP();// 최대 hp
        // 현재 hp에서 변화량을 더한 결과
        int changedCurrHp = playerHP + cureOrDamage;
        // 최대보다 크면 최대로 지정
        if (changedCurrHp > playerMaxHP) {
            changedCurrHp = playerMaxHP;
        }
        // 0보다 작으면 0으로 지정
        else if (changedCurrHp < 0) {
            changedCurrHp = 0;
        }

        findPlayerInfo.updatePlayerHp(changedCurrHp);
        playerCharInfoRepository.flush();

        return changedCurrHp;
    }

    @Override
    public PlayerCharInfoDto.StatInfo updatePlayerStat(long playerUserCode, PlayerCharInfoDto.StatInfo statInfo) {
        // 유저 코드를 기반으로 플레이어 정보 호출
        PlayerCharInfo findPlayerInfo = playerCharInfoRepository.findByPlayerUserCode(playerUserCode).get();
        switch (statInfo.getStatIndex()) {
            case 1:
                int playerStat1 = findPlayerInfo.getPlayerStat1() + statInfo.getAmountOfChangeStat();
                findPlayerInfo.setPlayerStat1(Math.min(playerStat1, 18));
                statInfo.setAmountOfChangeStat(Math.min(playerStat1, 18));
                break;
            case 2:
                int playerStat2 = findPlayerInfo.getPlayerStat2() + statInfo.getAmountOfChangeStat();
                findPlayerInfo.setPlayerStat2(Math.min(playerStat2, 18));
                statInfo.setAmountOfChangeStat(Math.min(playerStat2, 18));
                break;
            case 3:
                int playerStat3 = findPlayerInfo.getPlayerStat3() + statInfo.getAmountOfChangeStat();
                findPlayerInfo.setPlayerStat3(Math.min(playerStat3, 18));
                statInfo.setAmountOfChangeStat(Math.min(playerStat3, 18));
                break;
            case 4:
                int playerStat4 = findPlayerInfo.getPlayerStat4() + statInfo.getAmountOfChangeStat();
                findPlayerInfo.setPlayerStat4(Math.min(playerStat4, 18));
                statInfo.setAmountOfChangeStat(Math.min(playerStat4, 18));
                break;
            case 5:
                int playerStat5 = findPlayerInfo.getPlayerStat5() + statInfo.getAmountOfChangeStat();
                findPlayerInfo.setPlayerStat5(Math.min(playerStat5, 18));
                statInfo.setAmountOfChangeStat(Math.min(playerStat5, 18));
                break;
            case 6:
                int playerStat6 = findPlayerInfo.getPlayerStat6() + statInfo.getAmountOfChangeStat();
                findPlayerInfo.setPlayerStat6(Math.min(playerStat6, 18));
                statInfo.setAmountOfChangeStat(Math.min(playerStat6, 18));
                break;
        }
        playerCharInfoRepository.flush();

        return statInfo;
    }

    @Override
    public void deletePlayerInfo(long playerCode) {
        Optional<PlayerCharInfo> byId=playerCharInfoRepository.findById(playerCode);
        PlayerCharInfo playerInfo=null;

        if(byId.isPresent())
            playerInfo=byId.get();

        playerCharInfoRepository.delete(playerInfo);

    }
}
