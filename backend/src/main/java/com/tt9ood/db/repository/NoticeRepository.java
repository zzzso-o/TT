package com.tt9ood.db.repository;

import com.tt9ood.api.dto.NoticeDto;
import com.tt9ood.db.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    @Query(value = "select new com.tt9ood.api.dto.NoticeDto(n.noticeCode, n.noticeTitle, n.noticeAuthor, n.noticeDate, n.noticeArticle) " +
            "from Notice as n")
    List<NoticeDto> findAllBy();
}
