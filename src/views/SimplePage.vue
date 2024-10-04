<script setup>
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
    <div class="page-wrapper">
        <div class="page-text">
            <h1 class="page-text__heading"> {{ data.title }}</h1>
            <p class="page-text__paragraph">{{ data.content }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-wrapper {
    position: absolute;
}

.page-text {
    margin-left: 0;
    margin-top: 120px;
    color: $clr-secondary;
    padding-left: $page-lpad;
    padding-right: $page-rpad;

    &__heading {
        font-family: $sans-text;
        font-size: $h1;
        margin-bottom: 40px;
        caret-color: transparent;
    }

    &__paragraph {
        font-family: $sans-text;
        font-size: 20px;
    }

    @include this-and-above('lg') {
        padding-left: $page-lpad-lg;
        padding-right: $page-rpad-lg;

        &__heading {
            font-size: $h1-lg;
        }
    }

    @include this-and-above('xl') {
        padding-left: $page-lpad-xl;
        padding-right: $page-rpad-xl;

        &__heading {
            font-size: $h1-xl;
        }
    }

    @include this-and-above('xxl') {
        padding-left: $page-lpad-xxl;
        padding-right: $page-rpad-xxl;

        &__heading {
            font-size: $h1-xxl;
        }
    }
}
</style>