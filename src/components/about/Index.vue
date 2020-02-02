<template>
    <div class="page__about">
        <header>
            <h1 class="secondary">{{ getPage.content.title.main }}</h1>
            <h2 class="secondary"> {{ getPage.content.title.sub }}</h2>
            <div class="header-image--container">
                <div class="header-image" :style="getPage.content.headerBackground"></div>
            </div>
        </header>

        <section class="about__text-blocks">
            <div class="about__text-block" v-in-viewport.once="-200" v-for="item in getPage.content.textBlocks" :key="item.title">
                <div class="box box--left">
                    <h2 class="about__text-block__title"> {{ item.title }} </h2>
                    <div class="about__text-block__text" v-html="item.text"></div>
                </div>
                <div class="box box--right">
                    <img class="about__text-block__image" :src="item.imagePath">
                </div>
            </div>
        </section>

        <section class="about__timeline">
            <div class="about__timeline__container">
                <div class="about__timeline__item" v-in-viewport.once="-200" v-for="(item, index) in getPage.content.timeline" :key="index">
                    <div class="about__timeline__item__header">
                        <div class="about__timeline__item__date"> {{ item.dateText }} </div>
                        <h2 class="about__timeline__item__title" v-html="item.title"></h2>
                    </div>
                    <div class="about__timeline__item__description" v-html="item.dateDescription">
                    </div>
                </div>
            </div>
        </section>

        <!-- <section class="about__people">
            <div class="about__people__container">
                <h2 class="about__people__header">Meet our team</h2>
                <div class="about__people__grid">
                    <div class="about__people__item" v-for="item in getPage.content.people" :key="item.name">
                        <img class="about__people__image" :src="item.imagePath">
                        <div class="about__people__textbox">
                            <div class="about__people__name"> {{ item.name }} </div>
                            <div class="about__people__position"> {{ item.position }} </div>
                            <div class="about__people__division"> {{ item.division }} </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <section  class="closing">
            <div class="closing__title">{{ getPage.content.closing.main }}</div>
            <div class="closing__statement"> {{ getPage.content.closing.sub }}</div>
        </section>
    </div>
</template>

<script>
    export default {
        computed: {
            getPage () {
                return this.$store.getters.page('About')[0]
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

    .page__about {
        background-color: $color-white;
        padding-top: 10rem;
    }

    h1 {
        color: $color-title-h1
    }

    .header-image {
        &--container {
            height: 60vh;
            margin-top: 4rem;
            background-color: $color-offwhite;
            padding: 1rem;
        }

        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }

    .about {
        &__text-blocks {
            background-color: $color-offwhite;
        }

        &__text-block {
            margin: 0 auto;
            max-width: 150rem;
            background-color: $color-white;
            padding: 10rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10rem;

            @include media ('1200') {
                padding: 10rem 5rem;
            }

            @include media ('1000') {
                grid-template-columns: 1fr;

                & .box--left,.box--right {width: 30rem; justify-self: center!important;}
            }

            &:not(:last-child) {
                margin-bottom: 1rem;
            }

            &.in-viewport {
                & .box {
                    &--left { animation-name: fadeInLeft }
                    &--right { animation-name: fadeInRight; }
                }
            }

            & .box {
                opacity: 0;
                visibility: hidden;
                animation-duration: 1s;
                animation-fill-mode: both;

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

                &--left {
                    justify-self: right;
                    width: 30rem;
                }

                &--right {
                    justify-self: left;
                    align-self: center;
                    animation-delay: .3s;

                    & img {
                        width: 100%;
                    }
                }
            }

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

        &__timeline {
            background-color: $color-offwhite;

            &__container {
                position: relative;
                margin: 0 auto;
                max-width: 120rem;
                padding: 5rem;
                padding-bottom: 10rem;

                &:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 5rem;
                    width: .3rem;
                    height: 100%;
                    background: $color-primary-light;
                }
            }

            &__item {
                &.in-viewport {
                    animation-name: fadeInUp;
                }

                margin: 5rem 0;
                opacity: 0;
                visibility: hidden;
                animation-duration: 1s;
                animation-fill-mode: both;

                &__header {
                    margin-left: 3rem;
                    position: relative;
                    font-weight: 700;

                    &:hover {
                        &:before { background-color: $color-primary-light; }
                    }

                    &:before {
                        content: "";
                        position: absolute;
                        left: -3.85rem;
                        bottom: 1.5rem;
                        width: 2rem;
                        height: 2rem;
                        background-color: $color-white;
                        border: .3rem solid $color-primary-light;
                        transition: .5s all;
                    }
                }

                &__date {
                    position: relative;
                    font-size: 12rem;
                    letter-spacing: 3px;
                    text-align: left;
                    color: rgba($color-primary-light,.3);
                }

                &__title {
                    margin-top: -8rem;
                    text-transform: uppercase;
                    font-size: 3rem;
                }

                &__description {
                    font-size: 1.6rem;
                    border-left: 2px solid $color-primary;
                    margin-left: 3rem;
                    padding-left: 2rem;
                }
            }
        }

        &__people {
            background-color: $color-offwhite;
            padding-bottom: 1rem;

            &__header {
                font-size: 2.5rem;
                letter-spacing: 0.1rem;
                margin-bottom: 5rem;
            }

            &__grid {
                display: grid;
                grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
                justify-items: center;
                grid-gap: 5rem;
            }

            &__container {
                margin: 0 auto;

                max-width: 150rem;
                background-color: $color-white;
                padding: 10rem;

                @include media ('900') {
                    padding: 10rem 5rem;
                }
            }

            &__textbox {
                background-color: $color-offwhite;
                padding: 1rem;
                margin-top: -1rem;
            }

            &__name {
                font-weight: bold;
                color: $color-primary;
                margin-bottom: .5rem;
            }

            &__image {
                height: 30rem;
                width: auto;
            }

            &__position,
            &__division {
                font-size: 1.5rem;
                padding-left: 2rem;
                border-left: 2px solid $color-primary;
            }
        }
    }

</style>
