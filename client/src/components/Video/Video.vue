<template>
    <div class="videoContainer">
        <YTPlayer
                ref="YTPlayer"
                class="vue-player"
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
        <sui-segment>
            <sui-grid columns="2" stackable textAlign="center">
                <sui-divider vertical>Or</sui-divider>
                <sui-grid-row verticalAlign="middle">
                    <sui-grid-column>
                        <sui-header icon>
                            <sui-icon name="search"/>
                            Search for a video on YouTube
                        </sui-header>
                        <sui-button v-on:click="searchInputFocus">Search above!</sui-button>
                    </sui-grid-column>

                    <sui-grid-column>
                        <sui-header icon>
                            <sui-icon name="youtube"/>
                            Paste a YouTube video link
                        </sui-header>
                        <sui-button color="youtube" v-on:click="youtubeWindowOpen">
                            Open Youtube
                        </sui-button>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-segment>
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

            searchInputFocus: function () {
                document.getElementById("searchInput").focus()
            },
            youtubeWindowOpen: function () {
                window.open('https://youtube.com', '_blank');
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
                const startSyncHandler = function (videoProps) {
                    this.$props.updateVideoProps({ ...videoProps });
                    this.$props.modifyVideoState({ ...videoProps });
                };

                const receiveVideoStateHandler = function ({name, room, eventName, eventParams={}}) {
                    let props = this.$props
                    const { seekTime, playbackRate, queue, searchItem, history } = eventParams;
                    this.$props.updateVideoProps({ receiving: true });
                    switch (eventName) {
                        case 'syncPlay':
                        case 'syncSeek':
                            props.updateVideoProps({ playing: true, seekTime })
                            props.modifyVideoState({ playing: true, seekTime })
                            break;
                        case 'syncPause':
                            props.updateVideoProps({ playing: false })
                            props.modifyVideoState({ playing: false })
                            break;
                        case 'syncRateChange':
                            props.updateVideoProps({ playbackRate })
                            props.modifyVideoState({ playbackRate })
                            break;
                        case 'syncLoad':
                            props.loadVideo(searchItem, false)
                            props.updateVideoProps({ history })
                            break;
                        case 'syncLoadFromQueue':
                            props.loadFromQueue(queue);
                            break;
                        case 'syncQueue':
                            props.updateVideoProps({ queue })
                            break;
                        default:
                            console.log(name, room)
                            break;
                    }
                };

                sckt.socket.on("startSync", startSyncHandler);
                sckt.socket.on("receiveVideoState", receiveVideoStateHandler);
                return () => {
                    sckt.socket.off('startSync', startSyncHandler)
                    sckt.socket.off('receiveVideoState', receiveVideoStateHandler);
                };
            }, []);
        }
    }
</script>

<style scoped>
    @import "Video.css";
</style>
