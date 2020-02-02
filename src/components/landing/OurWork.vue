<template>
    <div class="section--ourwork">
        <div class="worklist">
            <app-worklist :class="'img' + (index + 1)" v-for="(item, index) in workList" :key="item.name" :item="item" :style="{ gridArea: 'img' + (index + 1) }" :delay="index"></app-worklist>
        </div>
    </div>
</template>

<script>
    import WorkItem from '../work/WorkItemFront.vue'

    export default {
        components: {
            'app-worklist': WorkItem
        },
        computed: {
            workList () {
                return this.$store.getters['featuredWork'](7)
            }
        }
    }
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";

    .section--ourwork {
        padding: 1rem;
        background-color: $color-offwhite;

        .worklist {
            display: grid;
            grid-gap: 1rem;
            min-height: 75vh;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr;
            grid-template-areas: "img1 img2 img3 img4"
                                 "img1 img5 img3 img4"
                                 "img6 img5 img3 img4"
                                 "img6 img5 img3 img7";
            @include media ('1300') {
                min-height: 120vh;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
                grid-template-areas: "img1 img2"
                                     "img1 img5"
                                     "img6 img5"
                                     "img6 img4"
                                     "img6 img4"
                                     "img3 img7";
            }
            @include media ('1000') {
                min-height: 200vh;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 1fr 1fr 1fr;
                grid-template-areas: "img1"
                                     "img2"
                                     "img3"
                                     "img4";
                & .img5,.img6,.img7 {display:none;}
            }
        }
    }
</style>
