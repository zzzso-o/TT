package com.tt9ood.api.service;

import com.tt9ood.api.dto.CommentDto;
import com.tt9ood.db.entity.Comment;
import com.tt9ood.db.entity.Share;
import com.tt9ood.db.repository.CommentRepository;
import com.tt9ood.db.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("commentService")
public class CommentServiceImpl implements CommentService {
    @Autowired
    ShareRepository shareRepository;
    @Autowired
    CommentRepository commentRepository;

    /**
     * 생성
     * @param shareCode 공유 게시글 고유 코드
     * @param commentDtoForRegister 댓글 내용
     * @return 저장한 공유 게시글
     */
    @Override
    public Comment createComment(Long shareCode, CommentDto.Register commentDtoForRegister) {
        Comment comment = new Comment();

        comment.setCommentAuthor(commentDtoForRegister.getCommentAuthor());
        comment.setCommentContent(commentDtoForRegister.getCommentContent());
        // id에 해당하는 공유 게시글 찾아옴
        Optional<Share> byId = shareRepository.findById(shareCode);
        Share findShare = byId.get();
        findShare.addComment(comment);

        commentRepository.save(comment);
        shareRepository.save(findShare);

        return comment;
    }

    // 조회
    @Override
    public List<CommentDto> readAllComment(Long shareCode) {
        List<CommentDto> findAllCommentByshareCode = commentRepository.findAllByshareCode(shareCode);
        return findAllCommentByshareCode;
    }

    // 삭제
    @Override
    public void deleteComment(Long shareCode, Long commentCode) {
        List<Long> allCommentForFindDeleteByShareCode = commentRepository.findCommentCodeAllByShare(shareCode);
        for (Long codeInList : allCommentForFindDeleteByShareCode) {
            if (codeInList.equals(commentCode)) {
                commentRepository.deleteById(codeInList);
            }
        }
    }
    // 게시글 삭제시 게시글에 딸린 모든 코멘트 삭제
    @Override
    public void deleteAllComment(Long shareCode) {
        List<Long> allCommentForFindDeleteByShareCode = commentRepository.findCommentCodeAllByShare(shareCode);
        for (Long commentCodeForDelete : allCommentForFindDeleteByShareCode) {
            commentRepository.deleteById(commentCodeForDelete);
        }
    }

    // 수정
    @Override
    public CommentDto updateComment(Long shareCode, Long commentCode, CommentDto.Update commentDtoForUpdate) {
        List<Long> allCommentForFindUpdateByShareCode = commentRepository.findCommentCodeAllByShare(shareCode);
        for (Long commentCodeForUpdate : allCommentForFindUpdateByShareCode) {
            if (commentCodeForUpdate.equals(commentCode)) {
                Optional<Comment> byId = commentRepository.findById(commentCodeForUpdate);
                Comment findComment = byId.get();
                findComment.setCommentContent(commentDtoForUpdate.getCommentContent());
            }
        }
        commentRepository.flush();
        return commentRepository.findCommentByCommentCode(commentCode);
    }
}
