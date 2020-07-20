<template>
    <div class="outerContainer">
        <Transition v-if="isJoined" animation="fade" duration="500">
            <sui-dimmer :active="isJoined">
                <sui-loader>Joining room...</sui-loader>
            </sui-dimmer>
        </Transition>
        <Video
                :log="log"
                :currUser="currUser"
                :room="room"
                :video-props="videoProps"
                :update-video-props="updatedVideoProps"
                :player-ref="playerRef"
                :send-video-state="sendVideoState"
                :load-video="loadVideo"
                :play-video-from-search="playVideoFromSearch"

        />
    </div>
</template>

<script>
    import Video from "../../components/Video/Video";
    export default {
        components: {Video},
        props: ['roomName'],
        name: "Room.vue",
        methods: {
            test: function () {
                console.log(this.$props.roomName)
            }
        },
        beforeMount() {
            this.test()
        }
    }
</script>

<style scoped>
    @import 'Room.css';
</style>
