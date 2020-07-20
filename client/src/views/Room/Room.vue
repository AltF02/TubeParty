<template>
    <div class="outerContainer">
        <Video/>
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

</style>
