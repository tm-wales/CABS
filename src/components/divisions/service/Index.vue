<template>
    <div class="page--service">
        <header>
            <div class="header__image--container">
                <div class="header__image" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0) 100%), url(' + `${getService.service.image}` + ')' }"></div>
            </div>
            <div class="header__overlay">
                <div class="header__gap"> Featured </div>
                <h1 class="primary"> {{ getService.service.name }} </h1>
                <h2 class="primary"> {{ getService.service.summary }}</h2>
            </div>
        </header>
        <section class="service">
            <div class="service__content" v-html="getService.service.content"></div>
        </section>
    </div>
</template>

<script>
    export default {
        computed: {
            getPage () {
                return this.$store.getters.page('Service')[0]
            },
            getService () {
                let division = this.$route.params.division
                let service = this.$route.params.service
                let dataDivision = this.$store.getters.division(division)[0]
                let dataService = dataDivision.services.filter(item => {
                    return item.name === service
                })[0]
                let data = {
                    division: dataDivision,
                    service: dataService
                }
                return data
            }
        },
        metaInfo () {
            return {
                title: this.getPage.pageTitle.replace('#Division#', this.$route.params.division).replace('#Service#', this.$route.params.service),
                meta: this.getPage.meta
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";
    @import "@/scss/router-transitions.scss";

    .page--service {
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

        & .service {
            background-color: $color-white;
            max-width:90rem;
            margin: 0 auto;
            padding: 5rem 10rem;
            margin-top: 1rem;

            @include media ('700') {
                padding: 3rem;
            }

            &__title {
                font-size: 1.6rem;
                color: $color-primary-light;
            }

            &__content {
                & > *:first-child {
                    margin-top: 0;
                }

                & p {
                    margin-top: 2rem;
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

                & ul {
                    margin-top: 2rem;
                    margin-left: 2rem;

                    & li {
                        position: relative;
                        padding-left: 2rem;

                        &::before {
                            position: absolute;
                            top: 0;
                            left: 0;
                            content: "\25C6";
                            color: $color-primary-dark; /* or whatever color you prefer */
                            font-size: inherit;
                        }
                    }
                }
            }
        }
    }
</style>
