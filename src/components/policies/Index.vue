<template>
    <section class="page--policies">
        <app-pol-nav></app-pol-nav>

        <section class="policy">
            <h1 class="policy__title"> {{ getPolicy.title }} </h1>
            <div class="policy__content" v-html="getPolicy.html"></div>
        </section>
    </section>
</template>

<script>
import nav from './Nav.vue';

export default {
    components: {
        'app-pol-nav': nav
    },
    computed: {
        getPage() {
            return this.$store.getters.page('Policies')[0];
        },
        getPolicy() {
            let policy = this.$route.params.policy;
            let data = this.$store.getters.policy(policy)[0];
            return data;
        }
    },
    metaInfo() {
        return {
            title: this.getPage.pageTitle,
            meta: this.getPage.meta
        };
    }
};
</script>

<style lang="scss">
@import '@/scss/vue-globals.scss';

.page--policies {
    background-color: $color-white;
    padding-top: 10rem;

    h1 {
        color: $color-title-h1;
    }

    .policy {
        max-width: 140rem;
        margin: 0 auto;
        padding: 5rem;

        @include media('700') {
            padding: 2rem;
        }

        &__title {
            font-size: 3rem;
            color: $color-primary-light;
            text-align: center;
        }

        &__content {
            padding: 2rem;
            font-size: 1.4rem;

            & h1 {
                margin-top: 2.5rem;
                margin-left: 0;
                font-size: 1.6rem;
                color: $color-black !important;
                font-weight: bold;
                letter-spacing: 0.5rem;
                text-shadow: none;
            }

            & h2 {
                margin-top: 3rem;
                margin-left: 0;
                font-size: 1.8rem;
                color: $color-black !important;
                font-weight: bold;
                text-shadow: none;
            }

            & ul {
                margin: 1rem 0;
            }
            & p {
                margin: 1rem 0;
            }

            & li {
                list-style-type: circle;
                margin-left: 4rem;
            }

            & img {
                width: 100%;
                height: auto;
            }

            & a {
                color: $color-primary;
                transition: color 0.3s;
                &:hover {
                    font-weight: bold;
                }
                &:visited {
                    color: $color-primary-dark;
                }
            }
        }
    }
}

.statement {
    padding: 0 5rem;
    max-width: 70rem;
    margin: 0 auto;
    text-align: center;
    color: $color-text-dark;
    font-size: 2rem;
    font-weight: 300;
}
</style>
