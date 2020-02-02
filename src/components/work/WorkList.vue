<template>
    <div class="page--worklist">
        <header>
            <div class="header__image--container">
                <div class="header__image" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0) 100%), ' + geturl(getFeature.images.main.advert) }"></div>
            </div>
            <router-link class="header__overlay" :to="{ name: 'work', params: { work: getFeature.name } }">
                <h1 class="header__h1">Featured Work</h1>
                <div class="h1 primary"> {{ getFeature.name }} </div>
                <div class="h2 primary"> {{ getFeature.text.summary }}</div>
            </router-link>
        </header>

        <section class="filters">
            <div class="filters__list">
                <button type="button" class="filters__item" data-filter="all">
                    All
                </button>
                <button v-for="item in getDivisions" :key="item.name" type="button" class="filters__item" :data-filter="'.' + item.name.toLowerCase()">
                    {{ item.name }}
                </button>
            </div>
        </section>

        <section class="work">
            <router-link class="work__item mix" :class="item.divisions.toString().toLowerCase().replace(',',' ')" :to="{ name: 'work', params: { work: item.name } }" v-for="item in getWorks" :key="item.name">
                <div class="work__image--container">
                    <div class="work__image" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0) 100%), ' + geturl(item.images.main.advert) }"></div>
                </div>
                <div class="work__overlay">
                    <div class="work__title"> {{ item.name }} </div>
                    <div class="work__subtitle"> {{ item.text.summary }}</div>
                </div>
            </router-link>
        </section>
    </div>
</template>

<script>
    import mixitup from 'mixitup'

    export default {
        methods: {
            geturl (val) {
                return `url("${val}")`
            }
        },
        computed: {
            getPage () {
                return this.$store.getters.page('WorkItem')[0]
            },
            getFeature () {
                return this.$store.getters.featuredWork(1)[0]
            },
            getWorks () {
                return this.$store.getters.works
            },
            getDivisions () {
                return this.$store.getters.divisions
            }
        },
        mounted () {
            let containerEl = document.querySelector('.work')
            mixitup(containerEl)
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .page--worklist {
        background-color: $color-offwhite;

        & header {position: relative;}

        & .header {
            &__h1 {
                font-size: 1.6rem;
                font-weight: 400;
                text-align: left;
                margin-left: .5rem;
                color: $color-primary-light;

                @include media ('1000') {
                    text-align: center;
                    margin: 0;
                }
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

                &:hover {
                    & .h2.primary:before,.h2.primary:after {
                        width: 2.5rem;
                    }
                }

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

        & .filters {
            margin-top: 1rem;
            padding: 5rem 0;
            text-align: center;

            &__item {
                padding: 1rem 2rem;
                width: 15rem;
                margin: .5rem;
                margin-right: 2px;
                cursor: pointer;
                transition: .3s all;

                &:not(:first-child) {
                    margin: 0 .5rem;
                }

                &.mixitup-control-active {
                    background-color: $color-primary-light;
                    color: $color-white;
                }

                &:hover {
                    background-color: $color-primary;
                    color: $color-white;
                }
            }
        }

        & .work {
            overflow: hidden;

            &__item {
                position: relative;
                display: inline-block;
                width: calc(50% - 2rem);
                margin: 1rem;

                @include media ('700') {
                    width: 100%;
                }

                &:hover {
                    & .work__subtitle:before {
                        width: 2.5rem;
                    }
                }
            }

            &__image {
                &--container {
                    height: 40rem;
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
                padding: 2rem;
                transform: translateY(-50%);
                color: $color-white;
            }

            &__title {
                font-size: 4rem;
                font-weight: bold;
            }

            &__subtitle {
                font-size: 1.2rem;
                text-transform: uppercase;
                letter-spacing: 0.2rem;
                color: $color-white;
                display:inline-block;

                &:before {
                    content: '';
                    display:inline-block;
                    vertical-align: middle;
                    width: 1.5rem;
                    margin-right: .125rem;
                    border-bottom: 1px solid $color-white;
                    margin-left: .5rem;
                    transition: .3s width;
                }
            }
        }
    }
</style>
