<template>
    <nav id="nav" class="nav" :class="{ fixed: nav.fixed }">
        <div class="nav__container">
            <div class="nav__logo">
                <router-link :to="{ name: 'home' }">
                    <img class="normal" v-if="nav.fixed" :src="nav.logo[0].path" :alt="nav.logo[0].alt">
                    <img class="white" v-else :src="nav.logo[1].path" :alt="nav.logo[1].alt">
                </router-link>
            </div>
            <div class="nav__icon" @click="nav.open = !nav.open" :class="{ open: nav.open }">
                <div class="nav__icon__lines">
                </div>
            </div>
            <ul class="nav__links" :class="{ open: nav.open }">
                <li v-for="item in nav.items" :key="item.name" class="nav__link">
                    <router-link :to="{ name: item.to.name }"><div class="nav__item">{{ item.name }}<i v-if="item.children" class="fas fa-angle-right"></i></div></router-link>
                    <ul class="nav__links" v-if="item.children">
                        <li v-for="subItem in item.children" :key="subItem.name" class="nav__link">
                            <router-link :to="{ name: subItem.to.name, params: subItem.to.params }"><div class="nav__item">{{ subItem.name }}</div></router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        /* eslint-disable */
        data() {
            return {
                nav: {
                    logo: [
                        { path: '/static/logo.png', alt: 'CABS Logo'},
                        { path: '/static/logo_white.png', alt: 'CABS Logo'}
                    ],
                    fixed: false,
                    open: false,
                    items: [
                        { name: 'Home', to: { name: 'home' } },
                        { name: 'About Us', to: { name: 'about' } },
                        { name: 'Divisions', to: { name: 'divisions' },
                        // children: [
                        //     { name: 'Repairs', to: { name: 'division', params: { division:'Repairs' } } },
                        //     { name: 'Industrial', to: { name: 'division', params: { division:'Industrial' } } },
                        //     { name: 'Refurbishment', to: { name: 'division', params: { division:'Refurbishment' } } },
                        // ]
                        },
                        { name: 'Our Work', to: { name: 'work-list' } },
                        { name: 'News', to: { name: 'news-list' } },
                        { name: 'Contact Us', to: { name: 'contact-us' } }
                    ]
                }
            }
        },
        methods: {
            handleScroll() {
                var doc = document.documentElement;
                var height = window.innerHeight;
                var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

                if (this.$route.name == 'home') {
                    this.nav.fixed = top > height;
                } else {
                    this.nav.fixed = true
                }
            }
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);
            this.handleScroll();
        },
        watch: {
            $route (to, from) {
                if (to.name !== 'home') {
                    this.nav.fixed = true
                } else {
                    this.nav.fixed = false
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .nav {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        font-size: 1.2rem;
        text-transform: uppercase;
        transition: all .5s;

        & a:linked,
        & a:visited {
            color: $color-white;
        }

        @include media ('1000') {
            .nav__icon {display:block}
            .nav__links {
                transform: translateX(100%);
                padding-top: 5rem;
                // background-color: $color-primary;
                margin-right: 0;
                position: absolute;
                right: 0;
                top: 0;

                & li.nav__link {
                    display: block;
                }
            }
        }

        &.fixed {
            position: fixed;
            background-color: rgba($color-white,1);
            border-bottom: 1px solid $color-offwhite;

            & .nav__icon__lines {
                &:before,&:after {background-color: $color-primary;}
            }

            & .nav__link {
                background-color: $color-white;

                &:hover {
                    // background-color: rgba($color-black,.1);
                    background-color: rgb(233, 233, 233)
                }

                & a {
                    &:link,&:visited { color: $color-primary; }
                    &.router-link-exact-active .nav__item::after { background-color: $color-primary; }
                }

                & ul a { color: $color-white!important; }
            }
        }

        &__container {
            position: relative;
            margin: 0 auto;
        }

        &__logo {
            position: relative;
            display:inline-block;
            padding-top: 1rem;
            margin-left: 3rem;

            & img {
                height: 6rem;
                width: auto;
            }
        }

        &__links {
            float: right;
            margin-right: 3rem;
            transition: .3s all;

            &.open {
                transform: translateX(0);
            }
        }

        &__item {
            padding: 3rem 2rem;
        }

        &__icon {
            z-index: 999;
            position: absolute;
            display: none;
            right: 3rem;
            top: 50%;
            transform:translateY(-50%);
            cursor: pointer;
            $height: 50px;
            $width: 50px;
            $menuHeight: $height * 0.4;

            height: $height;
            width: $width;

            &__lines {
                position: relative;
                display: inline-block;
                height: 100%;
                width: 100%;

                &::before,&::after {
                    content: '';
                    position: absolute;
                    transition: all .2s;
                    display: inline-block;
                    background-color: $color-white;
                    height: 2px;
                    width: 50%;
                    left: 25%;
                }

                &::before {
                    top: 0;
                    transform: translateY($menuHeight);
                }

                &::after {
                    width: 45%;
                    bottom: 0;
                    transform: translateY(-$menuHeight);
                }
            }

            &.open {
                & .nav__icon__lines {
                    &::before {
                        transform: translateY($menuHeight + 4px) rotate(-45deg)
                    }

                    &::after {
                        width: 50%;
                        transform: translateY(-($menuHeight + 4px)) rotate(45deg)
                    }
                }
            }
        }

        &__link {
            transition: .5s all;
            display: inline-block;

            & a {
                height: 6rem;
                &:link,&:visited {
                    color: $color-white;
                }

                & .nav__item::after {
                    display: block;
                    height: .2rem;
                    background-color: $color-primary-light;
                    content: " ";
                    width: 0;
                    margin: 0.2rem 0;
                    transition: all .3s;
                }

                &.router-link-exact-active {
                    & .nav__item {
                        &::after {
                            width: 3rem;
                            background-color: $color-white;
                        }
                    }
                }
            }

            & ul {
                max-height: 0;
                overflow: hidden;
                position: absolute;
                transition: all .5s;
                color: $color-white;
                background-color: $color-primary-dark;
            }

            & i {
                transition: all .5s;
                margin-left: 1rem;
            }

            &:hover {
                background-color: rgba($color-white,.1);

                & > a .nav__item::after {
                    width: 3rem;
                }

                & ul {
                    max-height: 20rem;
                    display: block;
                    box-shadow: 1px 1px 2px $color-shadow;
                }

                & i {
                    transform: rotateZ(90deg);
                }
            }
        }
    }
</style>