<template>
    <div class="logoContainer">
        <h1>
            <span class="primaryColor">TUBE</span>
            <span class="secondaryColor">PARTY</span>
        </h1>
    </div>
</template>

<script>
    export default {
        name: "Logo"
    }
</script>

<style scoped lang="scss">
    .logoContainer {
        display: flex;
        justify-content: center;
        h1 {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            font-weight: 900;
            font-size: 3.5em;
            margin: 0;
            line-height: 0.8;
        }
    }
    .primaryColor {
        color: #3262d9;
    }
    .secondaryColor {
        color: #43a3f0;
    }
</style>
