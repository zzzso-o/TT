package com.tt9ood.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor
@Entity
public class Comment extends TimeEntity {
    // 자동 생성되는 댓글 코드
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "share_comment_code")
    private Long commentCode;
    @Column(name = "share_comment_author")
    private String commentAuthor;
    @Column(name = "share_comment_content", columnDefinition = "TEXT")
    private String commentContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "share_code")
    private Share share;
}
