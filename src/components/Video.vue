<template>
    <div>
        <youtube
                :video-id="videoId"
                ref="youtube"
                @paused="sendVideoUpdate('pause')"
                @playing="sendVideoUpdate('play')"
                @buffering="sendVideoUpdate('buffer')"
        />
        <sui-button @click="test_socket">Test</sui-button>

    </div>
</template>

<script>
    import io from 'socket.io-client';

    export default {
        name: "Chat",
        data() {
            return {
                videoId: "FfZil5wkZ1M",
                socket: io('https://tube-party.herokuapp.com/')
            }
        },
        methods: {
            sendVideoUpdate(state) {

                switch (state) {
                    case 'pause':
                        this.socket.emit('')
                }

                this.socket.emit('SEND_MESSAGE', {
                    user: this.user,
                    message: this.message
                });
                this.message = '';
            },
            test_socket () {
                this.socket.emit('YEET')
            }
        },
        mounted() {
            this.socket.on('MESSAGE', (data) => {
                this.messages = [...this.messages, data];
            })
        }
    }
</script>

<style scoped>

</style>
