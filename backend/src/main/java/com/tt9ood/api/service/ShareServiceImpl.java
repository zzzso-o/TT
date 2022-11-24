package com.tt9ood.api.service;

import com.tt9ood.api.dto.CommentDto;
import com.tt9ood.api.dto.ShareDto;
import com.tt9ood.db.entity.Share;
import com.tt9ood.db.repository.CommentRepository;
import com.tt9ood.db.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("shareService")
public class ShareServiceImpl implements ShareService{

    @Autowired
    ShareRepository shareRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    CommentService commentService;

    @Transactional
    @Override
    public Share createShare(ShareDto.Request dto) {
        return shareRepository.save(dto.toEntity());
    }

    @Transactional
    @Override
    public ShareDto.Response readShare(Long shareCode) {
        Share share = shareRepository.findById(shareCode).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        List<CommentDto> commentDtos = commentRepository.findAllByshareCode(shareCode);
        return new ShareDto.Response(share, commentDtos);
    }

    @Transactional
    @Override
    public void deleteShare(Long shareCode) {
        Share share = shareRepository.findById(shareCode).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        // 게시글에 딸린 댓글 먼저 삭제
        commentService.deleteAllComment(shareCode);
        shareRepository.delete(share);
    }

    @Transactional
    @Override
    public void updateShare(Long shareCode, ShareDto.Request dto) {
        Share share = shareRepository.findById(shareCode).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        share.update(dto.getShareTitle(), dto.getShareContent());
    }

    @Transactional
    @Override
    public List<ShareDto.Response> readAllShare() {
        Sort sort = Sort.by(Sort.Direction.DESC, "ShareCode","createdDate");
        List<Share> shares = shareRepository.findAll(sort);

        List<ShareDto.Response> resShareDtoList = new ArrayList<>();
        for (Share share : shares) {
            List<CommentDto> commentDtoList = commentRepository.findAllByshareCode(share.getShareCode());
            ShareDto.Response resShareDto = new ShareDto.Response(share, commentDtoList);
            resShareDtoList.add(resShareDto);
        }
//        return shares.stream().map(ShareDto.Response::new).collect(Collectors.toList());
        return resShareDtoList;
    }

    @Transactional
    @Override
    public int updateView(Long shareCode) {
        return shareRepository.updateView(shareCode);
    }

}
