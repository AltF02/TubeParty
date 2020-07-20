<template>
    <div class="videoContainer">
        <YTPlayer/>
    </div>
</template>

<script>
    import YTPlayer from "./YTPlayer/YTPlayer";
    export default {
        name: "Video",
        components: {YTPlayer}
    }
</script>

<style scoped>

</style>
