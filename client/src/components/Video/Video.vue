<template>
    <div class="videoContainer">
        <YTPlayer ref="YTPlayer"/>
        <VideoSearch/>
        <sui-button v-on:click="pauseVideo">Pause</sui-button>
        <sui-button v-on:click="playVideo">Play</sui-button>
    </div>
</template>

<script>
    import YTPlayer from "./YTPlayer/YTPlayer";
    import VideoSearch from "./VideoSearch/VideoSearch"
    export default {
        name: "Video",
        components: {VideoSearch, YTPlayer},
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
