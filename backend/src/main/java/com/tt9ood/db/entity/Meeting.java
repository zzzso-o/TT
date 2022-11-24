package com.tt9ood.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@NoArgsConstructor
public class Meeting {
    // 자동 생성되는 pk
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meet_code")
    private Long meetingCode;
    // 구인 게시글 제목
    @Column(name = "meet_title")
    private String meetingTitle;
    // 구인 게시글 작성자
    @Column(name = "meet_author")
    private String meetingAuthor;
    // 구인 게시글 작성 시간
    @Column(name = "meet_date")
    private String meetingDate;
    // 구인 게시글 내용
    @Column(name = "meet_content", columnDefinition = "TEXT")
    private String meetingContent;
    // 구하는 사람 수
    @Column(name = "meet_py_num")
    private int meetingPyNum;
    // 게임 시작 시간
    @Column(name = "meet_py_time")
    private String meetingPyTime;
    // 게임이 시작할 시간인지 아닌지
    @Column(name = "meet_game_isStart")
    private Boolean meetingGameIsStart;

    // 게임 방 정보
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_code")
    private RoomInfo roomInfo;

    public Meeting(String meetingTitle, String meetingAuthor,
                   String meetingContent, int meetingPyNum, String meetingPyTime) {
        this.meetingTitle = meetingTitle;
        this.meetingAuthor = meetingAuthor;
        this.meetingDate = currTime();
        this.meetingContent = meetingContent;
        this.meetingPyNum = meetingPyNum;
        this.meetingPyTime = meetingPyTime;
        this.meetingGameIsStart = false;
    }

    /**
     * 구인 게시판 수정 메서드
     * @param meetingTitle 구인 게시판 제목
     * @param meetingAuthor 구인 게시판 작성자
     * @param meetingContent 구인 게시판 게시글
     * @param meetingPyNum 모집하는 인원 수
     * @param meetingPyTime 게임 시작하는 시간
     */
    public void updateMeeting(String meetingTitle, String meetingAuthor, String meetingContent,
                              int meetingPyNum, String meetingPyTime, boolean meetingGameIsStart) {
        this.meetingTitle = meetingTitle;
        this.meetingAuthor = meetingAuthor;
        this.meetingDate = currTime();
        this.meetingContent = meetingContent;
        this.meetingPyNum = meetingPyNum;
        this.meetingPyTime = meetingPyTime;
        this.meetingGameIsStart = meetingGameIsStart;
    }

    public void setRoomInfo(RoomInfo roomInfo) {
        this.roomInfo = roomInfo;
    }

    /**
     * 게임 시작시간이면 변경하는 메서드
     */
    public void setMeetingGameIsStart(Boolean meetingGameIsStart) {
        this.meetingGameIsStart = meetingGameIsStart;
    }

    /**
     * 구인 게시판 작성하는 시간
     * @return String 작성하는 시간
     */
    private String currTime() {
        // 형식
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        // 현재 시간을 문자열로 변환
        String formattedDateTime = LocalDateTime.now().format(formatter);

        return formattedDateTime;
    }
}
