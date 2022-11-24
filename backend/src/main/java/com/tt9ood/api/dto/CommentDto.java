package com.tt9ood.api.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Long commentCode;
    @ApiModelProperty(name="댓글 작성자", example="댓글 작성자")
    private String commentAuthor;
    @ApiModelProperty(name="댓글 내용", example="댓글 내용")
    private String commentContent;
    @ApiModelProperty(name="댓글 작성 날짜", example="댓글 작성 날짜")
    private String createdDate;
    @ApiModelProperty(name="댓글 수정 날짜", example="댓글 수정 날짜")
    private String modifiedDate;
    @ApiModelProperty(name="공유 게시글 코드번호", example="0")
    private Long shareCode;

    @Getter @Setter
    @NoArgsConstructor
    public static class Register {
        @ApiModelProperty(name="댓글 작성자", example="댓글 작성자")
        private String commentAuthor;
        @ApiModelProperty(name="댓글 내용", example="댓글 내용")
        private String commentContent;
    }

    @Getter @Setter
    @NoArgsConstructor
    public static class Update {
        // 내용
        private String commentContent;
    }

}
