<template>
    <div class="page--workitem">
        <header>
            <div class="header__image--container">
                <div class="header__image" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0) 100%), ' + geturl(getWork.images.main.advert) }"></div>
            </div>
            <div class="header__overlay">
                <div class="header__gap">Featured</div>
                <h1 class="primary"> {{ getWork.name }} </h1>
                <h2 class="primary"> {{ getWork.text.summary }}</h2>
            </div>
        </header>

        <section class="main">
            <ul class="main__keyfacts">
                <li class="main__keyfact" v-for="item in getWork.keyfacts" :key="item.title">
                    <div class="left">{{ item.title }}</div>
                    <div class="right">{{ item.value }}</div>
                </li>
            </ul>
            <div class="main__details">
                <ul class="main__divisions">
                    <li class="main__division">
                        <router-link class="main__division__link" v-for="division in getWork.divisions" :key="division" :to="{ name: 'division', params: { division: division } }"> {{ division }}</router-link>
                    </li>
                </ul>
                <div class="main__text" v-html="getWork.text.main" v-in-viewport.once="-200"></div>
            </div>
        </section>

        <section class="images">
            <div class="images__before-after">
                <div class="images__before" v-in-viewport.once="-200" :style="{ backgroundImage: geturl(getWork.images.main.before) }"></div>
                <div class="images__after" v-in-viewport.once="-200" :style="{ backgroundImage: geturl(getWork.images.main.after) }"></div>
            </div>

            <div class="images__other" :class="'exact--' + `${getWork.images.other.length - 1}`" v-if="getWork.images.other.length">
                <img class="images__other__item" v-in-viewport.once="-200" v-for="(item, index) in getWork.images.other" :src="item" :alt="'image other ' + `${index}`" :key="index">
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        computed: {
            getPage () {
                return this.$store.getters.page('WorkItem')[0]
            },
            getWork () {
                let work = this.$route.params.work
                let data = this.$store.getters.work(work)[0]
                return data
            }
        },
        methods: {
            geturl (val) {
                return `url("${val}")`
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .page--workitem {
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

        & .main {
            background-color: $color-offwhite;

            &__details {
                max-width: 90rem;
                margin: 5rem auto;
                background-color: $color-white;
                padding: 3rem;
                padding-bottom: 5rem;
                font-weight: 300;
            }

            &__keyfacts {
                border-radius: 1rem;
                display:grid;
                grid-gap: 3rem;
                grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
                max-width: 150rem;
                margin: 0 auto;
                margin-top: 5rem;
                padding: 1rem;
            }

            &__keyfact {
                font-size: 1.5rem;
                background-color: $color-primary-light;
                color: $color-white;
                width: 100%;
                padding: 3rem;
                text-align: center;
                border-radius: 1rem;

                & .left {
                    font-weight: bold;
                }

                & .right {
                    font-size: 2.5rem;
                    font-weight: 300;
                }
            }

            &__text {
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

            &__division {
                text-align: left;
                text-transform: uppercase;
                margin-top: 2rem;
                font-size: 2rem;
                margin-bottom: 1rem;

                &__link {
                    display:inline-block;
                    color: $color-primary-light;
                    padding-right: 1rem;

                    &:not(:first-child) {
                        padding-left: 1rem;
                        border-left: 1px solid $color-primary-light;
                    }

                    &:after {
                        display: block;
                        height: .2rem;
                        background-color: $color-primary-light;
                        content: " ";
                        width: 0;
                        margin: 0.2rem 0;
                        transition: all .3s;
                    }

                    &:hover {
                        &:after {
                            width: 3rem;
                        }
                    }
                }
            }
        }

        & .images {
            &__before-after {
                height: 60vh;
                display: grid;
                padding: 1rem;
                padding-top: 0;
                grid-template-columns: 1fr 1fr;
                grid-gap: 1rem;
                background-color: $color-offwhite;

                @include media ('1000') {
                    grid-template-columns: 1fr;
                }

                & > * {
                    height: 100%;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                    animation-duration: 1s;
                    animation-fill-mode: both;
                    opacity: 0;
                    visibility: hidden;

                    &.in-viewport {
                        animation-name: fadeInUp;

                        &.images__after {
                            animation-delay: .3s;
                        }
                    }
                }
            }

            &__other {
                display: inline-block;
                background-color: $color-offwhite;
                /* Prevent vertical gaps */
                column-count: 3;
                column-gap: 1rem;
                row-gap: 1rem;
                margin: 0 auto;
                overflow: hidden;
                padding: 1rem;

                @include media ('1000') {
                    column-count: 1;
                }

                &.exact {
                    &--1 {column-count: 1};
                    &--2 {column-count: 2};
                    &--3 {column-count: 2};
                    &--4 {column-count: 2};

                    @include media ('1000') {
                        &--2 {column-count: 1};
                        &--3 {column-count: 1};
                        &--4 {column-count: 1};
                    }
                }

                &__item {
                    /* Just in case there are inline attributes */
                    width: 100% !important;
                    height: auto !important;

                    animation-duration: 1s;
                    animation-fill-mode: both;
                    opacity: 0;
                    visibility: hidden;

                    &.in-viewport {
                        animation-name: fadeInUp;
                    }
                }
            }
        }

        & .statement {
            padding: 0 5rem;
            max-width: 70rem;
            margin: 0 auto;
            text-align: center;
            color: $color-text-dark;
            font-size: 2rem;
            font-weight: 300;
        }
    }

</style>
