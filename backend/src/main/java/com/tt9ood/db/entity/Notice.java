package com.tt9ood.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
@Entity
public class Notice {
    // 자동 생성되는 pk
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_code")
    private Long noticeCode;
    // 공지글 작성자
    @Column(name = "notice_author")
    private String noticeAuthor;
    // 공지글 작성 시간
    @Column(name = "notice_date")
    private String noticeDate;
    // 공지글 제목
    @Column(name = "notice_title")
    private String noticeTitle;
    // 공지글 내용
    @Column(name = "notice_article")
    private String noticeArticle;

    public Notice(String noticeTitle, String noticeAuthor, String noticeArticle) {
        this.noticeTitle = noticeTitle;
        this.noticeAuthor = noticeAuthor;
        this.noticeDate = currTime();
        this.noticeArticle = noticeArticle;
    }

    /**
     * 공지글 수정
     * @param noticeTitle 공지글 제목
     * @param noticeAuthor 공지글 작성자
     * @param noticeArticle 공지글 내용
     */
    public void updateNotice(String noticeTitle, String noticeAuthor, String noticeArticle) {
        this.noticeTitle = noticeTitle;
        this.noticeAuthor = noticeAuthor;
        this.noticeDate = currTime();
        this.noticeArticle = noticeArticle;
    }

    /**
     * 공지글 작성하는 시간
     * @return String 작성하는 시간
     */
    private String currTime() {
        // 형식
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        // 현재 시간을 문자열로 변환
        String formattedDateTime = LocalDateTime.now().format(formatter);

        return formattedDateTime;
    }
}
