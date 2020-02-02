<template>
    <section class="section--quote" v-in-viewport.once="-200">
        <div class="box box--left">
            <h3 class="quote__title">{{ quoteContent.left.title }}</h3>
            <div class="quote__text" v-html="quoteContent.left.text"></div>
        </div>
        <div class="box box--right">
            <div class="quote">
                <h3 class="quote__title">{{ quoteContent.right.title }}</h3>
                <div class="quote__text" v-html="quoteContent.right.text"></div>
                <router-link :to="{ name: 'contact-us' }"><div class="btn">Request Quote</div></router-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        computed: {
            quoteContent () {
                return this.$store.getters.page('Home')[0].content.quoteContent
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .section--quote {
        padding: 10rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10rem;

        @include media ('1000') {
            grid-template-columns: 1fr;
            grid-gap: 5rem;
            padding: 5rem;

            & .box--left,.box--right {justify-self: center!important;}
        }

        &.in-viewport {
            & .box {
                &--left { animation-name: fadeInLeft }
                &--right { animation-name: fadeInRight; }
            }
        }

        & .box {
            width: 30rem;
            opacity: 0;
            visibility: hidden;
            animation-duration: 1s;
            animation-fill-mode: both;

            &--left {
                justify-self: right;
            }

            &--right {
                justify-self: left;
                align-self: center;
                animation-delay: .3s;
            }
        }

        & .quote {
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
    }
</style>
