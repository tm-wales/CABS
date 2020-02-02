<template>
    <div class="page--division">
        <header class="division__header" :style="getDivision.background">
            <div class="division__header__text">
                <h1 class="primary"> {{ getDivision.name }} </h1>
                <h2 class="primary" v-html="getDivision.summary"></h2>
            </div>
            <a href="#" v-scroll-to="{ el:'#next-section', offset:-100 }" class="division__header__next"><span class="arrow--down"></span></a>
        </header>

        <section id="next-section" class="division__details" v-in-viewport.once="-200">
            <div class="division__details__grid">
                <div class="division__details__mainText box box--left" v-html="getDivision.mainText"></div>
                <div class="division__details__features box box--right">
                    <ul class="division__details__features__list">
                        <div class="division__details__features__text">
                            {{ getDivision.features.title }}
                        </div>
                        <li class="division__details__features__item" v-for="(item,index) in getDivision.features.list" :key="index">
                            <img class="division__details__feature__image" :src="item.icon">
                            <span class="division__details__feature__text"> {{ item.text }} </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="division__services" v-in-viewport.once="-200">
            <div class="division__services__container">
                <div class="division__service" v-in-viewport.once="-200" v-for="(item, index) in getDivision.services" :key="item.name" :class="index % 2 == 0 ? 'left' : 'right'" >
                    <div class="division__service__overlay"></div>
                    <div class="division__service__box" :style="{ backgroundImage: 'url(' + `${item.image}` + ')' }">
                    </div>
                    <div class="division__service__textbox">
                        <h2 class="division__service__name"> {{ item.name }} </h2>
                        <div class="division__service__summary" v-html="item.summary"></div>

                        <router-link v-show="item.content !==''" :to="{ name: 'service', params: { division: getDivision.name, service: item.name } }"><div class="division__service__link btn btn--small">Learn more</div></router-link>
                    </div>
                </div>
            </div>
        </section>

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
                return this.$store.getters.page('Division')[0]
            },
            getDivision () {
                let division = this.$route.params.division
                let data = this.$store.getters.division(division)[0]
                return data
            }
        },
        metaInfo () {
            return {
                title: this.getPage.pageTitle.replace('#Division#', this.$route.params.division),
                meta: this.getPage.meta
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";
    @import "@/scss/router-transitions.scss";

    .page--division {
        background-color: white;
        min-height: 100vh;

        & .division {
            &__header {
                position: relative;
                height: calc(100vh - 10rem);
                background-size: cover;
                background-position: center center;

                &__text {
                    position: absolute;
                    top: 40%;
                    left: 8rem;
                    margin-right: 8rem;
                    padding: 2rem;
                    transform: translateY(-50%);
                    color: $color-white;
                    margin-right: 8rem;

                    @include media ('1000') {
                        left: 0;
                        margin-right: 0;
                        padding: 0;
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

            &__details {
                position: relative;
                font-weight: 300;
                background-color: $color-offwhite;
                padding-top: 1rem;

                & .box {
                    opacity: 0;
                    visibility: hidden;
                    animation-duration: 1s;
                    animation-fill-mode: both;
                }

                &.in-viewport {
                    & .box {
                        &--left { animation-name: fadeInLeft }
                        &--right { animation-name: fadeInRight; }
                    }
                }

                &__container {
                    background-color: $color-offwhite;
                    padding-top: 1rem;
                }

                &__grid {
                    padding: 10rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 10rem;
                    max-width: 150rem;
                    background-color: $color-white;
                    margin: 0 auto;

                    @include media ('1200') {
                        padding: 10rem 5rem;
                    }

                    @include media ('1000') {
                        grid-template-columns: 1fr;

                        & .box--left,.box--right {width: 30rem; justify-self: center!important;}
                    }
                }

                &__mainText {
                    width: 30rem;
                    justify-self: right;
                    align-self: center;
                }

                &__features {
                    justify-self: left;
                    align-self: center;

                    &__item {
                        margin-bottom: 2rem;
                    }

                    &__text {
                        font-weight: bold;
                        margin-bottom: 2rem;
                        font-size: 2rem;
                    }
                }

                &__feature {
                    &__image {
                        height: 2rem;
                        width: auto;
                        vertical-align: middle;
                        margin-right: 2rem;
                    }

                    &__text {
                        color: $color-primary-light;
                        font-weight: bold;
                    }
                }

                &__title {
                    margin-bottom: 2rem;
                    font-size: 4.5rem;
                    letter-spacing: 0.1rem;
                    color: $color-primary-light;
                }

                & p:not(:last-child) {
                    margin-bottom: 2rem;
                }

                & h3 {
                    margin-top: 3rem;
                }
            }

            &__services {
                position: relative;
                overflow: hidden;
                background-color: $color-offwhite;

                &.in-viewport {
                    &:before {
                        transform: translateY(0);
                    }
                }

                &:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: calc(50% - .5rem);
                    width: 1rem;
                    height: 100%;
                    background: $color-white;
                    transform: translateY(-100%);
                    transition: transform 1s;

                    @include media ('1300') {
                        left: 5rem;
                    }
                    @include media ('1300') {
                        left: 0;
                    }
                }

                &__container {
                    max-width: 150rem;
                    margin: 0 auto;
                }
            }

            &__service {
                position: relative;
                width: calc(50% - 10rem);
                margin: 5rem 0;

                @include media ('1300') {
                    margin-left: 10rem!important;
                    margin-right: 10rem!important;
                    width: calc(100% - 20rem)!important;
                }

                @include media ('700') {
                    margin-left: 5rem!important;
                    margin-right: 5rem!important;
                    width: calc(100% - 10rem)!important;

                    height: 40rem;
                }

                &:not(:first-child) {
                    margin-top: -20rem;

                    @include media ('1300') {
                        margin-top: 10rem;
                    }
                }

                &.in-viewport {
                    & .division__service__overlay {
                        width: 0;
                    }

                    &:before {
                        opacity: 1;
                    }
                }

                &:before {
                    content: "";
                    position: absolute;
                    height: 1rem;
                    width: 5rem;
                    background: $color-white;
                    top: calc(50% - .15rem);
                    opacity: 0;
                }

                &.right {
                    margin-left: calc(50% + 5rem);
                    margin-right: 5rem;

                    &:before {
                        left: -5rem;
                    }

                    & .division__service__overlay {
                        right : 0;
                    }
                }

                &.left {
                    margin-left: 5rem;

                    &:before {
                        right: -5rem;
                        @include media ('1300') {
                            right: auto;
                             left: -5rem;
                        }
                    }

                    & .division__service__overlay {
                        left : 0;
                        @include media ('1300') {
                            left: auto!important;
                            right: 0!important;
                        }
                    }
                }

                &__box {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center center;
                    height: 40rem;
                }

                &__textbox {
                    background-color: $color-black;
                    width: 100%;
                    padding: 1rem 2rem;
                    color: $color-white;
                    font-size: 1.6rem;
                    padding-bottom: 4rem;
                }

                &__name {
                    font-size: 2rem;
                    @include media ('500') {
                        font-size: 1.6rem;
                    }
                }

                &__summary {
                    color: $color-primary-light;

                    @include media ('500') {
                        display: none;
                    }
                }

                &__overlay {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    background-color: $color-offwhite;
                    z-index: 1;
                    transition: 1s width;
                }

                &__link {
                    float: right;
                }
            }
        }
    }
</style>
