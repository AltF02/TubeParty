<template>
    <div>
        <VideoList
                :on-video-play="selectedVideo => playVideoFromSearch(selectedVideo)"
                :on-video-add-to-queue="selectedVideo => addVideoToQueue(selectedVideo)"
                :search-results="searchResults"
        />
        <div class="navIcons">
            <sui-button-group>
                <sui-button v-on:click="handlePrevPage" :disabled="page - 1 < 1">Prev</sui-button>
                <sui-button-or :text="page.toString()"/>
                <sui-button v-on:click="handleNextPage" :disabled="searchResults.length < 8">Next</sui-button>
            </sui-button-group>
        </div>
    </div>
</template>

<script>
    import VideoList from "./VideoSearchResults/VideoList";
    export default {
        name: "VideoSearchResults",
        props: [
            'searchResults',
            'playVideoFromSearch',
            'addVideoToQueue',
            'page',
            'search',
            'searchInput',
            'searching'
        ],
        methods: {
            handlePrevPage: function () {
                if (this.$props.page - 1 >= 1) {
                    this.$props.search({ term: this.$props.searchInput, page: this.$props.page - 1})
                }
            },
            handleNextPage: function () {
                this.$props.search({ term: this.$props.searchInput, page: this.$props.page + 1})
            }
        },
        components: {VideoList}
    }
</script>

<style scoped>

</style>
