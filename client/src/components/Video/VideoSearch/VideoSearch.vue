<template>
    <div class="videoSearchContainer">
        <sui-input
                fluid
                id="searchInput"
                size="large"
                placeholder="Search a video or paste a YouTube link..."
                v-model="searchInput"
                v-bind:loading="loading"
                @keyup.enter="videoSearch"
        />
        <h2>{{ searchInput }}</h2>
        <video-search-results
                :search-results="searchResults"
                :play-video-from-search="playVideoFromSearch"
                :add-video-to-queue="addVideoToQueue"
                :page="page"
                :search="search"
                :search-input="searchInput"
                :loading="loading"
        />
    </div>

</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'
    import VideoSearchResults from "./VideoSearchResults";

    const baseUrl = process.env.BASE_URL

    require('dotenv').config()

    export default {
        name: "VideoSearch.vue",
        components: {VideoSearchResults},
        props: ['addVideoToQueue', 'playVideoFromSearch'],
        methods: {
            videoSearch: async (term, page=1, limit=9) => {
                axios.get(`${baseUrl}/search`, {
                    params: {
                        query: term,
                        page: page,
                        limit: limit
                    }
                }).then(response => {
                    this.$data.searchResults = response.data.results
                    this.$data.loading = false
                    this.$data.page = page
                });
            },
            videoShow: async (videoId) => {
                axios.get(`${baseUrl}/watch`, {
                    params: {videoId}
                }).then(response => {
                    this.$data.searchResults = response.data.results;
                    this.$data.loading = false;
                })
            },
            handlePlay: (event) => {
                event.preventDefault();
                let trimInput = this.$data.searchInput.trim();
                if (trimInput === '') {
                    return
                }
                let videoId = ''
                this.$data.search({ videoId })
            }
        },
        data() {
            return {
                searchInput: '',
                loading: false,
                page: 1,
                searchResults: '',
                search: _.debounce(({term, page, videoId}) => {
                    this.$data.loading = true
                    if (videoId === undefined) {
                        const limit = (window.matchMedia('(max-width: 960px)').matches) ? 8 : 9
                        this.videoSearch(term, page, limit)
                    } else this.videoShow(videoId);
                }, 5)
            }
        }
    }
</script>

<style scoped>

</style>
