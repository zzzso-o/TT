import React, { Component, useEffect, useState } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';
import { useSelector } from 'react-redux';

import VolumeUp from '@material-ui/icons/VolumeUp';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import Warrior from '../../assets/image/jobs/warrior.png'
import Hunter from '../../assets/image/jobs/hunter.png'
import Priest from '../../assets/image/jobs/priest.png'
import Thief from '../../assets/image/jobs/thief.png'
import Wizard from '../../assets/image/jobs/wizard.png'
import { setJobInfo } from '../../features/Game/ProfileSlice';
import { profileData } from '../../features/Game/ProfileSlice';

export default function StreamComponent(props) {
        const [nickname, setNickName] = useState(props.user.getNickname())
        const [showForm, setShowForm] = useState(false)
        const [mutedSound, setMuteSound] = useState(false)
        const [isFormValid, setIsFormValid] = useState(true)
        const job = useSelector((state)=>state.profile.playerClass)

  useEffect(() => {
    console.log(setJobInfo)
  } )

    const handleChange = (event) => {
        setNickName({ nickname: event.target.value });
        event.preventDefault();
    }

    const toggleNicknameForm = () => {
        if (props.user.isLocal()) {
            setShowForm({ showForm: !showForm });
        }
    }

    const toggleSound = () => {
        setMuteSound({ mutedSound: !mutedSound });
    }

    const handlePressKey = (event) => {
        if (event.key === 'Enter') {
            console.log(nickname);
            if (nickname.length >= 3 && nickname.length <= 20) {
                props.handleNickname(nickname);
                toggleNicknameForm();
                setIsFormValid({ isFormValid: true });
            } else {
                setIsFormValid({ isFormValid: false });
            }
        }
    }

    // const setJob = () => {
    //     if(localStorage.getItem('job')){
    //         console.log('이거 실행됨?')
    //         state.job = localStorage.getItem('job')
    //        }
    // }

    return (
        <div className="OT_widget-container">
            <div className="pointer nickname">
                {showForm ? (
                    <FormControl id="nicknameForm">
                        <IconButton color="inherit" id="closeButton" onClick={toggleNicknameForm}>
                            <HighlightOff />
                        </IconButton>
                        <InputLabel htmlFor="name-simple" id="label">
                            Nickname
                        </InputLabel>
                        <Input
                            color="inherit"
                            id="input"
                            value={nickname}
                            onChange={handleChange}
                            onKeyPress={handlePressKey}
                            required
                        />
                        {!isFormValid && nickname.length <= 3 && (
                            <FormHelperText id="name-error-text">Nickname is too short!</FormHelperText>
                        )}
                        {!isFormValid && nickname.length >= 20 && (
                            <FormHelperText id="name-error-text">Nickname is too long!</FormHelperText>
                        )}
                    </FormControl>
                ) : (
                    <div onClick={toggleNicknameForm}>
                        <span id="nickname">{props.user.getNickname()}</span>
                        {props.user.isLocal() && <span id=""> (edit)</span>}
                    </div>
                )}
            </div>

            {props.user !== undefined && props.user.getStreamManager() !== undefined ? (
                <div className="streamComponent">
                    <OvVideoComponent user={props.user} mutedSound={mutedSound} />
                    {/* <div id="statusIcons">
                        {!this.props.user.isVideoActive() ? (
                            <div id="camIcon">
                                <VideocamOff id="statusCam" />
                            </div>
                        ) : null}

                        {!this.props.user.isAudioActive() ? (
                            <div id="micIcon">
                                <MicOff id="statusMic" />
                            </div>
                        ) : null}
                    </div> */}
                    {/* {job=='warrior' ? (
                    <div className='job-icon'>
                        <img className='job-img' src={Warrior}></img>
                    </div>
                    ): null }
                    {job=='wizard' ? (
                    <div className='job-icon'>
                        <img className='job-img' src={Wizard}></img>
                    </div>
                    ): null }
                    {job=='hunter' ? (
                    <div className='job-icon'>
                        <img className='job-img' src={Hunter}></img>
                    </div>
                    ): null }
                    {job=='thief' ? (
                    <div className='job-icon'>
                        <img className='job-img' src={Thief}></img>
                    </div>
                    ): null }
                    {job=='priest' ? (
                    <div className='job-icon'>
                        <img className='job-img' src={Priest}></img>
                    </div>
                    ): null } */}

                    <div>
                        {!props.user.isLocal() && (
                            <IconButton id="volumeButton" onClick={toggleSound}>
                                {mutedSound ? <span class="material-icons">volume_off</span> : <VolumeUp />}
                            </IconButton>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
