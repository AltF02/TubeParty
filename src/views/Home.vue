<template>
  <div class="joinOuterContainer">
    <logo/>
    <transition name="fade">
      <div class="joinInnerContainer">
        <section>
          <div class="mid">
            <h2>Watch videos with friends from the same room or far away!</h2>
          </div>
          <sui-button
                  content="Create a New Room"
                  class="button-join"
                  v-on:click="JoinRoom"
          />
        </section>
      </div>
    </transition>
  </div>
</template>

<script>

  import Logo from "../components/Logo";

  export default {
    name: 'Home',
    components: {Logo},
    data: () => {
      return {
        mounted: "yes"
      }
    },
    methods: {
      JoinRoom: function () {
        let randomRoom = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i=0; i < 7; i++) {
          randomRoom += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        this.$router.push(`/room/${randomRoom}`)
      }
    }
  }
</script>
