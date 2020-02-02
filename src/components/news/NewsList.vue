<template>
    <section class="page--newslist">
        <header>
            <div class="header__image--container">
                <div class="header__image" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0) 100%), url(' + `${getFeature.title.image}` + ')' }"></div>
            </div>
            <router-link class="header__overlay" :to="{ name: 'news', params: { news: getFeature.name } }">
                <h1 class="header__h1">Featured News</h1>
                <div class="h1 primary"> {{ getFeature.name }} </div>
                <div class="h2 primary"> {{ getFeature.title.text }}</div>
            </router-link>
        </header>

        <div class="news__items">
            <app-newsItem class="news__items__item" v-for="item in getNews" :key="item.name" :news="item" v-in-viewport.once="-200"></app-newsItem>
        </div>

    </section>
</template>

<script>
    import NewsItem from '../news/NewsItem.vue'

    export default {
        components: {
            'app-newsItem': NewsItem
        },
        data () {
            return {
                news: [{
                    name: '',
                    featured: true,
                    date: '',
                    title: {
                        text: '',
                        image: ''
                    },
                    content: ''
                }],
                max: 10
            }
        },
        methods: {
            loadNews () {
                this.news = this.$store.getters['news']
            },
            scroll () {
                window.onscroll = () => {
                    if (this.max <= this.news.length) {
                        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight

                        if (bottomOfWindow) {
                            this.max += 10
                        }
                    }
                }
            }
        },
        computed: {
            getNews () {
                return this.news.slice(0, this.max)
            },
            getFeature () {
                let i = 0
                for (i = 0; i < this.news.length; i++) {
                    if (this.news[i].featured === true) {
                        break
                    }
                }
                return this.news[i]
            }
        },
        mounted () {
            this.loadNews()
            this.scroll()
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .page--newslist {
        background-color: $color-white;

        & header {position: relative;}

        & .header {
            &__h1 {
                font-size: 1.6rem;
                font-weight: 400;
                text-align: left;
                margin-left: .5rem;

                @include media ('1000') {
                    text-align: center;
                    margin-left: 0;
                }
            }

            &__gap {
                opacity: 0;
            }
            &__image {
                &--container {
                    height: 60vh;
                    background-color: $color-offwhite;
                    padding-top: 1rem;
                }

                height: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
            }

            &__overlay {
                position: absolute;
                top: 40%;
                left: 8rem;
                padding: 2rem;
                transform: translateY(-50%);
                color: $color-white;

                @include media ('1000') {
                    left: 0;
                    margin-right: 0;
                }

                &:hover {
                    & .h2.primary:before,.h2.primary:after {
                        width: 2.5rem;
                    }
                }
            }

            &__title {
                font-size: 8rem;
                font-weight: 700;
                color: $color-white;
            }

            &__subtitle {
                font-size: 1.3rem;
                text-transform: uppercase;
                letter-spacing: 0.2rem;
                color: $color-white;
                display:inline-block;

                &:before {
                    content: '';
                    display:inline-block;
                    vertical-align: middle;
                    width: 1.5rem;
                    margin-right: 1.125rem;
                    border-bottom: 1px solid $color-white;
                    margin-left: .5rem;
                    transition: .3s width;
                }
            }
        }

        & .news__items {
            display: grid;
            max-width: 150rem;
            margin: 0 auto;
            grid-template-columns: repeat( auto-fit, minmax(28rem, 1fr) );
            grid-gap: 5rem;
            padding: 5rem;

            @include media ('700') {
                padding: 2rem;
            }

            &__item {
                position: relative;
                margin-top: 0;
                opacity: 0;
                visibility: hidden;
                animation-duration: 1s;
                animation-fill-mode: both;

                &.in-viewport {
                    animation-name: fadeInUp;
                }
            }
        }
    }
</style>
