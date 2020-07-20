<template>
    <div>
        <youtube
                video-id="FfZil5wkZ1M"
                ref="youtube"
                class="vue-player"
                @paused="onPause"
        />
        <button v-on:click="pauseVideo">Pause</button>
    </div>
</template>

<script>

    export default {
        name: "YTPlayer",
        props: [
            'log',
            'videoProps',
            'sendVideoState',
            'updateVideoProps',
            'playerRef',
            'loadVideo',
            'loadFromQueue'
        ],
        methods: {
            pauseVideo: function () {
                this.$refs.youtube.player.pauseVideo();
            },
            onPause: function () {
                console.log("Paused")
            }
        }
    }
</script>

<style scoped>

</style>
