package com.tt9ood.api.service;

import com.tt9ood.api.dto.ShareDto;
import com.tt9ood.db.entity.Share;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ShareService {
    Share createShare(ShareDto.Request dto);
    ShareDto.Response readShare(Long shareCode);

    void deleteShare(Long shareCode);
    void updateShare(Long shareCode, ShareDto.Request dto);

    List<ShareDto.Response> readAllShare();

    int updateView(Long shareCode);


}
