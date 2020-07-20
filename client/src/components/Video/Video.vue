<template>
    <div class="videoContainer">
        <YTPlayer
                ref="YTPlayer"
                :log="log"
                :video-props="videoProps"
                :send-video-state="sendVideoState"
                :update-video-props="updateVideoProps"
                :player-ref="playerRef"
                :load-video="loadVideo"
                :load-from-queue="loadFromQueue"

        />
        <!--<VideoSearch
                :add-video-to-queue="addVideoToQueue"
                :play-video-from-search="playVideoFromSearch"
        /> -->
        <sui-button v-on:click="pauseVideo">Pause</sui-button>
        <sui-button v-on:click="playVideo">Play</sui-button>
    </div>
</template>

<script>
    import YTPlayer from "./YTPlayer/YTPlayer";
    import {insert} from "./VideoHelper";
    import { useEffect } from 'vue-hooks'
    import { sckt } from "../Socket";

    // import VideoSearch from "./VideoSearch/VideoSearch"
    export default {
        name: "Video",
        components: {YTPlayer},
        props: [
            'log',
            'name',
            'room',
            'videoProps',
            'updateVideoProps',
            'playerRef',
            'sendVideoState',
            'loadVideo',
            'playVideoFromSearch'
        ],
        mounted: function () {
            this.$refs.YTPlayer.$refs.youtube.player.playVideo();
        },
        methods: {
            pauseVideo: function () {
                this.$refs.YTPlayer.$refs.youtube.player.pauseVideo();
            },

            playVideo: function () {
                this.$refs.YTPlayer.$refs.youtube.player.playVideo();
            },

            loadFromQueue: function (queue, sync=false) {
                let nextVideo = queue.shift();
                if (nextVideo !== undefined) {
                    this.$props.loadVideo(nextVideo, sync);
                    this.$props.updateVideoProps({ queue });
                    this.$props.updateVideoProps({ history: [nextVideo, ...this.$props.videoProps] });
                }
            },

            modifyVideoState: function (paramsToChange) {
                if (this.$props.playerRef.current !== null && this.$props.playerRef.current.internalPlayer !== null) {
                    const { lastStateYt } = this.$props.videoProps;
                    const { playing, seekTime, playbackRate } = paramsToChange;
                    let player = this.$props.playerRef.current.player;
                    if (playing !== undefined) {
                        if (playing) {
                            if (seekTime) player.seekTo(seekTime)
                            if (lastStateYt !== 1 || lastStateYt !== 3) {
                                player.playVideo();
                            } else {
                                if (lastStateYt !== 2)
                                    player.pauseVideo();
                            }
                        }
                    } else if (playbackRate !== undefined) {
                        player.setPlaybackRate(playbackRate)
                        }
                    }

            },

            addVideoToQueue: function (searchItem) {
                let { queue } = this.$props.videoProps;
                let updatedQueue = insert(queue, queue.length, searchItem)
                this.$props.sendVideoState({
                    eventName: "syncQueue",
                    eventParams: {
                        queue: updatedQueue,
                        type: "add"
                    }
                });
                this.$props.updateVideoProps({ queue: updatedQueue })
            }

        },

        hooks () {
            useEffect(() => {
                const getSyncHandler = ({ id }) => {
                    if (this.$props.playerRef.current !== null && this.$props.playerRef.current.internalPlayer !== null) {
                        let player = this.$props.playerRef.current.internalPlayer;
                        player.getCurrentTime().then((currTime) => {
                            let params = {
                                id: id,
                                ...this.$props.videoProps,
                                seekTime: currTime,
                                receiving: true
                            }
                            sckt.socket.emit('sendSync', params, (error) => console.log(error));
                        })
                    }
                }
                sckt.socket.on("getSync", getSyncHandler);
                return () => {
                    sckt.socket.off('getSync', getSyncHandler);
                };
            })
            useEffect(() => {
                const startSyncHandler = (videoProps) => {
                    this.$props.updateVideoProps({ ...videoProps });
                    this.$props.modifyVideoState({ ...videoProps });
                };
            })
        },

        events: {
            'yt-video-paused'() {
                console.log("yt-video-paused received")
            }
        }
    }
</script>

<style scoped>

</style>
