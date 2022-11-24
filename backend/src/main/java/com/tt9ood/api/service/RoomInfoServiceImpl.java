package com.tt9ood.api.service;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.api.dto.RoomInfoDto;
import com.tt9ood.api.response.UserRes;
import com.tt9ood.db.entity.RoomInfo;
import com.tt9ood.db.entity.User;
import com.tt9ood.db.repository.RoomInfoRepository;
import com.tt9ood.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("roomInfoService")
public class RoomInfoServiceImpl implements RoomInfoService {
    @Autowired
    RoomInfoRepository roomInfoRepository;

    @Autowired
    UserRepository userRepository;

    // 방 정보 등록
    @Override
    public RoomInfo createRoomInfo(MeetingDto.Req meetingDtoReq) {
        Optional<User> byUserNickname = userRepository.findByUserNickname(meetingDtoReq.getMeetingAuthor());
        Long userCode = byUserNickname.get().getUserCode();

        RoomInfo roomInfo = new RoomInfo();

        // gm 코드
        if (meetingDtoReq.getMeetingPosition().equals("0")) {
            roomInfo.setGmUserCode(userCode);
        } else {
            roomInfo.setPy1Code(userCode);
        }

        return roomInfoRepository.save(roomInfo);
    }

    @Override
    public void deleteRoomInfo(long roomInfoCode) {
        roomInfoRepository.deleteById(roomInfoCode);
    }

