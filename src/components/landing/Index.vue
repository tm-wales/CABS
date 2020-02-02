<template>
    <div class="page--landing">
        <app-landing-header></app-landing-header>
        <app-landing-divisions id="next-section"></app-landing-divisions>
        <app-landing-quote></app-landing-quote>
        <app-landing-our-work></app-landing-our-work>
        <app-landing-news></app-landing-news>
    </div>
</template>
<script>
    import Header from './Header.vue'
    import Divisions from '../divisions/DivisionItems.vue'
    import OurWork from './OurWork.vue'
    import News from './News.vue'
    import RequestQuote from './RequestQuote.vue'

    export default {
        components: {
            'app-landing-header': Header,
            'app-landing-divisions': Divisions,
            'app-landing-our-work': OurWork,
            'app-landing-quote': RequestQuote,
            'app-landing-news': News
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .page--landing {
        background-color: $color-white;
    }
</style>
