import React, { useEffect } from 'react';

const Video = ({ log, name, room, videoProps, updateVideoProps, playerRef, sendVideoState, loadVideo}) => {

    return (
        <div className="videoContainer">
            <VideoPlayer

            />
        </div>
    )
}

export default Video;
