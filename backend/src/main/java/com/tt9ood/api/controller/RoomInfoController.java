package com.tt9ood.api.controller;

import com.tt9ood.api.service.RoomInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "방정보 API", tags = {"RoomInfo."})
@RestController
@RequestMapping("/api/roomInfo")
public class RoomInfoController {

    @Autowired
    RoomInfoService roomInfoService;

    @GetMapping("{roomCode}")
    @ApiOperation(value = "방정보 조회", notes = "방정보 조회_방코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> readPlayerCharInfo(@PathVariable int roomCode) {

        return ResponseEntity.status(200).body(roomInfoService.readRoomInfo(roomCode));
    }

}
