package com.tt9ood.api.controller;

import com.tt9ood.api.dto.ShareDto;
import com.tt9ood.api.service.ShareService;
import com.tt9ood.common.model.response.BaseResponseBody;
import com.tt9ood.db.entity.Share;
import com.tt9ood.db.repository.ShareRepository;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.List;

@RequestMapping("/api/share")
@RequiredArgsConstructor
@RestController
public class ShareController {
    @Autowired
    private final ShareService shareService;

    /*
     정보 공유 게시글 작성 CREATE
     */
    @PostMapping("/register")
    @ApiOperation(value = "정보 공유 게시글 작성", notes = "정보 공유 게시글을 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> save(@RequestBody ShareDto.Request dto){
        shareService.createShare(dto);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /*
     정보 공유 게시글 조회 READ
     */
    @GetMapping("{shareCode}")
    @ApiOperation(value = "정보 공유 게시글 조회", notes = "정보 공유 게시글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ShareDto.Response> read(@PathVariable Long shareCode){
        return ResponseEntity.status(200).body(shareService.readShare(shareCode));
    }

    /*
     정보 공유 게시글 삭제 DELETE
     */
    @DeleteMapping("{shareCode}")
    @ApiOperation(value = "정보 공유 게시글 삭제", notes = "정보 공유 게시글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteShare(@PathVariable Long shareCode){
        shareService.deleteShare(shareCode);
        return ResponseEntity.status(200).body(shareCode);
    }

    /*
     정보 공유 게시글 수정 UPDATE
     */
    @PutMapping("{shareCode}")
    @ApiOperation(value = "정보 공유 게시글 수정", notes = "정보 공유 게시글을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateShare(@PathVariable Long shareCode, @RequestBody ShareDto.Request dto){
        shareService.updateShare(shareCode, dto);
        return ResponseEntity.status(200).body(shareCode);
    }
    
    /*
     정보 공유 게시글 전체 조회
     */

    @GetMapping
    @ApiOperation(value = "정보 공유 게시글 전체 조회", notes = "정보 공유 게시글을 전체 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public List<ShareDto.Response> readAllShare(){
        return shareService.readAllShare();
    }

    @GetMapping("/share/read/{shareCode}")
    public String read(@PathVariable Long shareCode, Model model){
        model.addAttribute("shareView", shareService.updateView(shareCode));
        return "share";
    }


}
