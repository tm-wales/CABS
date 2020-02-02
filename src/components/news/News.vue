<template>
    <section class="page--newsItem">
        <header>
            <div class="header__image--container">
                <div class="header__image" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0) 100%), url(' + `${getNewsItem.title.image}` + ')' }"></div>
            </div>
            <div class="header__overlay">
                <div class="header__gap"> Featured </div>
                <h1 class="primary"> {{ getNewsItem.name }} </h1>
                <h2 class="primary"> {{ getNewsItem.title.text }}</h2>
            </div>
        </header>

        <section class="news">
            <div class="news__title"> {{ getNewsItem.date }}</div>
            <div class="news__content" v-html="getNewsItem.content"></div>
        </section>
    </section>
</template>

<script>
    export default {
        computed: {
            getNewsItem () {
                let news = this.$route.params.news
                let data = this.$store.getters.newsItem(news)[0]
                return data
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .page--newsItem {
        background-color: $color-offwhite;

        & header {position: relative;}

        & .header {
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
                margin-right: 8rem;
                padding: 2rem;
                transform: translateY(-50%);
                color: $color-white;

                @include media ('900') {
                    left: 4rem;
                    margin-right: 4rem;
                }

                @include media ('500') {
                    left: 2rem;
                    margin-right: 2rem;
                }
            }

            &__title {
                color: $color-white;
                text-align: left;
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

        & .news {
            background-color: $color-white;
            max-width:90rem;
            margin: 0 auto;
            margin-top: 1rem;
            padding: 5rem 10rem;

            @include media ('700') {
                padding: 3rem;
            }

            &__title {
                font-size: 1.6rem;
                color: $color-primary-light;
            }

            &__content {
                & > *:first-child {
                    margin-top: 2rem;
                }

                & p {
                    margin-top: 5rem;
                }

                & img {
                    width: 100%;
                    height: auto;
                    margin-top: 5rem;
                }

                & a {
                    color: $color-primary;
                    transition: color .3s;
                    &:hover {
                        color: $color-primary-light;
                    }
                }
            }
        }
    }
</style>
