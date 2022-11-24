package com.tt9ood.db.repository;

import com.tt9ood.db.entity.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    @Transactional
    @Modifying
    @Query("update Meeting m set m.meetingGameIsStart = :meetingGameIsStart where m.meetingCode = :meetingCode")
    int updateGameIsStart(@Param("meetingGameIsStart") Boolean meetingGameIsStart, @Param("meetingCode") Long meetingCode);

    @Query("select m from Meeting as m order by m.meetingCode desc")
    Page<Meeting> findAllWithSort(Pageable pageable);
}
