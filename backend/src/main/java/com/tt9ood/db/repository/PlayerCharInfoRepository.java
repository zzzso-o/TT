package com.tt9ood.db.repository;

import com.tt9ood.db.entity.PlayerCharInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerCharInfoRepository extends JpaRepository<PlayerCharInfo, Long> {
    Optional<PlayerCharInfo> findByPlayerUserCode(long playerUserCode);
    Optional<PlayerCharInfo> findByPlayerCode(long playerCode);
}
