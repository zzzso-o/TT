package com.tt9ood.api.controller;

import com.tt9ood.api.dto.PlayerCharInfoDto;
import com.tt9ood.api.service.PlayerCharInfoService;
import com.tt9ood.common.model.response.BaseResponseBody;
import com.tt9ood.db.entity.PlayerCharInfo;
import io.swagger.annotations.*;
import org.checkerframework.checker.guieffect.qual.PolyUIType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "플레이어캐릭터 정보 API", tags = {"PlayerCharInfo."})
@RestController
@RequestMapping("/api/player")
public class PlayerCharInfoController {

    @Autowired
    PlayerCharInfoService playerCharInfoService;

    // 등록 C
    @PostMapping
    @ApiOperation(value = "플래이어캐릭터 등록", notes = "플레이어캐릭터 등록.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="플레이어캐릭터 내용", required = true) PlayerCharInfoDto playerCharInfoDto) {

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        PlayerCharInfo playerInfo=playerCharInfoService.createPlayerInfo(playerCharInfoDto);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 조회 R

    // 해당 플레이어캐릭터 정보 불러오기
    @GetMapping("{playerCode}")
    @ApiOperation(value = "플레이어캐릭터 정보 조회", notes = "해당 플레이어캐릭터 정보 조회_플레이어캐릭터 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> readPlayerCharInfo(@PathVariable int playerCode) {

        return ResponseEntity.status(200).body(playerCharInfoService.readPlayerInfo(playerCode));
    }


    // 수정 U
    @PutMapping("{playerCode}")
    @ApiOperation(value = "플레이어캐릭터 정보 수정", notes = "해당 플레이어캐릭터 정보 수정_플레이어캐릭터 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updatePlayerCharInfo(@PathVariable int playerCode,
                                          @RequestBody @ApiParam(value="수정할 플레이어캐릭터 정보 내용", required = true) PlayerCharInfoDto playerInfoForUpdate) {

        PlayerCharInfoDto.ReadProfile updatedPlayerInfo=playerCharInfoService.updatePlayerInfo(playerCode,playerInfoForUpdate);

        return ResponseEntity.status(200).body(updatedPlayerInfo);
    }

    // 회복약을 먹거나 데미지를 입거나
    @PutMapping("{playerUserCode}/hpchange")
    @ApiOperation(value = "플레이어캐릭터 HP 변화", notes = "해당 플레이어캐릭터 HP 변화_캐릭터의 해당 유저 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "플레이어 캐릭터 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updatePlayerHp(@PathVariable Long playerUserCode,
                                                  @RequestBody @ApiParam(value="수정할 플레이어캐릭터 정보 내용", required = true) PlayerCharInfoDto.HpInfo hpInfo) {

        int updatePlayerHp = playerCharInfoService.updatePlayerHp(playerUserCode, hpInfo.getAmountOfChangeHp());

        return ResponseEntity.status(200).body(updatePlayerHp);
    }

    // 스탯 변화
    @PutMapping("{playerUserCode}/statchange")
    @ApiOperation(value = "플레이어캐릭터 스탯 변화", notes = "해당 플레이어캐릭터 스탯 변화_캐릭터의 해당 유저 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "플레이어 캐릭터 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updatePlayerStat(@PathVariable Long playerUserCode,
                                            @RequestBody @ApiParam(value="수정할 플레이어캐릭터 스탯 내용", required = true) PlayerCharInfoDto.StatInfo statInfo) {

        PlayerCharInfoDto.StatInfo changedStat = playerCharInfoService.updatePlayerStat(playerUserCode, statInfo);

        return ResponseEntity.status(200).body(changedStat);
    }

    // 삭제 D
    @DeleteMapping("{playerCode}")
    @ApiOperation(value = "플레이어캐릭터 정보 삭제", notes = "해당 플레이어캐릭터 정보 삭제_플레이어캐릭터 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deletePlayerCharInfo(@PathVariable int playerCode) {

        playerCharInfoService.deletePlayerInfo(playerCode);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}
