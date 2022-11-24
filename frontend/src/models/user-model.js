class UserModel {
    connectionId;
    audioActive;
    videoActive;
    screenShareActive;
    nickname;
    streamManager;
    type; // 'remote' | 'local'
    auth; // 'gm' | 'player'


    constructor() {
        this.connectionId = '';
        this.audioActive = true;
        this.videoActive = true;
        this.screenShareActive = false;
        this.nickname = '';
        this.streamManager = null;
        this.type = 'local';
        this.auth = 'player';
    }

    isAudioActive() {
        return this.audioActive;
    }

    isVideoActive() {
        return this.videoActive;
    }

    isScreenShareActive() {
        return this.screenShareActive;
    }

    getConnectionId() {
        return this.connectionId;
    }

    getNickname() {
        return this.nickname;
    }

    getStreamManager() {
        return this.streamManager;
    }

    isLocal() {
        return this.type === 'local'; // local이면 true, local 아니면 false
    }
    isRemote() {
        return !this.isLocal();
    }
    setAudioActive(isAudioActive) {
        this.audioActive = isAudioActive;
    }
    setVideoActive(isVideoActive) {
        this.videoActive = isVideoActive;
    }
    setScreenShareActive(isScreenShareActive) {
        this.screenShareActive = isScreenShareActive;
    }
    setStreamManager(streamManager) {
        this.streamManager = streamManager;
    }
    setConnectionId(conecctionId) {
        this.connectionId = conecctionId;
    }
    setNickname(nickname) {
        this.nickname = nickname;
    }
    setType(type) {
        if (type === 'local' |  type === 'remote') {
            this.type = type;
        }
    }
    setAuth(auth) {
        if  (auth === 'gm' | auth === 'player') {
            this.auth = auth
        }
    }
    isGm() {
        return this.auth === 'gm';
    }
    isPlayer() {
        return !this.isGm();
    }
}

export default UserModel;
