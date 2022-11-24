package com.tt9ood.api.service;

import com.tt9ood.api.dto.NoticeDto;
import com.tt9ood.db.entity.Notice;
import com.tt9ood.db.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeRepository noticeRepository;
    @PersistenceContext
    EntityManager entityManager;

    /**
     * NoticeDto -> Notice Entity -> Database
     * @param noticeDto
     * @return
     */
    @Override
    public Notice createNotice(NoticeDto noticeDto) {
        // 제목, 작성자, 날짜, 내용
        Notice notice = new Notice(noticeDto.getNoticeTitle(),
                noticeDto.getNoticeAuthor(),
                noticeDto.getNoticeArticle());

        return noticeRepository.save(notice);
    }

    @Override
    public List<NoticeDto> readAllNotice() {
        return noticeRepository.findAllBy();
    }

    @Override
    public NoticeDto readNotice(long noticeCode) {
        NoticeDto noticeDto = new NoticeDto();
        Optional<Notice> byId = noticeRepository.findById(noticeCode);
        if (byId != null) {
            Notice notice = byId.get();

            noticeDto.setNoticeCode(notice.getNoticeCode());
            noticeDto.setNoticeTitle(notice.getNoticeTitle());
            noticeDto.setNoticeAuthor(notice.getNoticeAuthor());
            noticeDto.setNoticeDate(notice.getNoticeDate());
            noticeDto.setNoticeArticle(notice.getNoticeArticle());

            return noticeDto;
        }
        return null;
    }

    @Override
    public NoticeDto updateNotice(long noticeCode, NoticeDto noticeForUpdate) {
        NoticeDto updatedNotice = new NoticeDto();

        // 해당 코드가 있는지 찾는다
        Optional<Notice> byId = noticeRepository.findById(noticeCode);
        // 해당 코드가 있으면
        if (byId != null) {
            Notice notice = byId.get();
            // 해당 내용을 작성한 내용으로 수정한다.
            notice.updateNotice(noticeForUpdate.getNoticeTitle(),
                    noticeForUpdate.getNoticeAuthor(),
                    noticeForUpdate.getNoticeArticle());

            // 수정 쿼리를 디비에 날람
            noticeRepository.flush();
            entityManager.clear();

            // 수정한 내용을 출력할 수 있게 반환해준다.
            updatedNotice.setNoticeCode(notice.getNoticeCode());
            updatedNotice.setNoticeTitle(notice.getNoticeTitle());
            updatedNotice.setNoticeDate(notice.getNoticeDate());
            updatedNotice.setNoticeAuthor(notice.getNoticeAuthor());
            updatedNotice.setNoticeArticle(notice.getNoticeArticle());

            return updatedNotice;
        }
        return null;
    }

    @Override
    public void deleteNotice(long noticeCode) {
        Optional<Notice> byId = noticeRepository.findById(noticeCode);
        Notice removeNotice = null;

        if (byId != null) {
            removeNotice = byId.get();
        }

        noticeRepository.delete(removeNotice);
    }


}
