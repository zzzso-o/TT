package com.tt9ood.api.controller;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.api.dto.NoticeDto;
import com.tt9ood.api.service.MeetingService;
import com.tt9ood.api.service.RoomInfoService;
import com.tt9ood.common.model.response.BaseResponseBody;
import com.tt9ood.db.entity.Meeting;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "구인게시판 API", tags = {"Meeting."})
@RestController
@RequestMapping("/api/meeting")
public class MeetingController {

    @Autowired
    MeetingService meetingService;

    @Autowired
    RoomInfoService roomInfoService;

    /**
     * 구인 게시글 등록
     * @param meetingDtoReq 게시글 내용
     * @return ResponseEntity 등록 이후 응답 상태
     */
    @PostMapping("register")
    @ApiOperation(value = "구인 게시글 등록", notes = "구인 게시글 등록.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "구인 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="구인 게시글 내용", required = true) MeetingDto.Req meetingDtoReq) {

        // 구인 게시글 생성
        meetingService.createMeeting(meetingDtoReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 조회
    /**
     * 전체 리스트 불러오기
     * @return ResponseEntity 조회 이후 응답 상태 및 전체 구인 글
     */
    @GetMapping
    @ApiOperation(value = "구인 게시글 전체 조회", notes = "구인 게시글 전체 조회.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "구인 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> readAllMeetingList() {

        return ResponseEntity.status(200).body(meetingService.readAllMeeting());
    }

    // 페이징 조회
    /**
     * 전체 리스트 불러오기
     * @return ResponseEntity 조회 이후 응답 상태 및 전체 구인 글
     */
    @GetMapping("/paging/{page}")
    @ApiOperation(value = "구인 게시글 전체 페이징 조회", notes = "구인 게시글 전체 페이징 조회.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "구인 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> readAllMeetingWithPaging(@PathVariable int page) {
        Page<Meeting> meetings = meetingService.readAllMeetingWithPaging(page, 10);
        System.out.println("meetings = " + meetings);
        return ResponseEntity.status(200).body(meetings);
    }


    /**
     * 각 번호에 맞는 게시글 불러오기
     * @param meetingCode 구인 글 코드
     * @return 조회 이후 응답 상태 및 조회한 구인 글
     */
    @GetMapping("{meetingCode}")
    @ApiOperation(value = "구인 글 조회", notes = "특정 구인 글 조회_구인 글 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "구인 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> readMeeting(@PathVariable long meetingCode) {

        return ResponseEntity.status(200).body(meetingService.readMeeting(meetingCode));
    }

    /**
     * 구인 글 삭제
     * @param meetingCode 구인 글 코드
     * @return ResponseEntity 삭제 이후 응답 상태
     */
    @DeleteMapping("{meetingCode}")
    @ApiOperation(value = "구인 글 삭제", notes = "특정 구인 글 삭제_구인 글 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "구인 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteMeeting(@PathVariable int meetingCode) {

        meetingService.deleteMeeting(meetingCode);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /**
     * 구인 글 수정
     * @param meetingCode 구인 게시글 코드
     * @param meetingReqForUpdate 수정 이후 응답 상태 및 수정할 게시글 내용
     * @return
     */
    @PutMapping("{meetingCode}")
    @ApiOperation(value = "구인 게시글 수정", notes = "특정 구인글 수정_구인글 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "구인 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateNotice(@PathVariable int meetingCode,
                                          @RequestBody @ApiParam(value="수정할 공지사항 내용", required = true) MeetingDto.Req meetingReqForUpdate) {

        MeetingDto updatedMeeting = meetingService.updateMeeting(meetingCode, meetingReqForUpdate);

        return ResponseEntity.status(200).body(updatedMeeting);
    }

    // 수정 - gm 및 player 등록
    @PutMapping("/gmEnroll")
    @ApiOperation(value = "구인 게시글_gm 등록", notes = "특정 구인글 gm등록_구인글 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "구인 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> enrollGm(@RequestBody(required = false) @ApiParam(value="gm 역할을 할 플레이어 코드와 방 번호", required = true) MeetingDto.Enroll meetingEnroll) {

        meetingEnroll.setIsGm(true);

        MeetingDto meetingDto = meetingService.enrollToGame(meetingEnroll);

        return ResponseEntity.status(200).body(meetingDto);
    }

    @PutMapping("/playerEnroll")
    @ApiOperation(value = "구인 게시글_플레이어 등록", notes = "특정 구인글 플레이어 등록_구인글 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "구인 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> enrollPlayer(@RequestBody(required = false) @ApiParam(value="방에 참가할 플레이어 코드와 방 번호", required = true) MeetingDto.Enroll meetingEnroll) {

        meetingEnroll.setIsGm(false);

        MeetingDto meetingDto = meetingService.enrollToGame(meetingEnroll);

        return ResponseEntity.status(200).body(meetingDto);
    }
}
