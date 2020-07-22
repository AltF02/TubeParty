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
                  @click="JoinRoom"
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

<style scoped lang="scss">
  #root {
    height: 100vh;
  }


  * {
    box-sizing: border-box;
  }

  .joinOuterContainer {
    display: flex;
    justify-content: center;
    text-align: center;
    height: 100vh;
    align-items: center;
    background-color: #121212;;
  }

  .joinInnerContainer {
    width: 30%;
    min-width: 200px;
    transition: 0.2s all;
    section {
      padding: 0 7%;
      color: #ffffff !important;
      opacity: 0.87;
      h2,
      input {
        margin: 0;
      }
      input {
        border: 0 !important;
        border-radius: 30px !important;
        padding: 12px 16px !important;
        width: 100% !important;
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }

  .heading {
    color: #444;
    font-size: 2em;
    padding-bottom: 10px;
    border-bottom: 2px solid #444;
  }

  .button-join {
    color: #fff !important;
    background: #43a3f0 !important;
    padding: 15px 20px !important;
    border-radius: 30px !important;
    width: 80%;
    box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2) !important;
    transition: all 0.2s;
    &:hover {
      opacity: 0.9;
    }
  }

  .mid {
    margin: 20px 0;
  }

</style>
