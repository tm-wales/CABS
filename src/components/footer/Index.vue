<template>
<div class="footer">
    <app-acc></app-acc>
    <app-end></app-end>
</div>
</template>

<script>
import Accreditations from './Accreditations.vue'
import End from './Footer.vue'

export default {
    components: {
        'app-acc': Accreditations,
        'app-end': End
    }
}
</script>

<style lang="scss">
    @import "@/scss/vue-globals.scss";
    .footer {
        background-color: $color-white;
    }
</style>
