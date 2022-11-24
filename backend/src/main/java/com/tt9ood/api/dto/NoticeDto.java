package com.tt9ood.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 공지글 정보 전달 클래스
 */
@Getter @Setter
@NoArgsConstructor
@ApiModel("NoticeDto")
public class NoticeDto {
    // 자동 생성되는 공지사항 pk
    private Long noticeCode;
    @ApiModelProperty(name="공지사항 제목", example="공지 제목")
    private String noticeTitle;
    @ApiModelProperty(name="공지사항 작성자", example="작성자 이름")
    private String noticeAuthor;
    // 자동 생성되는 날짜
    private String noticeDate;
    @ApiModelProperty(name="공지사항 내용", example="공지할 내용")
    private String noticeArticle;

    public NoticeDto(Long noticeCode, String noticeTitle, String noticeAuthor, String noticeDate, String noticeArticle) {
        this.noticeCode = noticeCode;
        this.noticeTitle = noticeTitle;
        this.noticeAuthor = noticeAuthor;
        this.noticeDate = noticeDate;
        this.noticeArticle = noticeArticle;
    }
}
