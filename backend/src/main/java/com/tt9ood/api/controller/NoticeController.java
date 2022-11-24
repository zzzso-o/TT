package com.tt9ood.api.controller;

import com.tt9ood.api.dto.NoticeDto;
import com.tt9ood.api.service.NoticeService;
import com.tt9ood.common.model.response.BaseResponseBody;
import com.tt9ood.db.entity.Notice;
import com.tt9ood.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "공지사항 API", tags = {"Notice."})
@RestController
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    NoticeService noticeService;

    // 등록 C
    @PostMapping
    @ApiOperation(value = "공지사항 등록", notes = "공지사항 등록.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="공지사항 내용", required = true) NoticeDto noticeDto) {

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        Notice notice = noticeService.createNotice(noticeDto);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 조회 R
    // 전체 리스트 불러오기
    @GetMapping
    @ApiOperation(value = "공지사항 전체 조회", notes = "공지사항 전체 조회.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> readAllList() {

        return ResponseEntity.status(200).body(noticeService.readAllNotice());
    }

    // 각 번호에 맞는 게시글 불러오기
    @GetMapping("{noticeCode}")
    @ApiOperation(value = "공지사항 조회", notes = "특정 공지사항 조회_공지사항 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> readNotice(@PathVariable int noticeCode) {

        return ResponseEntity.status(200).body(noticeService.readNotice(noticeCode));
    }


    // 수정 U
    @PutMapping("{noticeCode}")
    @ApiOperation(value = "공지사항 수정", notes = "특정 공지사항 수정_공지사항 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateNotice(@PathVariable int noticeCode,
                                          @RequestBody @ApiParam(value="수정할 공지사항 내용", required = true) NoticeDto noticeForUpdate) {

        NoticeDto updatedNotice = noticeService.updateNotice(noticeCode, noticeForUpdate);

        return ResponseEntity.status(200).body(updatedNotice);
    }

    // 삭제 D
    @DeleteMapping("{noticeCode}")
    @ApiOperation(value = "공지사항 삭제", notes = "특정 공지사항 삭제_공지사항 코드번호 필요.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "공지 글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteNotice(@PathVariable int noticeCode) {

        noticeService.deleteNotice(noticeCode);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}