    @Override
    public RoomInfo updateRoomInfo(long roomInfoCode, MeetingDto.Req meetingDtoReq) {
        Optional<User> byUserNickname = userRepository.findByUserNickname(meetingDtoReq.getMeetingAuthor());
        Long userCode = byUserNickname.get().getUserCode();
        System.out.println("userCode = " + userCode);

        Optional<RoomInfo> byId = roomInfoRepository.findById(roomInfoCode);
        RoomInfo findRoomInfo = byId.get();

        // 만약에 기존에 gm으로 신청해서 그대로 유지한다면
        System.out.println("findRoomInfo = " + findRoomInfo.getGmUserCode());
        System.out.println("findRoomInfo = " + findRoomInfo.getPy1Code());
        System.out.println("findRoomInfo = " + meetingDtoReq.getMeetingPosition());
        if ((findRoomInfo.getGmUserCode() == userCode) && (meetingDtoReq.getMeetingPosition().equals("0"))) {
            System.out.println(" 지금 이게 실행이 되는건지 - gm 유지 ");
            return findRoomInfo;
        }
        // 플레이어였는데 유지한다면
        else if ((findRoomInfo.getPy1Code() == userCode) && (meetingDtoReq.getMeetingPosition().equals("1"))) {
            System.out.println(" 지금 이게 실행이 되는건지 - 플레이어 유지 ");
            return findRoomInfo;
        }
        // gm이었는데 플레이어로 변경한다면
        else if ((findRoomInfo.getGmUserCode() == userCode) && (meetingDtoReq.getMeetingPosition().equals("1"))) {
            System.out.println(" 지금 이게 실행이 되는건지 - gm -> 플레이어 ");
            // 일단 gm을 0으로 바꿔주고
            findRoomInfo.setGmUserCode(0);
            // 만약 플레이어 1이 빈칸이었으면
            if (findRoomInfo.getPy1Code() == 0) {
                findRoomInfo.setPy1Code(userCode);
            }
            // 플레이어 1이 빈칸이 아니고 2가 빈 칸이라면
            else if (findRoomInfo.getPy2Code() == 0) {
                findRoomInfo.setPy2Code(userCode);
            }
            // 플레이어 1, 2가 빈칸이 아니고 3이 빈 칸이라면
            else if (findRoomInfo.getPy3Code() == 0) {
                findRoomInfo.setPy3Code(userCode);
            }
            // 플레이어 1, 2, 3이 빈칸이 아니고 4가 빈 칸이라면
            else if (findRoomInfo.getPy4Code() == 0) {
                findRoomInfo.setPy4Code(userCode);
            }
            // 플레이어 1, 2, 3, 4가 빈칸이 아니고 5이 빈 칸이라면
            else if (findRoomInfo.getPy5Code() == 0) {
                findRoomInfo.setPy5Code(userCode);
            }
        }

        // 플레이어였는데 gm으로 바뀐다면
        // 구인 게시글 생성하는 사람이 아무래도 변경을 할테니까
        else if (meetingDtoReq.getMeetingPosition().equals("0")) {
            System.out.println(" 지금 이게 실행이 되는건지 - 플레이어 -> gm");
            // 일단 해당 유저를 gm에 앉히고
            findRoomInfo.setGmUserCode(userCode);
            // 그러면 1이 빈칸이 될때니까 한명씩 앞으로 변경해줌
            // 만약 gm이 플레이어 1이었다면
            if (findRoomInfo.getPy1Code() == userCode) {
                // 2번이 0이면 땡길 유저가 없음
                if (findRoomInfo.getPy2Code() == 0) {
                    findRoomInfo.setPy1Code(0);
                }
                // 2번이 0이 아니면 1로 땡김
                else if (findRoomInfo.getPy2Code() != 0) {
                    findRoomInfo.setPy1Code(findRoomInfo.getPy2Code());
                    findRoomInfo.setPy2Code(0);
                }
                // 3이 0이 아니면 2번과 3번을 하나씩 땡김
                else if (findRoomInfo.getPy3Code() != 0) {
                    findRoomInfo.setPy1Code(findRoomInfo.getPy2Code());
                    findRoomInfo.setPy2Code(findRoomInfo.getPy3Code());
                    findRoomInfo.setPy3Code(0);
                }
                // 4가 0이 아니면 2번과 3번과 4번을 하나씩 땡김
                else if (findRoomInfo.getPy4Code() != 0) {
                    findRoomInfo.setPy1Code(findRoomInfo.getPy2Code());
                    findRoomInfo.setPy2Code(findRoomInfo.getPy3Code());
                    findRoomInfo.setPy3Code(findRoomInfo.getPy4Code());
                    findRoomInfo.setPy4Code(0);
                }
                // 5가 0이 아니었으면 2, 3, 4, 5번을 하나씩 땡김
                if (findRoomInfo.getPy5Code() != 0) {
                    findRoomInfo.setPy1Code(findRoomInfo.getPy2Code());
                    findRoomInfo.setPy2Code(findRoomInfo.getPy3Code());
                    findRoomInfo.setPy3Code(findRoomInfo.getPy4Code());
                    findRoomInfo.setPy4Code(findRoomInfo.getPy5Code());
                    findRoomInfo.setPy5Code(0);
                }
            }
            // 만약 gm이 플레이어 2이었다면
            else if (findRoomInfo.getPy2Code() == userCode) {
                // 3번이 0이면 땡길 것이 없음
                if (findRoomInfo.getPy3Code() == 0) {
                    findRoomInfo.setPy2Code(0);
                }
                // 3번이 0이면 아니면 3을 땡김
                else if (findRoomInfo.getPy3Code() != 0) {
                    findRoomInfo.setPy2Code(findRoomInfo.getPy3Code());
                    findRoomInfo.setPy3Code(0);
                }
                // 4번이 0이면 아니면 3과 4번을 땡김
                else if (findRoomInfo.getPy4Code() != 0) {
                    findRoomInfo.setPy2Code(findRoomInfo.getPy3Code());
                    findRoomInfo.setPy3Code(findRoomInfo.getPy4Code());
                    findRoomInfo.setPy4Code(0);
                }
                // 5번이 0이면 아니면 3과 4, 5번을 땡김
                else if (findRoomInfo.getPy5Code() != 0) {
                    findRoomInfo.setPy2Code(findRoomInfo.getPy3Code());
                    findRoomInfo.setPy3Code(findRoomInfo.getPy4Code());
                    findRoomInfo.setPy4Code(findRoomInfo.getPy5Code());
                    findRoomInfo.setPy5Code(0);
                }
            }
            // 만약 gm이 플레이어 3이었다면
            else if (findRoomInfo.getPy3Code() == userCode) {
                // 4번이 0이면 땡길 것이 없음
                if (findRoomInfo.getPy4Code() == 0) {
                    findRoomInfo.setPy3Code(0);
                }
                // 4번이 0이면 아니면 4을 땡김
                else if (findRoomInfo.getPy4Code() != 0) {
                    findRoomInfo.setPy3Code(findRoomInfo.getPy4Code());
                    findRoomInfo.setPy4Code(0);
                }
                // 5번이 0이면 아니면 4과 5번을 땡김
                else if (findRoomInfo.getPy5Code() != 0) {
                    findRoomInfo.setPy3Code(findRoomInfo.getPy4Code());
                    findRoomInfo.setPy4Code(findRoomInfo.getPy5Code());
                    findRoomInfo.setPy5Code(0);
                }
            }
            // 만약 gm이 플레이어 4이었다면
            else if (findRoomInfo.getPy4Code() == userCode) {
                // 5번이 0이면 땡길 것이 없음
                if (findRoomInfo.getPy5Code() == 0) {
                    findRoomInfo.setPy4Code(0);
                }
                // 5번이 0이면 아니면 5을 땡김
                else if (findRoomInfo.getPy5Code() != 0) {
                    findRoomInfo.setPy4Code(findRoomInfo.getPy5Code());
                    findRoomInfo.setPy5Code(0);
                }
            }
            // 만약 gm이 플레이어 5이었다면
            else if (findRoomInfo.getPy5Code() == userCode) {
                findRoomInfo.setPy5Code(0);
            }
        }
        return findRoomInfo;
    }

    @Override
    public RoomInfoDto readRoomInfo(long roomCode) {
        RoomInfoDto roomInfoDto=new RoomInfoDto();
        Optional<RoomInfo> byId=roomInfoRepository.findById(roomCode);
        if(byId!=null){
            RoomInfo roomInfo=byId.get();
            roomInfoDto.setGmUserCode(roomInfo.getGmUserCode());
            roomInfoDto.setPy1Code(roomInfo.getPy1Code());
            roomInfoDto.setPy2Code(roomInfo.getPy2Code());
            roomInfoDto.setPy3Code(roomInfo.getPy3Code());
            roomInfoDto.setPy4Code(roomInfo.getPy4Code());
            roomInfoDto.setPy5Code(roomInfo.getPy5Code());

            return roomInfoDto;
        }
        return null;
    }
}
