package com.tt9ood.db.repository;

import com.tt9ood.db.entity.Share;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {
    @Modifying
    @Query(value = "update share p set p.share_view = p.share_view + 1 where p.share_code = :shareCode", nativeQuery = true)
    int updateView(Long shareCode);
}
