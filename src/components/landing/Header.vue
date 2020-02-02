<template>
    <header class="header" :style="getPage.content.headerBackground">
        <div class="header__text">
            <h1 class="primary header__title"> {{ getPage.content.title }} </h1>
            <router-link :to="{ name: 'about' }">
                <h2 class="primary"> {{ getPage.content.subtitle }} </h2>
            </router-link>
        </div>
        <a href="#" v-scroll-to="'#next-section'" class="header__next"><span class="arrow--down"></span></a>
    </header>
</template>

<script>
    export default {
        computed: {
            getPage () {
                return this.$store.getters.page('Home')[0]
            }
        },
        metaInfo () {
            return {
                title: this.getPage.pageTitle,
                meta: this.getPage.meta
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .header {
        position: relative;
        height: 100vh;
        width: 100vw;
        background-repeat: no-repeat;
        background-size: cover;
        @include media('700') {
            font-size: 4rem!important;
        }

        &__text {
            position: absolute;
            top: 40%;
            left: 8rem;
            margin-right: 8rem;
            padding: 2rem;
            transform: translateY(-50%);
            color: $color-white;

            @include media ('1000') {
                left: 0;
                margin-right: 0;
            }
        }

        &__title {
            @include media('1550') {
                font-size: 7rem;
            }
            @include media('1400') {
                font-size: 6rem;
            }
            @include media('700') {
                font-size: 4rem!important;
            }
        }

        & h2.primary {
            cursor: pointer;
            &:hover:before {
                width: 2.5rem;
            }
        }
        &__next {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            width: 4rem;
            height: 4rem;
            z-index: 99;
            cursor: pointer;

            & .arrow--down {
                display: block;
                position: relative;
                height: 50%;
                width: 50%;
                margin: auto;
                margin-top: 50%;
                will-change: transform;
                animation: bounce 2s infinite;

                &:before,
                &:after {
                    position: absolute;
                    content: '';
                    top: 0;
                    height: 2px;
                    width: 50%;
                    background-color: $color-white;
                    transform-origin: 50% 100%;
                    z-index: 100;
                }

                &:before {
                    left: 0;
                    transform: skewY(23deg);
                }
                &:after {
                    right: 0;
                    transform: skewY(-23deg);
                }
            }
        }
    }
</style>
