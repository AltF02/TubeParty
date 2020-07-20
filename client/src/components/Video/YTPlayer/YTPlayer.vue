<template>
    <div>
        <youtube
                video-id="i20TUj4d8sw"
                ref="youtube"
                class="vue-player"
                @paused="onPause"
        />
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
            onPause: function () {
                this.$events.fire('yt-video-paused');
            }
        }
    }
</script>

<style scoped>

</style>
