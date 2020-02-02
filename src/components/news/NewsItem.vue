<template>
    <div class="news__item">
        <div class="news__item__image" :style="{ backgroundImage: 'url(' + news.title.image + ')' } "></div>
        <div class="news__item__text">
            <div class="news__item__title"> {{news.name}}</div>
            <div class="news__item__summary"> {{news.title.text}}</div>
            <router-link :to="{ name: 'news', params: { news: news.name } }"><div class="btn btn--small btn--bottomRight"><i class="fas fa-caret-right"></i></div></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'news'
        ]
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .news__item {
        position: relative;
        margin-top: 5rem;
        background-color: $color-offwhite;
        padding-bottom: 6rem;

        &__title {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        &__text {
            font-size: 1.4rem;
            padding: 2rem;
        }

        &__image {
            height: 20rem;
            background-size: cover;
            background-position: center;
        }
    }
</style>
