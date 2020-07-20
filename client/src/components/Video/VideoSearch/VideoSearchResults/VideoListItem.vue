<template>
    <li class="list-group-item">
        <div class="search-item-container">
            <div v-on:click="onVideoPlay(searchItem)" class="search-item-thumb">
                <img v-bind:src="searchItem.video.thumbnail" alt="video thumbnail"/>
            </div>
            <div class="search-item-body">
                <h3 v-on:click="onVideoPlay(searchItem)" class="search-item-title">
                    {{searchItem.video.title}}
                </h3>
                <div class="search-item-channel-title">
                    {{searchItem.channel.username}}
                    {{searchItem.channel.verified}}
                    <label class="verifiedIcon">
                        <sui-icon name="check circle"/>
                    </label>
                </div>
                <div class="search-item-channel-date">
                    <div>{{searchItem.video.views}} • {{searchItem.video.upload_date}}</div>
                    <div><sui-button v-on:click="changeQueueIcon($event)" class="videoIcon" icon="plus" size="big"/></div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "VideoListItem",
        props: ['searchItem', 'onVideoPlay', 'onVideoAddToQueue'],
        methods: {
            changeQueueIcon: (e) => {
                e.target.setAttribute("class", "check icon");
                setTimeout(() => {
                    e.target.setAttribute("class", "plus icon");
                }, 3000)
            }
        }
    }
</script>

<style scoped>

</style>
