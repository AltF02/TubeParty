import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from "react-player";
import screenful from 'screenfull';
import Controls from "./Controls"

import './Player.scss';

let count = 0;

function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

const Player = ({ videoProps, sendVideoState, updateVideoProps, loadVideo, loadFromQueue, playerRef }) => {
    const [isVideoStarted, setIsVideoStarted] = useState(false);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [state, setState] = useState({
        pip: false,
        playing: false,
        light: false,
        muted: false,
        played: 0,
        duration: 0,
        playbackRate: 1.0,
        volume: 1.0,
        seeking: false,
        isFullscreen: false,
        jumpedTime: 0
    });

    const playerContainerRef = useRef(null)
    const controlsRef = useRef(null);

    const currentTime = (playerRef && playerRef.current) ? playerRef.current.getCurrentTime() : 0;
    const duration = (playerRef && playerRef.current) ? playerRef.current.getDuration() : 0;

    const {
        light,
        muted,
        playbackRate,
        pip,
        seeking,
        volume,
        isFullscreen,
        jumpedTime
    } = state;

    const {
        queue,
        history,
        playing,
        seekTime,
        receiving,
        initVideo,
        videoType
    } = videoProps;


}

