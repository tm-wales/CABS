<template>
    <div class="section--divisions" v-in-viewport.once="-200">
        <div class="division__item__wrap clearfix" v-for="(item,index) in divisions" :class="{on: item.active == 1, off: item.active == 2}" :key="item.name" @mouseenter="mouseEnter(index)" @mouseleave="mouseLeave(index)" @click="click(index)">
            <div class="division__item" :style="item.background">
                <div class="division__overlay"></div>
                <div class="division__details">
                    <img :src="item.icon.normal" class="division__details__icon">
                    <img :src="item.icon.inverse" class="division__details__icon division__details__icon--inverse">
                    <div class="division__details__textbox">
                        <h1 class="division__details__title"> {{ item.name }} </h1>
                        <h2 class="division__details__summary" v-html="item.summary"></h2>
                        <router-link class="division__details__link" :to="{ name: 'division', params: { division: item.name } }"><div class="btn">Learn more</div></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        /* eslint-disable */
        computed: {
            divisions() {
                return this.$store.getters.divisions
            }
        },
        methods: {
            mouseEnter(index) {
                this.select(index)
            },
            mouseLeave(index) {
                this.reset()
            },
            click(index) {
                let current = this.current()
                if (current == index) {
                    this.reset()
                } else {
                    this.select(index)
                }
            },
            select(index) {
                for (var i = 0; i < this.divisions.length; i++) {
                    if (i == index) {
                        this.divisions[i].active = 1
                    } else {
                        this.divisions[i].active = 2
                    }
                }
            },
            reset() {
                for (var i = 0; i < this.divisions.length; i++) {
                    this.divisions[i].active = 0
                }
            },
            current() {
                for (var i = 0; i < this.divisions.length; i++) {
                    if (this.divisions[i].active == 1) {
                        return i
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .section--divisions {
        height: calc(100vh - 11rem);
        background-color: $color-offwhite;
        padding: 1rem;
        overflow: hidden;
        will-change: transform;

        & .division__item {
            &__wrap {
                &:nth-child(2) {
                    & .division__item { animation-delay: .3s; }
                }
                &:nth-child(3) {
                    & .division__item { animation-delay: .6s; }
                }
            }
            animation-duration: 1s;
            animation-fill-mode: both;
            opacity: 0;
            visibility: hidden;
        }

        &.in-viewport {
            & .division__item {
                animation-name: fadeInUp;
            }
        }

        .division__overlay {
            position: absolute;
            height: 100%;
            width: 100%;
            background-color: $color-white;
            z-index: 1;
            transition: background-color .5s;
        }

        .division__item {
            position: relative;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            color: $color-black;
            width: 100%;
            height: 100%;
            overflow: hidden;

            &__wrap {
                height: 100%;
                float: left;
                max-width: 33.33%;
                width: 100%;
                transition: all .5s;
                overflow: hidden;
                color: $color-offwhite;

                &:not(:last-child) {
                    padding-right: 1rem;

                    @include media ('1000') {
                        padding-right: 0;
                        display: block;
                        float: none;
                    }
                }

                @include media ('1000') {
                    max-width: 100%;
                    max-height: 33.33%;
                }

                &.on {
                    max-width: 50%;

                    @include media ('1300') {
                        max-width: 100%;
                        padding-right: 0;
                    }

                    @include media ('1000') {
                        max-height: 50%;
                    }

                    & .division__item {
                        color: $color-white;
                    }

                    & .division__details__title {
                        color: $color-white;
                    }
                    & .division__details__icon {
                        display:none;

                        &--inverse {
                            display:inline-block;
                        }
                    }

                    & .division__overlay {
                        background-color: transparent;
                        z-index: 0;
                    }
                }

                &.off {
                    max-width: 25%;

                    @include media ('1300') {
                        max-width: 0;
                        padding-right: 0;
                    }

                    @include media ('1000') {
                        max-width: 100%;
                        max-height: 25%;
                    }
                }
            }
        }

        .division__details {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            padding: 4rem;
            z-index: 2;
            overflow: hidden;

            @include media ('1000') {
                padding: 0 4rem;
            }

            &__title {
                margin-top: 5rem;
                font-size: 5rem;
                font-weight: 400;
                color: $color-black;

                @include media ('1750') {
                    font-size: 4rem;
                }

                @include media ('1450') {
                    font-size: 3rem;
                    font-weight: bold;
                }

                @include media ('1000') {
                    margin-top: 0;
                    margin-bottom: 1rem;
                }

                @include media ('500') {
                    font-size: 2rem;
                }
            }

            &__textbox {
                vertical-align: middle;
                @include media ('1000') {
                    display: inline-block;
                    margin-left: 3rem;
                }
            }

            &__summary {
                margin-top: 3rem;
                max-width: 20rem;
                font-weight: 300;
                font-size: 1.8rem;

                @include media ('1000') {
                    display:none;
                }
            }

            &__icon {
                height: 20rem;
                width: 20rem;
                display:inline-block;
                vertical-align: middle;

                &--inverse {
                    display:none;
                }

                @include media ('1000') {
                    height: 15rem;
                    width: 15rem;
                }


                @include media ('500') {
                    height: 10rem;
                    width: 10rem;
                }
            }

            &__link {
                @include media ('1000') {
                    font-size: 1.4rem;
                    & div.btn {
                        margin-top: 0!important;
                    }
                }

                @include media ('500') {
                    & div.btn {
                        padding: .5rem;
                    }
                }
            }
        }
    }
</style>
