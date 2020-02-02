<template>
    <section class="section--news" v-in-viewport.once="-200">
        <div class="box box--left">
            <div class="newsInfo">
                <h2 class="newsInfo__title">{{ newsContent.left.title }}</h2>
                <app-newsItem class="news__items" v-for="item in newsLanding" :key="item.name" :news="item">
                </app-newsItem>
            </div>
        </div>
        <div class="box box--right">
            <div class="newsInfo">
                <h3 class="newsInfo__title">{{ newsContent.right.title }}</h3>
                <div class="newsInfo__text" v-html="newsContent.right.text"></div>
                <router-link :to="{ name: 'contact-us' }"><div class="btn">Talk to An Expert</div></router-link>
            </div>
        </div>
    </section>
</template>

<script>
    import NewsItem from '../news/NewsItem.vue'

    export default {
        components: {
            'app-newsItem': NewsItem
        },
        computed: {
            newsContent () {
                return this.$store.getters.page('Home')[0].content.newsContent
            },
            newsLanding () {
                return this.$store.getters['newsLimited'](3)
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .section--news {
        padding: 10rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10rem;

        @include media ('1000') {
            grid-template-columns: 1fr;
            grid-gap: 5rem;
            padding: 5rem;

            & .box--left,.box--right {justify-self: center!important;}
        }

        &.in-viewport {
            & .box--right { animation-name: fadeInRight }

            & .newsInfo .news__items {
                animation-name: fadeInUp;

                &:nth-child(3) {animation-delay: .3s;}
                &:nth-child(4) {animation-delay: .6s;}
            }
        }

        & .box {
            width: 30rem;

            &--left {
                justify-self: right;
            }

            &--right {
                justify-self: left;
                align-self: center;
                opacity: 0;
                visibility: hidden;
                animation-duration: 1s;
                animation-fill-mode: both;
            }
        }

        & .newsInfo {
            &__title {
                font-size: 2.5rem;
                letter-spacing: 0.1rem;
            }

            &__text {
                font-weight: 300;
                & p {
                    margin-top: 2rem;
                }
            }
        }

        & .news__items {
            position: relative;
            margin-top: 5rem;
            opacity: 0;
            visibility: hidden;
            animation-duration: 1s;
            animation-fill-mode: both;
        }
    }
</style>
