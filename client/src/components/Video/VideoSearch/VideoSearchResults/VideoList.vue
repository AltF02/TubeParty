<template>
    <div>
       <ul class="videoList">
           {{searchResults}}
           <VideoListItem
                   :on-video-play="onVideoPlay"
                   :on-video-add-to-queue="onVideoAddToQueue"
                   :key=SearchItem.video.id
                   :search-item="searchItem"
           />
       </ul>
    </div>

</template>

<script>
    import VideoListItem from "./VideoListItem";
    export default {
        name: "VideoList",
        components: {VideoListItem},
        data: function () {
            return {
                SearchItem: this.$props.searchResults.map()
            }
        },
        props: ['onVideoPlay', 'onVideoAddToQueue', 'searchResults']
    }
</script>

<style scoped>

</style>
