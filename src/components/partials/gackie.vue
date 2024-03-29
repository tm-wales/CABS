<template>
    <div class="warnings">
        <div class="warnings__warning" v-for="(warning, windex) in warnings" :key="warning.name" :class="{'hide': warning.hide, [warning.name]: true}">
            <div class="warnings__text" v-html='warning.text'>
            </div>
            <div class="warnings__button" v-for='(button, bindex) in warning.buttons'
                :key='button.text' :style='styleButtons(windex, bindex)'
                @mouseenter='updateHoverState(windex, bindex, true)' @mouseleave='updateHoverState(windex, bindex, false)'
                @click='buttonClick(windex, bindex)'
            >
                {{ button.text }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            googleAnalyticsID: 'UA-120665843-2',
            warnings: [
                {
                    name: 'ie',
                    text:
                        'You are using an <strong>outdated</strong> browser. Please <a target="blank" href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.',
                    buttons: [
                        {
                            color: 'rgb(23, 173, 20)',
                            text: 'OK, thanks',
                            script: '',
                            hover: false
                        }
                    ],
                    hide: true
                },
                {
                    name: 'cookie',
                    text:
                        '<p><strong>Our site uses cookies</strong></p><p>We use cookies to ensure you get the best experience. Our full <a href="/policies/cookie-policy">Cookie Policy</a> is available for you, do you accept our policy?</p>',
                    buttons: [
                        {
                            color: 'rgb(23, 173, 20)',
                            text: 'Yes',
                            script: 'cookiePolicy',
                            scriptVar: true,
                            hover: false
                        },
                        {
                            color: 'rgb(175, 55, 39)',
                            text: 'No',
                            script: 'cookiePolicy',
                            scriptVar: false,
                            hover: false
                        }
                    ],
                    hide: true
                }
            ]
        };
    },
    methods: {
        gaCheck() {
            if (this.googleAnalyticsID) {
                if (this.getCookie('cookiePolicy') === 'accepted') {
                    this.$ga.enable();
                } else {
                    this.$ga.disable();
                }
            }
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            var expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
        },
        getCookie(cname) {
            var name = cname + '=';
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        },
        deleteCookie(cname) {
            this.setCookie(cname, '', -1);
        },
        clearAllCookies() {
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var cookie = ca[i];
                var eqPos = cookie.indexOf('=');
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie =
                    name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
            }
        },
        cookiePolicy(accepted) {
            let text = accepted ? 'accepted' : 'declined';
            let days = accepted ? 365 : 7;
            this.clearAllCookies();
            this.setCookie('cookiePolicy', text, days);
            this.gaCheck();
        },
        ie() {
            // I.E warning
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE') !== -1;

            // If Internet Explorer, return version number
            if (msie || navigator.appVersion.indexOf('Trident/') > -1) {
                if (this.getCookie('ieWarning') !== 'confirmed') {
                    this.warnings[0].hide = false;
                }
            }
        },
        cookie() {
            // Cookie warnings
            if (this.getCookie('cookiePolicy') === '') {
                this.warnings[1].hide = false;
            }
        },
        ieConfirmation() {
            this.setCookie('ieWarning', 'confirmed', 1);
        },
        updateHoverState(warning, button, isHover) {
            this.warnings[warning].buttons[button].hover = isHover;
        },
        styleButtons(windex, bindex) {
            let color = '';
            let border = '';
            let bcolor = '';

            if (this.warnings[windex].buttons[bindex].hover) {
                color = '#FFFFFF';
                bcolor = this.warnings[windex].buttons[bindex].color;
            } else {
                color = this.warnings[windex].buttons[bindex].color;
                bcolor = '#FFFFFF';
            }
            border = '1px solid ' + this.warnings[windex].buttons[bindex].color;

            return {
                color: color,
                backgroundColor: bcolor,
                border: border
            };
        },
        buttonClick(warning, button, variable) {
            let script = this.warnings[warning].buttons[button].script;

            if (script) {
                this[script](this.warnings[warning].buttons[button].scriptVar);
            }

            this.warnings[warning].hide = true;
        }
    },
    computed: {
        ...mapGetters(['config'])
    },
    mounted() {
        this.googleAnalyticsID = this.config.googleAnalyticsID;
        this.gaCheck();
        this.ie();
        this.cookie();

        if (this.$route.path === '/policies/cookie-policy') {
            this.warnings[1].hide = false;
        }
    },
    watch: {
        $route(to, from) {
            if (to.path === '/policies/cookie-policy') {
                this.warnings[1].hide = false;
            }
        }
    }
};
</script>

<style lang='scss'>
/*     VARIABLES      */
/* ------------------ */
$warnings-background: rgb(255, 255, 255);
$warnings-text: rgb(46, 46, 46);
$warnings-link: rgb(0, 145, 185);
$warnings-shadow: rgb(190, 190, 190);

.warnings {
    position: fixed;
    bottom: 1rem;
    right: -31rem;
    width: 61rem;
    font-size: 1.2rem;
    text-align: center;
    font-weight: 500;
    z-index: 9999;

    & a {
        &:link,
        &:visited {
            color: $warnings-link;
            text-decoration: none;
        }

        &:hover,
        &:active {
            color: darken($warnings-link, 30%);
        }
    }

    &__warning {
        margin: 2rem 0;
        width: 30rem;
        padding: 2rem;
        background-color: $warnings-background;
        box-shadow: $warnings-shadow 0 0 10px 0;
        color: $warnings-text;
        transition: all 0.3s;

        &.hide {
            margin-left: 31rem;
        }
    }

    &__button {
        display: inline-block;
        transition: all 0.3s;
        width: 40%;
        cursor: pointer;
        margin: 1rem 0.5rem 0.5rem 0;
        color: $warnings-text;
    }
}
</style>
