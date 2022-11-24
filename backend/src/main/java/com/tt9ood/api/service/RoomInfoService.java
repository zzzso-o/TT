package com.tt9ood.api.service;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.api.dto.RoomInfoDto;
import com.tt9ood.db.entity.RoomInfo;

public interface RoomInfoService {
    // 등록
    RoomInfo createRoomInfo(MeetingDto.Req meetingDtoReq);
    // 삭제
    void deleteRoomInfo(long roomInfoCode);
    // 수정
    RoomInfo updateRoomInfo(long roomInfoCode, MeetingDto.Req meetingDtoReq);

    RoomInfoDto readRoomInfo(long roomCode);
}
