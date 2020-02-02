<template>
    <div class="page--ourwork">
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
                return this.$store.getters.page('OurWork')[0]
            }
        },
        metaInfo () {
            return {
                title: this.getPage.pageTitle.replace('#Work#', ((!this.$route.params.work) ? 'All Work' : this.$route.params.work)),
                meta: this.getPage.meta
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/router-transitions.scss";
    .page--ourwork {
        padding-top: 5rem;
        background-color: white;
    }
</style>
