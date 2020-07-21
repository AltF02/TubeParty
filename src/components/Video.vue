<template>
    <div>

    </div>
</template>

<script>
    import io from 'socket.io-client';

    export default {
        name: "Chat",
        data() {
            return {
                socket: io('localhost:3001')
            }
        },
        methods: {
            sendMessage(e) {
                e.preventDefault();

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
