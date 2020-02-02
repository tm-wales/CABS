<template>
    <div class="loading" :class="{ off: config.loaded }">
        <div class="textblock">
            <div class="text-1">Welcome to CABS Group</div>
            <div class="centered">
                <div class = "blob-1"></div>
                <div class = "blob-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['config'])
    }
}
</script>

<style lang="scss" scoped>
    @import "@/scss/vue-globals.scss";

    .loading {
        color: $color-white;
        position: fixed;
        height: 100vh;
        width: 100vw;
        z-index: 9999;
        background-color: rgba($color-background-loading,1);
        transition: 1s all;
        transform: scale(2);
        border-radius: 5%;

        &.off {
            z-index: -1;
            opacity: 0;
            transform: scale(0.01);
        }
    }

    .textblock {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        text-align: center;
    }

    .text-1,
    .text-2 {
        font-size: 1.5rem;
        text-align: center;
    }

    .centered {
        width:64px;
        height:64px;
        position:relative;
        margin: 0 auto;
    }

    .blob-1,
    .blob-2 {
        width:12px;
        height:12px;
        position:absolute;
        border-radius:10%;
        top: 26px;
        left: 26px;
        will-change: transform;
        border: 1px solid transparent;
        background-color: $color-white;
    }

    .blob-1{
        animation:osc-l 2.5s ease-in-out infinite;
    }

    .blob-2{
        animation:osc-r 2.5s ease-in-out infinite;
        background-color: $color-primary-light;
    }

    @keyframes osc-l {
        0% { transform: translate(0) }
        20% { transform: translate(-100%, -100%) }
        40% { transform: translate(100%, -100%) }
        60% { transform: translate(100%, 100%) }
        80% { transform: translate(-100%, 100%) }
        100% { transform: translate(0) }
    }

    @keyframes osc-r {
        0% { transform: translate(0) }
        20% { transform: translate(100%, 100%) }
        40% { transform: translate(-100%, 100%) }
        60% { transform: translate(-100%, -100%) }
        80% { transform: translate(100%, -100%) }
        100% { transform: translate(0) }
    }
</style>
