<script setup>
/**
 * Atomized Page component(s) to come, also ones that make use of GSAP.
 * The below is just so Navbar has something to work with!
 */

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue';
import json from '../assets/json/mockdata.json';
const route = useRoute()
const router = useRouter()

const data = ref({ title: '', content: '' });

watch(
    () => route.params.id,
    (newId, oldId) => {
        data.value = json[route.params.id];
    }
)

onMounted(() => {
    data.value = json[route.params.id];
})
</script>

<template>
    <div class="page">
        <h1 class="page__heading"> {{ data.title }}</h1>
        <p class="page__paragraph">{{ data.content }}</p>
    </div>
</template>

<style lang="scss" scoped>
.page {
    /*TODO:flexbox solution*/
    position: absolute;
    top: 120px;
    color: #f8f9fa;
    padding-left: $page-lpad;
    padding-right: $page-rpad;

    &__heading {
        font-family: $sans-text;
        font-size: $h1;
        margin-bottom: 40px;
        caret-color:transparent;
    }

    &__paragraph {
        font-family: $sans-text;
        font-size: 20px;
    }

    @media only screen and (min-width: 992px) {
        padding-left: $page-lpad-lg;
        padding-right: $page-rpad-lg;

        &__heading {
            font-size: $h1-lg;
        }
    }

    @media only screen and (min-width: 1200px) {
        padding-left: $page-lpad-xl;
        padding-right: $page-rpad-xl;

        &__heading {
            font-size: $h1-xl;
        }
    }

    @media only screen and (min-width: 1400px) {
        padding-left: $page-lpad-xxl;
        padding-right: $page-rpad-xxl;

        &__heading {
            font-size: $h1-xxl;
        }
    }
}
</style>