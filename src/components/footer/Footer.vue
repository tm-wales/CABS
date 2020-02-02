<template>
    <div class="footer__end">
        <div class="footer__container">
            <div class="footer__grid">
                <router-link :to="{ name: 'contact-us' }"><div class="footer__header">Contact Us</div></router-link>
                <div class="footer__text">To discuss your needs, contact a member of our team now.</div>
                <div class="footer__times">Monday to Friday, 8:00am - 5:00pm</div>

                <div class="footer__phone">
                    <a class="footer__link" href="tel:+441792792800">
                        <i class="ion-ios-telephone"></i>
                        01792 792 800
                    </a>
                </div>

                <a class="footer__email footer__link" href="mailto:info@candbs.co.uk">
                    <i class="ion-ios-email"></i>
                    info@candbs.co.uk
                </a>
                <div class="footer__address">
                    <a target="_blank" class="footer__link" href="https://goo.gl/maps/qRX25tcATYR2">
                        Coatings and Blasting Services Ltd,<br>
                        Unit 4 Ash Court,<br>
                        Viking Way,<br>
                        Winch Wen Industrial Estate,<br>
                        Swansea,<br>
                        SA1 7DA
                    </a>
                </div>

                <ul class="footer__social">
                    <li><a target="_blank" href="https://twitter.com/CabsMob" class="footer__link"><i class="fab fa-twitter"></i></a></li>
                    <li><a target="_blank" href="https://www.facebook.com/Coatings-and-Blasting-Services-Ltd-255335497980125/" class="footer__link"><i class="fab fa-facebook-f"></i></a></li>
                    <li><a target="_blank" href="https://www.linkedin.com/company/coatings-and-blasting-services-ltd" class="footer__link"><i class="fab fa-linkedin-in"></i></a></li>
                </ul>

                <div class="footer__navigation">
                    <ul class="footer__list">
                        <li v-for="item in getPolicies" :key="item.route" class="footer__item">
                            <router-link class="footer__link" :to="{ name: 'policies', params: {policy: item.route} }"><div>{{ item.name }}</div></router-link>
                        </li>
                    </ul>
                </div>
                <p class="footer__copyright">
                    Copyright &copy; by <a target="_blank" href="https://www.candbs.co.uk" class="footer__link">Coating and Blasting Services Limited</a> 2018. Website by <a target="_blank" href="https://www.techmeleon.co.uk" class="footer__link">Techmeleon</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            getPolicies () {
                let data = this.$store.getters.allPolicies
                return data
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .footer__end {
        background-color: $color-black;
        position: relative;
        display: grid;
        color: $color-grey-light;
        font-size: 1.3rem;
        font-weight: 300;
        text-align: center;
        overflow: hidden;
        text-align: left;
    }

    .footer {
        &__container {
            padding: 5rem;
            margin: 0 auto;
            width: 100%;
            max-width: 100rem;
        }

        &__grid {
            color: $color-white;
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: start;
            height: 100%;
            grid-gap: 1.5rem;
            align-items: center;
            grid-template-areas: "header header"
                                 "text text"
                                 "address time"
                                 "address phone"
                                 "address email"
                                 "social social"
                                 "nav copy";

            @include media('700') {
                grid-template-columns: 1fr;

                grid-template-areas: "header"
                                     "text"
                                     "time"
                                     "phone"
                                     "email"
                                     "address"
                                     "social"
                                     "nav"
                                     "copy";
            }

            @include media('700') {
                text-align: center;
            }
        }

        &__header {
            grid-area: header;
            color: $color-white;
            font-size: 2rem;
            font-weight: bold;
            text-transform: uppercase;
        }

        &__text {
            grid-area: text;
        }

        &__times {
            grid-area: time;
        }

        &__address {
            grid-area: address;
        }

        &__phone {
            grid-area: phone;
        }

        &__email {
            grid-area: email;
        }

        &__social {
            grid-area: social;

            li {
                display: inline-block;
                font-size: 2.5rem;
                margin-right: 1rem;
            }
        }

        &__navigation {
            grid-area: nav;
        }

        &__copyright {
            grid-area: copy;
            font-size:  1.4rem;
        }

        &__list {
            list-style: none;
        }

        &__item {
            display: inline-block;
            font-size:  1.4rem;
            text-align: center;

            & a {
                padding: 1rem;
            }

            &:not(:last-child)::after {
                content:'-';
            }
        }

        &__link {
            &:link,
            &:visited {
                display:inline-block;
                color: $color-white;
                text-decoration: none;
                transition: all .3s;
            }

            &:hover,
            &:active {
                color: $color-primary-light;
            }
        }
    }
</style>
