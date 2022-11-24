package com.tt9ood.db.repository;

import com.tt9ood.db.entity.RoomInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomInfoRepository extends JpaRepository<RoomInfo, Long> {
}
