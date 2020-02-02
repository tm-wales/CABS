<template>
    <div class="footer__acc">
        <a class="acc__image" v-for="item in accreditations" :href="item.link" :key="item.name">
            <img :src="item.src" :alt="item.name">
        </a>
    </div>
</template>

<script>
    export default {
        computed: {
            accreditations () {
                return this.$store.getters.footer.accreditations
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .footer__acc {
        border-top: 1rem solid $color-offwhite;
        padding: 1.5rem;
        text-align: center;

        & .acc__image {
            display:inline-block;
            margin: 1rem 2rem;
            height: 7rem;
            width: auto;
            vertical-align: middle;

            & img {
                height: 100%;
            }

            @include media ('700') {
                height: 5rem;
            }
        }
    }
</style>
