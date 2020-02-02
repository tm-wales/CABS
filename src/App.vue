<template>
<div class="app">
    <app-loading></app-loading>
    <div class="main">
        <app-nav></app-nav>
        <transition
            name="slide--right"
            mode="out-in"
        >
            <router-view class="router--main"></router-view>
        </transition>
        <app-footer></app-footer>
        <app-gackie></app-gackie>
    </div>
</div>
</template>

<script>
import Nav from './components/nav/Index.vue'
import Footer from './components/footer/Index.vue'
import Loading from './components/partials/loading.vue'
import Gackie from './components/partials/gackie.vue'

export default {
    components: {
        'app-nav': Nav,
        'app-loading': Loading,
        'app-footer': Footer,
        'app-gackie': Gackie
    },
    created () {
        this.$store.dispatch('initDivisions')
        this.$store.dispatch('initPages')
        this.$store.dispatch('initConfig')
        this.$store.dispatch('initWork')
        this.$store.dispatch('initNews')
        this.$store.dispatch('initFooter')
        this.$store.dispatch('initPolicies')
    },
    mounted () {
        var mthis = this
        window.addEventListener('load', function () {
            mthis.$store.dispatch('setProperty', {property: 'loaded', value: true})
        }, false)
    }
}
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";
    @import "@/scss/base.scss";
    @import "@/scss/router-transitions.scss";

    .app {
        background-color: $color-primary-dark;
    }
</style>
