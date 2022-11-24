package com.tt9ood.api.service;

import com.tt9ood.api.dto.CommentDto;
import com.tt9ood.db.entity.Comment;

import java.util.List;

public interface CommentService {
    // 생성
    Comment createComment(Long shareCode, CommentDto.Register commentDtoForRegister);

    // 조회
    // 특정 공유 게시물의 전체 댓글
    List<CommentDto> readAllComment(Long shareCode);

    // 삭제
    void deleteComment(Long shareCode, Long commentCode);
    void deleteAllComment(Long shareCode);

    // 수정
    CommentDto updateComment(Long shareCode, Long commentCode, CommentDto.Update commentDtoForUpdate);
}
