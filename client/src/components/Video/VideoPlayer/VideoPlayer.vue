<template>
    <div class="videoPlayerContainer">
        <VideoPlayer
                :ref="playerRef"
                class="videoPlayer"
                width="100%"
                height="100%"
                controls
                :url="currUrl.current"
                @ready="onReady"
                @play="onStateChange(1)"
                @pause="onStateChange(2)"
                @waiting="onStateChange(3)"
        />
    </div>
</template>

<script>
    import { useState } from 'vue-hooks';
    import 'video.js/dist/video-js.css';
    import { videoPlayer } from 'vue-video-player';

    const [sequence, setSequence] = useState([]);

    function onPlay(seekTime) {
        this.$props.updateVideoProps({
            lastStateYT: 1,
            playing: true,
            receiving: false,
            seekTime
        });
        // eslint-disable-next-line no-constant-condition
        if (false) {
            setSequence([]);
        }
    }

    function onPause(seekTime) {
        this.$props.updateVideoProps({
            lastStateYT: 2,
            playing: false,
            receiving: false,
            seekTime
        });
    }

    function onBuffer() {
        this.$props.updateVideoProps({ lastStateYT: 3 });
    }

    function handleVideoSync({ type, event, seekTime }) {
        const { receiving } = this.$props.videoProps;
        console.log(event);
        if (!receiving) {
            if (type === 1 && !sequence.includes(-1)) {
                this.$props.sendVideoState({
                    eventName: 'syncPlay',
                    eventParams: { seekTime }
                });
            } else if (type === 2) {
                this.$props.sendVideoState({
                    eventName: 'syncPause'
                })
            }
        }
    }

    const PlayerState = {
        UNSTARTED: -1,
        ENDED: 0,
        PLAYING: 1,
        PAUSED: 2,
        BUFFERING: 3,
        VIDEO_CUED: 5
    };

    export default {
        name: "VideoPlayer",
        props: ['currUrl',
            'log',
            'videoProps',
            'sendVideoState',
            'updateVideoProps',
            'playerRef',
            'loadVideo',
            'loadFromQueue'
        ],
        methods: {
            onReady: function () {
                const { history, recieving } = this.$props.videoProps;
                if (recieving) {
                    this.$props.loadVideo(history[0], true)
                }
            },

            onStateChange: function (playerState) {
                let playerRef = this.$props.playerRef
                if (playerRef != null) {
                    let player = playerRef.current.getInternalPlayer();
                    if (player !== null) {
                        const currTime = playerRef.current.getCurrentTime();
                        switch (playerState) {
                            case PlayerState.UNSTARTED:
                                handleVideoSync({ type: -1, event: "UNSTARTED"});
                                break;

                            case PlayerState.PLAYING:
                                onPlay(currTime);
                                handleVideoSync({ type: 1, event: "PLAY", seekTime: currTime})
                                break;

                            case PlayerState.PAUSED:
                                onPause(currTime);
                                handleVideoSync({ type: 2, event: "PAUSE", seekTime: currTime})
                                break;

                            case PlayerState.BUFFERING:
                                onBuffer();
                                handleVideoSync({ type: 3, event: "BUFFER"})
                                break;

                            default:
                                break;

                        }
                    }
                }
            }
        },
        components: {
            videoPlayer
        }
    }
</script>

<style scoped>

</style>
