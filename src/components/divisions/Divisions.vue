<template>
    <div class="divisions">
        <app-divisions-item></app-divisions-item>
        <section  class="closing">
            <div class="closing__title">{{ getPage.content.closing.main }}</div>
            <div class="closing__statement"> {{ getPage.content.closing.sub }}</div>
        </section>
    </div>
</template>

<script>
    import items from './DivisionItems.vue'
    export default {
        components: {
            'app-divisions-item': items
        },
        computed: {
            getPage () {
                return this.$store.getters.page('Division')[0]
            }
        },
        metaInfo () {
            return {
                title: this.getPage.pageTitle.replace('#Division#', ((!this.$route.params.division) ? 'All Divisions' : this.$route.params.division)),
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
        padding-top: 11rem;
    }

    .statement {
        padding: 0 5rem;
        max-width: 70rem;
        margin: 0 auto;
        text-align: center;
        color: $color-text-dark;
        font-size: 2rem;
        font-style: italic;
        font-weight: 300;
    }
</style>
