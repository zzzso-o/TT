package com.tt9ood.db.repository;

import com.tt9ood.api.dto.CommentDto;
import com.tt9ood.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "select new com.tt9ood.api.dto.CommentDto(" +
            "c.commentCode, c.commentAuthor, c.commentContent, c.createdDate, c.modifiedDate, c.share.shareCode" +
            ") from Comment as c " +
            "where c.share.shareCode = :shareCode")
    List<CommentDto> findAllByshareCode(@Param("shareCode") Long shareCode);

    @Query(value = "select " +
            "c.commentCode " +
            "from Comment as c " +
            "where c.share.shareCode = :shareCode")
    List<Long> findCommentCodeAllByShare(@Param("shareCode") Long shareCode);

    @Query(value = "select new com.tt9ood.api.dto.CommentDto(" +
            "c.commentCode, c.commentAuthor, c.commentContent, c.createdDate, c.modifiedDate, c.share.shareCode" +
            ") from Comment as c " +
            "where c.commentCode = :commentCode")
    CommentDto findCommentByCommentCode(@Param("commentCode") Long commentCode);
}
