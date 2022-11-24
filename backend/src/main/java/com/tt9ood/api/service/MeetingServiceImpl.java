package com.tt9ood.api.service;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.api.response.UserRes;
import com.tt9ood.db.entity.Meeting;
import com.tt9ood.db.entity.RoomInfo;
import com.tt9ood.db.entity.User;
import com.tt9ood.db.repository.MeetingRepository;
import com.tt9ood.db.repository.RoomInfoRepository;
import com.tt9ood.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service("meetService")
public class MeetingServiceImpl implements MeetingService {
    @Autowired
    MeetingRepository meetingRepository;
    @Autowired
    RoomInfoRepository roomInfoRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoomInfoService roomInfoService;

    /**
     * 구인 게시글 생성
     * @param meetingDtoReq
     * @return
     */
    @Override
    public Meeting createMeeting(MeetingDto.Req meetingDtoReq) {
        // 구인 게시글 내용 생성 - 게시판 테이블 저장
        Meeting meeting = new Meeting(meetingDtoReq.getMeetingTitle(),
                meetingDtoReq.getMeetingAuthor(),
                meetingDtoReq.getMeetingContent(),
                meetingDtoReq.getMeetingPyNum(),
                meetingDtoReq.getMeetingPyTime()
        );
        // 구인 게시글 내용 생성 - 방 정보 테이블 저장
        RoomInfo createdRoomInfo = roomInfoService.createRoomInfo(meetingDtoReq);
        meeting.setRoomInfo(createdRoomInfo);

        return meetingRepository.save(meeting);
    }

    /**
     * 구인 게시글 전체 조회
     * @return
     */
    @Override
    public List<MeetingDto> readAllMeeting() {
        List<MeetingDto> meetingDtoList = new ArrayList<>();

        List<Meeting> meetingList = meetingRepository.findAll();

        for (Meeting meeting : meetingList) {
            LocalDateTime now = LocalDateTime.now();

            if (now.isAfter(stringToLocal(meeting.getMeetingPyTime()))) {
                meetingRepository.updateGameIsStart(true, meeting.getMeetingCode());
            }
            MeetingDto meetingDto = getMeetingInfo(meeting);

            meetingDtoList.add(meetingDto);
        }
        return meetingDtoList;
    }

    /**
     * 페이징 조회
     * @param page 페이지
     * @param size 크기 - 10고정
     * @return
     */
    @Override
    public Page<Meeting> readAllMeetingWithPaging(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return meetingRepository.findAllWithSort(pageRequest);
    }

    /**
     * 특정 구인 게시글 조회 - 특정 코드 필요
     * @param meetingCode
     * @return
     */
    @Override
    public MeetingDto readMeeting(long meetingCode) {
        Optional<Meeting> findMeeting = meetingRepository.findById(meetingCode);
        if (findMeeting != null) {
            Meeting meeting = findMeeting.get();

            LocalDateTime now = LocalDateTime.now();

            if (now.isAfter(stringToLocal(meeting.getMeetingPyTime()))) {
                meetingRepository.updateGameIsStart(true, meeting.getMeetingCode());
            }

            MeetingDto meetingDto = getMeetingInfo(meeting);

            return meetingDto;
        }
        return null;
    }
    // 특정 구인 게시글 조회 - 특정 문자열 필요
    // 제목(추가. 내용)으로 검색하는 기능

    /**
     * 구인 게시글 삭제 - 특정 코드 필요
     * @param meetingCode
     */
    @Override
    public void deleteMeeting(long meetingCode) {
        // 방 정보 코드 미리 수집
        Optional<Meeting> byId = meetingRepository.findById(meetingCode);
        Meeting findMeeting = byId.get();
        long roomInfoCode = findMeeting.getRoomInfo().getRoomCode();

        // 구인 게시글 삭제 - 게시글 정보 삭제
        meetingRepository.deleteById(meetingCode);

        // 구인 게시글 삭제 - 방 정보 삭제
        roomInfoService.deleteRoomInfo(roomInfoCode);
    }

