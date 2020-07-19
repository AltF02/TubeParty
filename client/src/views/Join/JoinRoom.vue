<template>
    <div class="joinOuterContainer">
        <logo/>
        <Transition animation="scale" duration=500>
            <div class="joinInnerContainer">
                <section>
                    <div class="mid">
                        <h2>Watch videos with friends from the same room or far away!</h2>
                    </div>
                    <button
                            content="Create a New Room"
                            class="button-join"
                            v-on:click="JoinRoom"
                    />
                </section>
            </div>
        </Transition>
    </div>
</template>

<script>
    import Logo from "../../components/Logo/Logo";
    export default {
        name: "JoinRoom",
        components: {Logo},
        data: () => {
            return {
                mounted: "yes"
            }
        },
        methods: {
            JoinRoom: function () {
                const randomRoom = "This is a test";
                this.$router.push(`/room/${randomRoom}`)
            }
        }
    }
</script>

<style scoped>
    @import "Join.css";
</style>
