import React, { useState, useRef, useEffect } from 'react';
import { store } from 'react-notifications-component';
import {Dimmer, Transition, Loader} from "semantic-ui-react";

const Room = ({ location, history, match }) => {
    const playerRef = useRef(null);
    const [currUser, setCurrUser ] = useState({
        id: '',
        name: JSON.parse(localStorage.getItem('name')),
        colors: JSON.parse(localStorage.getItem('colors'))
    });
    const [room, setRoom] = useState('');
    const [videoProps, setVideoProps] = useState({
        queue: [],
        history: [],
        playing: true,
        seekTime: 0,
        receiving: false,
        initVideo: false,
        videoType: 'yt'
    });

    return (
        <div className="outerContainer">
            <Transition visible={true} animation='fade' duration={500}>
                <Dimmer active={true}>
                    <Loader>Joining Room...</Loader>
                </Dimmer>
            </Transition>
        </div>
    )
}

export default Room;
