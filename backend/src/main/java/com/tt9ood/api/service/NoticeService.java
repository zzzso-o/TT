package com.tt9ood.api.service;

import com.tt9ood.api.dto.NoticeDto;
import com.tt9ood.db.entity.Notice;

import java.util.List;

public interface NoticeService {
    // 등록
    Notice createNotice(NoticeDto noticeDto);
    // 조회
    // 전체 조회
    List<NoticeDto> readAllNotice();
    // 특정 게시글 조회
    NoticeDto readNotice(long noticeCode);

    // 수정
    NoticeDto updateNotice(long noticeCode, NoticeDto noticeForUpdate);

    // 삭제
    void deleteNotice(long noticeCode);

}
