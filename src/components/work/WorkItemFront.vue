<template>
    <div class="ourwork__frontItem" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()" @click="click()">
        <div class="imageFlip">
            <div ref="before" :style="{ backgroundImage: geturl(item.images.main.before) } " class="image before"></div>
            <div ref="after" :style="{ backgroundImage: geturl(item.images.main.after) } " class="image after"></div>
        </div>
        <div class="details" :class="{ on: on }">
            <div class="title"> {{ item.name }}</div>
            <div class="summary" v-html="item.text.summary"></div>
            <router-link :to="{ name: 'work', params: { work: item.name } }"><div class="btn btn--small btn--bottomRight">Learn more</div></router-link>
        </div>
    </div>
</template>

<script>
import { TimelineMax } from 'gsap';

export default {
    data() {
        return {
            on: false,
            timeline: null,
            timer: null
        };
    },
    props: ['item', 'delay'],
    methods: {
        mouseEnter() {
            this.turnOn(true);
        },
        mouseLeave() {
            this.turnOn(false);
        },
        click() {
            this.on = !this.on;
            this.turnOn(this.on);
        },
        turnOn(on) {
            this.on = on;
            if (on) {
                this.timeline.resume();
            }
        },
        startTimer() {
            if (this.on) {
                this.timeline.resume();
            } else {
                this.timeline.pause();
            }
        },
        geturl(val) {
            return `url("${val}")`;
        }
    },
    mounted() {
        const { before } = this.$refs;
        const { after } = this.$refs;
        this.timeline = new TimelineMax({ repeat: -1, yoyo: true });

        this.timeline
            .to(before, 0, {})
            .to(before, 0, { yPercent: 100 })
            .addPause('+=1', this.startTimer)
            .to(before, 0, {})
            .to(before, 0, { scale: 0.75 })
            .to(after, 1, { scale: 0.75 })
            .to(after, 1, { yPercent: -100 })
            .to(before, 1, { yPercent: 0 })
            .to(before, 1, { scale: 1 })
            .addPause('+=1', this.startTimer);
    }
};
</script>

<style lang="scss">
@import '@/scss/vue-globals.scss';

.ourwork__frontItem {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;

    .imageFlip {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        & .before,
        & .after {
            will-change: transform;
        }
    }

    & .image {
        text-align: center;
        color: white;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
    }

    & .details {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        text-align: left;
        padding: 2rem;
        background-color: rgba($color-grey-dark, 0.5);
        opacity: 0;
        transition: opacity 0.5s;

        &.on {
            opacity: 1;
        }
    }

    & .title {
        color: $color-white;
        font-size: 2rem;
        font-weight: 400;
        text-align: left;
    }

    & .summary {
        margin-top: 1rem;
        font-size: 1.3rem;
        text-transform: uppercase;
        color: $color-white;
    }
}
</style>
