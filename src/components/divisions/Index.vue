<template>
    <div class="page--divisions">
        <app-div-nav></app-div-nav>

        <transition
            name="fade"
            mode="out-in"
        >
        <router-view :key="$route.params.division"></router-view>
        </transition>
    </div>
</template>

<script>
    import nav from './Nav.vue'
    export default {
        components: {
            'app-div-nav': nav
        },
        computed: {
            getPage () {
                return this.$store.getters.page('Divisions')[0]
            }
        },
        metaInfo () {
            return {
                title: this.getPage.pageTitle.replace('#Division#', this.$route.params.division),
                meta: this.getPage.meta
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";
    @import "@/scss/router-transitions.scss";

    .page--divisions {
        background-color: white;
        padding-top: 10rem;
    }
</style>