    /**
     * 구인 게시글 수정 - 특정 코드 필요
     * @param meetingCode
     * @param meetingReqForUpdate
     * @return
     */
    @Override
    public MeetingDto updateMeeting(long meetingCode, MeetingDto.Req meetingReqForUpdate) {
        MeetingDto updatedMeeting = new MeetingDto();

        // 해당 코드가 있는지 찾는다
        Optional<Meeting> findMeeting = meetingRepository.findById(meetingCode);
        // 해당 코드가 있으면
        if (findMeeting != null) {
            Meeting meeting = findMeeting.get();
            // 해당 내용을 작성한 내용으로 수정한다.
            meeting.updateMeeting(meetingReqForUpdate.getMeetingTitle(),
                    meetingReqForUpdate.getMeetingAuthor(),
                    meetingReqForUpdate.getMeetingContent(),
                    meetingReqForUpdate.getMeetingPyNum(),
                    meetingReqForUpdate.getMeetingPyTime(),
                    false);

            long roomCode = meeting.getRoomInfo().getRoomCode();

            RoomInfo roomInfo = roomInfoService.updateRoomInfo(roomCode, meetingReqForUpdate);

            meeting.setRoomInfo(roomInfo);

            meetingRepository.flush();

            // 수정한 내용을 출력할 수 있게 반환해준다.
            updatedMeeting.setMeetingCode(meeting.getMeetingCode());
            updatedMeeting.setMeetingTitle(meeting.getMeetingTitle());
            updatedMeeting.setMeetingDate(meeting.getMeetingDate());
            updatedMeeting.setMeetingAuthor(meeting.getMeetingAuthor());
            updatedMeeting.setMeetingContent(meeting.getMeetingContent());
            updatedMeeting.setMeetingPyNum(meeting.getMeetingPyNum());
            updatedMeeting.setMeetingPyTime(meeting.getMeetingPyTime());
            updatedMeeting.setRoomInfoCode(meeting.getRoomInfo().getRoomCode());

            // 구인 게시글 마스터 코드
            if (meeting.getRoomInfo().getGmUserCode() == 0) {
                updatedMeeting.setGmUserRes(null);
            } else {
                updatedMeeting.setGmUserRes(convertToUserRes(meeting.getRoomInfo().getGmUserCode()));
            }
            // 구인 게시글 플레이어 코드 리스트
            // 플레이어 코드 리스트
            List<UserRes> pyUserResList = new ArrayList<>();
            // 플레이어 코드
            if (meeting.getRoomInfo().getPy1Code() != 0) {
                pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy1Code()));
            }
            if (meeting.getRoomInfo().getPy2Code() != 0) {
                pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy2Code()));
            }
            if (meeting.getRoomInfo().getPy3Code() != 0) {
                pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy3Code()));
            }
            if (meeting.getRoomInfo().getPy4Code() != 0) {
                pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy4Code()));
            }
            if (meeting.getRoomInfo().getPy5Code() != 0) {
                pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy5Code()));
            }
            updatedMeeting.setPyUserResList(pyUserResList);

            return updatedMeeting;
        }
        return null;
    }

    @Override
    public MeetingDto enrollToGame(MeetingDto.Enroll enroll) {
        // 1. 방 번호를 찾아야 함
        // 1-1. 구인 게시글 찾음
        Optional<Meeting> byIdMeeting = meetingRepository.findById(enroll.getMeetingCode());
        Long roomCode = byIdMeeting.get().getRoomInfo().getRoomCode();
        // 1-2. 방 정보 찾음
        Optional<RoomInfo> byIdRoomInfo = roomInfoRepository.findById(roomCode);
        RoomInfo findRoomInfo = byIdRoomInfo.get();

        // 2. gm이면 gm에 set을 해줌
        if (enroll.getIsGm()) {
            // 2-1. gm에 추가
            findRoomInfo.setGmUserCode(enroll.getUserCode());
            roomInfoRepository.flush();
            meetingRepository.flush();
        }
        // 3. 플레이어면 플레이어 리스트에 변화
        else {
            // 3-1. 플레이어면 리스트에 변화
            MeetingDto findMeetingDto = readMeeting(enroll.getMeetingCode());
            int findPlayerNum = findMeetingDto.getPyUserResList().size();
            switch (findPlayerNum) {
                // 기존 0명
                case 0 :
                    findRoomInfo.setPy1Code(enroll.getUserCode());
                    break;
                // 기존 1명
                case 1 :
                    findRoomInfo.setPy2Code(enroll.getUserCode());
                    break;
                // 기존 2명
                case 2 :
                    findRoomInfo.setPy3Code(enroll.getUserCode());
                    break;
                // 기존 3명
                case 3 :
                    findRoomInfo.setPy4Code(enroll.getUserCode());
                    break;
                // 기존 4명
                case 4 :
                    findRoomInfo.setPy5Code(enroll.getUserCode());
                    break;
            }

            roomInfoRepository.flush();
            meetingRepository.flush();
        }

        //4. 다시 구인 게시글 정보 반환
        return getMeetingInfo(byIdMeeting.get());
    }

    /**
     * 데이터베이스로부터 구인 게시글 정보를 얻어서 구인 게시글 정보 반환
     * @param meeting 구인 게시글 정보 - 데이터베이스
     * @return 구인 게시글 정보 - 프론트로 반환
     */
    private MeetingDto getMeetingInfo(Meeting meeting) {
        MeetingDto meetingDto = new MeetingDto();
        // 구인 게시글 코드 - pk
        meetingDto.setMeetingCode(meeting.getMeetingCode());
        // 구인 게시글 제목
        meetingDto.setMeetingTitle(meeting.getMeetingTitle());
        // 구인 게시글 날짜
        meetingDto.setMeetingDate(meeting.getMeetingDate());
        // 구인 게시글 작성자
        meetingDto.setMeetingAuthor(meeting.getMeetingAuthor());
        // 구인 게시글 내용
        meetingDto.setMeetingContent(meeting.getMeetingContent());
        // 구인 게시글 게임 시작 시간
        meetingDto.setMeetingPyTime(meeting.getMeetingPyTime());
        // 구인 게시글 게임 인원수
        meetingDto.setMeetingPyNum(meeting.getMeetingPyNum());
        // 만약 지금 시간이 디비에 저장한 시간이면 true로 변환해서 불러옴
        meetingDto.setMeetingGameIsStart(meeting.getMeetingGameIsStart());
        // 구인 게시글 방 번호 코드
        meetingDto.setRoomInfoCode(meeting.getRoomInfo().getRoomCode());
        // 구인 게시글 마스터 코드

        if (meeting.getRoomInfo().getGmUserCode() == 0) {
            meetingDto.setGmUserRes(null);
        } else {
            meetingDto.setGmUserRes(convertToUserRes(meeting.getRoomInfo().getGmUserCode()));
        }
        // 구인 게시글 플레이어 코드 리스트
        // 플레이어 코드 리스트
        List<UserRes> pyUserResList = new ArrayList<>();
        // 플레이어 코드
        if (meeting.getRoomInfo().getPy1Code() != 0) {
            pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy1Code()));
        }
        if (meeting.getRoomInfo().getPy2Code() != 0) {
            pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy2Code()));
        }
        if (meeting.getRoomInfo().getPy3Code() != 0) {
            pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy3Code()));
        }
        if (meeting.getRoomInfo().getPy4Code() != 0) {
            pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy4Code()));
        }
        if (meeting.getRoomInfo().getPy5Code() != 0) {
            pyUserResList.add(convertToUserRes(meeting.getRoomInfo().getPy5Code()));
        }
        meetingDto.setPyUserResList(pyUserResList);

        return meetingDto;
    }

    private LocalDateTime stringToLocal(String inputTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(inputTime, formatter);
        return dateTime;
    }

    private UserRes convertToUserRes(long userCode) {
        Optional<User> byUserCode = userRepository.findByUserCode(userCode);
        User findUser = byUserCode.get();

        return UserRes.of(findUser);
    }
}
