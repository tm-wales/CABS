<template>
    <div class="page--news">
        <transition
            name="fade"
            mode="out-in"
        >
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        computed: {
            getPage () {
                return this.$store.getters.page('News')[0]
            }
        },
        metaInfo () {
            return {
                title: this.getPage.pageTitle.replace('#News#', ((!this.$route.params.news) ? 'All News' : this.$route.params.news)),
                meta: this.getPage.meta
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .page--news {
        background-color: white;
        padding-top: 5rem;
    }
</style>
