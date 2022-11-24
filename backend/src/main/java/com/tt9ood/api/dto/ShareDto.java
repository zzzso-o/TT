package com.tt9ood.api.dto;

import com.tt9ood.db.entity.Comment;
import com.tt9ood.db.entity.Share;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

public class ShareDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request{
        private Long shareCode;
        @ApiModelProperty(name="정보 공유 제목", example="정보 공유 제목")
        private String shareTitle;
        @ApiModelProperty(name="정보 공유 작성자", example="정보 공유 작성자")
        private String shareAuthor;
        @ApiModelProperty(name="정보 공유 내용", example="정보 공유 내용")
        private String shareContent;
        private int shareLike;
        private int shareView;
        private String createDate, modifiedDate;

        public Share toEntity(){
            Share share = Share.builder()
                    .shareCode(shareCode)
                    .shareTitle(shareTitle)
                    .shareAuthor(shareAuthor)
                    .shareContent(shareContent)
                    .shareLike(shareLike)
                    .shareView(shareView)
                    .build();
            return share;
        }
    }

    @Getter
    public static class Response{
        private Long shareCode;
        private String shareTitle;
        private String shareAuthor;
        private String shareContent;
        private int shareLike;
        private int shareView;
        private String createDate, modifiedDate;
        private List<CommentDto> commentDtoList = new ArrayList<>();

        public Response(Share share, List<CommentDto> commentDtoList){
            this.shareCode = share.getShareCode();
            this.shareTitle = share.getShareTitle();
            this.shareAuthor = share.getShareAuthor();
            this.shareContent = share.getShareContent();
            this.shareLike = share.getShareLike();
            this.shareView = share.getShareView();
            this.createDate = share.getCreatedDate();
            this.modifiedDate = share.getModifiedDate();
            this.commentDtoList = commentDtoList;
        }
    }
}
