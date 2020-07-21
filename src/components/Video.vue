<template>
    <div>
        <youtube
                :video-id="videoId"
                ref="youtube"
                @paused="sendVideoUpdate('pause')"
                @playing="sendVideoUpdate('play')"
                @buffering="sendVideoUpdate('buffer')"
        >

        </youtube>
    </div>
</template>

<script>
    import io from 'socket.io-client';

    export default {
        name: "Chat",
        data() {
            return {
                videoId: "FfZil5wkZ1M",
                socket: io('localhost:3001')
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
