<template>
    <nav class="divisions-nav">
        <ul class="divisions-nav__links">
            <li v-for="item in nav.items" :key="item.name" class="divisions-nav__link">
                <router-link :to="{ name: item.to.name, params: item.to.params }"><div class="divisions-nav__item">{{ item.name }}</div></router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    /* eslint-disable */
    data() {
        return {
            nav: {
                items: [
                    {
                        name: "Repairs",
                        to: {
                            name: "division",
                            params: { division: "Repairs" }
                        }
                    },
                    {
                        name: "Industrial",
                        to: {
                            name: "division",
                            params: { division: "Industrial" }
                        }
                    },
                    {
                        name: "Refurbishment",
                        to: {
                            name: "division",
                            params: { division: "Refurbishment" }
                        }
                    }
                ]
            }
        };
    }
};
</script>


<style lang="scss">
@import "@/scss/vue-globals.scss";

.divisions-nav {
    position: fixed;
    top: 8.3rem;
    left: 0;
    z-index: 999;
    width: 100%;
    font-size: 1.2rem;
    text-transform: uppercase;
    transition: all 0.5s;
    text-align: center;
    // height: 4rem
    background-color: $color-primary;

    &__links {
    }

    &__link {
        display: inline-block;
        color: $color-white;
        transition: 0.3s all;
        &:hover {
            background-color: rgba($color-white, 0.1);
        }

        & a {
            & .divisions-nav__item::after {
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
                & .divisions-nav__item {
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
            &.divisions-nav__item::after {
                width: 3rem;
            }
        }
    }
}
</style>
