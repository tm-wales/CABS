<template>
    <div class="page__contactus">
        <header>
            <h1 class="secondary">{{ getPage.content.title.main }}</h1>
            <h2 class="secondary"> {{ getPage.content.title.sub }}</h2>
        </header>

        <section class="contact clearfix">
            <div class="contact__split contact__sub" :class="{done: formSent}">
                <div class="contact__sub__form">
                    <h2 class="contact__sub__header">Let's Talk</h2>

                    <form @submit.prevent="formSubmit" class="contact__form" id="contact-form">
                        <div class="contact__form__group">
                            <input type="text" class="contact__form__input" name="name" id="name" placeholder="Name*" v-model="form.name" required>
                            <label for="name" class="contact__form__label">Name*</label>
                        </div>
                        <div class="contact__form__group">
                            <input type="email" class="contact__form__input" name="email" id="email" placeholder="Email*" v-model="form.email" required>
                            <label for="email" class="contact__form__label">Email*</label>
                        </div>
                        <div class="contact__form__group">
                            <input type="text" class="contact__form__input" name="company" id="company" placeholder="Company" v-model="form.company">
                            <label for="company" class="contact__form__label">Company</label>
                        </div>
                        <div class="contact__form__group">
                            <input type="tel" class="contact__form__input" name="phone" id="phone" placeholder="Contact Number" v-model="form.phone">
                            <label for="phone" class="contact__form__label">Contact Number</label>
                        </div>
                        <div class="contact__form__group contact__form__group--last">
                            <textarea name="message" class="contact__form__input" id="message" v-model="form.message">Hello, I am interested in learning more</textarea>
                            <label for="message" class="contact__form__label contact__form__label--textarea">Message</label>
                        </div>
                        <button class="contact__form__submit" :class="{inprogress: inprogress}"><span class="contact__form__submit__text">Submit</span><span class="contact__form__submit__icon"></span></button>
                    </form>
                </div>

                <div class="contact__sub__confirmation">
                    Thank you for you're enquiry. <br>
                    We will contact you soon!
                </div>
            </div>
            <div class="contact__split contact__details">
                <h2 class="contact__sub__header">Come Direct</h2>

                <a class="contact__details__phone" href="tel:+441792792800">
                    <i class="fas fa-mobile-alt"></i>
                    <p>01792 792 800</p>
                </a>
                <a class="contact__details__email" href="mailto:info@candbs.co.uk">
                    <i class="fas fa-envelope"></i>
                    <p>info@candbs.co.uk</p>
                </a>
                <h2 class="contact__sub__header">or be Social</h2>
                <ul class="contact__details__social">
                    <li><a target="_blank" href="https://twitter.com/CabsMob" class="contact__details__social__item"><i class="fab fa-twitter"></i></a></li>
                    <li><a target="_blank" href="https://www.facebook.com/Coatings-and-Blasting-Services-Ltd-255335497980125/" class="contact__details__social__item"><i class="fab fa-facebook-f"></i></a></li>
                    <li><a target="_blank" href="https://www.linkedin.com/company/coatings-and-blasting-services-ltd" class="contact__details__social__item"><i class="fab fa-linkedin-in"></i></a></li>
                </ul>
            </div>
        </section>
        <section class="map">
            <div class="map__container" v-html="getPage.content.mapFrame"></div>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formSent: false,
                inprogress: false,
                form: {
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    message: 'I want to make my building beautiful.'
                }
            }
        },
        methods: {
            formSubmit () {
                if (!this.inprogress) {
                    const _this = this
                    const url = '/contact-us'
                    this.inprogress = true
                    this.$http.post(url, {data: this.form}, {emulateJSON: true}).then(response => {
                        _this.formSent = response.body.success
                        if (!_this.formSent) {
                            alert('Submission failed. Please contact CABS directly')
                        }
                        _this.inprogress = false
                    }, err => {
                        _this.inprogress = false
                        console.log(err)
                    })
                }
            }
        },
        computed: {
            getPage () {
                return this.$store.getters.page('ContactUs')[0]
            }
        },
        metaInfo () {
            return {
                title: this.getPage.pageTitle,
                meta: this.getPage.meta
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .page__contactus {
        background-color: $color-white;
        padding-top: 10rem;
    }

    h1 {
        color: $color-title-h1
    }

    .contact {
        background-color: $color-offwhite;
        padding: 1rem;
        margin-top: 5rem;
        height: 70rem;

        &__sub {
            position: relative;

            &.done {
                & .contact__sub__confirmation {
                    opacity: 1;
                    visibility: visible;
                }

                & .contact__sub__form {
                    opacity: 0;
                    visibility: hidden;
                }
            }

            &__header {
                text-align: center;
            }

            &__form {
                opacity: 1;
                visibility: visible;
                transition: .5s opacity;
                padding: 5rem;
                padding-bottom: 10rem;

                & .contact__sub__header {
                    color: $color-white;
                }
            }

            &__confirmation {
                z-index: 100;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                visibility: hidden;
                transition: .5s opacity;
                background-color: $color-white;
                color: $color-primary;
                text-align: center;
                font-weight: 400;
                font-size: 2.5rem;
                padding-top: 10rem;
            }
        }

        &__split {
            background-color: $color-white;
            width: calc(50% - .5rem);
            height: 100%;

            @include media ('1000') {
                width: 100%;
            }
        }

        &__sub {
            float: left;
            background-color: $color-primary-light;
        }

        &__details {
            float: right;
            text-align: center;

            & > * {
                display:block;
                margin-top: 5rem;
                color: $color-primary-light;
                transition: .5s color;
            }

            & a:hover {
                color: $color-primary-dark;
            }

            & i {
                font-size: 5rem;
            }

            &__social {
                text-align: center;

                & li {
                    display:inline-block;
                    margin: 0 2rem;
                };

                &__item {
                    &:link,
                    &:visited {
                        font-size: 2rem;
                        display:inline-block;
                        color: $color-primary-light;
                        text-decoration: none;
                        transition: all .3s;
                    }

                    &:hover,
                    &:active {
                        color: $color-primary-light;
                    }
                }
            }
        }

        &__form {
            margin-top: 5rem;

            &__group {
                position: relative;
                margin-bottom: 3rem;
            }

            &__input {
                font-family: inherit;
                color: inherit;
                font-size: 1.5rem;
                padding: 1rem 1.5rem;
                padding-top: 2rem;
                border-radius: 2px;
                background-color: rgba($color-white, .9);
                border: none;
                border-bottom: 3px solid transparent;
                width: 100%;
                display:block;
                transition: all .3s;

                &:focus {
                    outline: none;
                    box-shadow: 0 1rem 2rem rgba($color-black, .1);
                    border-bottom: 3px solid $color-secondary;

                    &:invalid {
                        border-bottom: 3px solid yellow;
                    }
                }

                &::-webkit-input-placeholder {
                    color: $color-grey-dark;
                }
            }

            &__input:placeholder-shown + &__label:not(&__label--textarea)  {
                opacity: 0;
                visibility: hidden;
                padding: 1rem 1.5rem;
                padding-top: 2rem;
            }

            &__label {
                position: absolute;
                left: 0;
                top: 0;
                font-size: 1.2rem;
                font-weight: 700;
                display: block;
                color: rgba($color-black,.6);
                transition: all .3s;
                z-index: 1000;
                padding-left: 1.5rem;
                padding-top: .1rem;
            }

            &__submit {
                position: relative;
                float: right;
                cursor: pointer;
                font-size: 1.6rem;
                font-weight: 400;
                text-decoration: none;
                padding: 1rem 3rem;
                border-radius: .5rem;
                transition: all 0.2s;
                color: $color-grey-dark;
                border: 1px solid rgba($color-grey-dark, .5);
                text-align: center;

                &:hover {
                    color: $color-white;
                    background-color: $color-primary-dark;
                }

                &__icon {
                    display:none;
                }
                &.inprogress {
                    .contact__form__submit__icon {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        display: inline-block;
                        width: 3rem;
                        height: 3rem;
                        color: $color-grey-dark;
                        background-color: $color-grey-dark;

                        &::after {
                            content: " ";
                            display: block;
                            width: 70%;
                            height: 70%;
                            margin: 1px;
                            border-radius: 50%;
                            border: 5px solid #fff;
                            border-color: #fff transparent #fff transparent;
                            animation: rings 1.2s linear infinite;
                        }

                        @keyframes rings {
                            0% {
                                transform: rotate(0deg);
                            }
                            100% {
                                transform: rotate(360deg);
                            }
                        }
                    }

                    .contact__form__submit__text {
                        opacity: 0;
                    }

                    &:hover {
                        color: $color-grey-dark;
                        background-color: $color-grey-dark;
                    }
                }
            }
        }
    }

    .map {
        width: 100%;
        background-color: $color-offwhite;
        padding: 1rem;
        padding-top: 0;

        &__container {
            width: 100%;
            padding: 1rem;
            background-color: $color-white;
            padding-bottom: .5rem;

            & iframe {
                width: 100%;
                height: 60rem;
            }
        }
    }
</style>
