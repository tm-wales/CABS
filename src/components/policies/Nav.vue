<template>
    <nav class="policies-nav">
        <ul class="policies-nav__links">
            <li v-for="item in getPolicies" :key="item.route" class="policies-nav__link">
                <router-link :to="{ name: 'policies', params: {policy: item.route} }"><div class="policies-nav__item">{{ item.name }}</div></router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    computed: {
        getPolicies() {
            let data = this.$store.getters.allPolicies;
            return data;
        }
    }
};
</script>

<style lang="scss">
@import "@/scss/vue-globals.scss";

.policies-nav {
    position: fixed;
    top: 8.3rem;
    left: 0;
    z-index: 999;
    width: 100%;
    font-size: 1.2rem;

    @include media("700") {
        font-size: 1rem;
    }

    text-transform: uppercase;
    transition: all 0.5s;
    text-align: center;
    background-color: $color-primary;

    &__link {
        display: inline-block;
        color: $color-white;
        transition: 0.3s all;
        &:hover {
            background-color: rgba($color-white, 0.1);
        }

        & a {
            & .policies-nav__item::after {
                display: block;
                height: 0.2rem;
                background-color: $color-white;
                content: " ";
                width: 0;
                margin: 0.2rem 0;
                transition: all 0.3s;
            }

            &:link,
            &:visited {
                color: $color-primary;
            }

            &.router-link-exact-active {
                & .policies-nav__item {
                    &::after {
                        width: 3rem;
                        background-color: $color-primary-light;
                    }
                }
            }
        }
    }

    &__item {
        color: $color-white;
        margin: 1rem 2rem;

        &:hover {
            &.policies-nav__item::after {
                width: 3rem;
            }
        }
    }
}
</style>
