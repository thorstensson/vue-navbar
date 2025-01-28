<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue';
import json from '../assets/json/mockdata.json';

const route = useRoute()
const data = ref({ title: '', content: '' });

watch(
    () => route.params.id,
    () => {
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
    color: $secondary;
    padding: 0 $page-hpad 0 $page-hpad;

    &__heading {
        font-family: $sans-text;
        font-size: $h1;
        font-weight: $sans-text-wgt;
        margin-bottom: 40px;
        caret-color: transparent;
    }

    &__paragraph {
        font-family: $sans-text;
        font-size: 20px;
    }

    @include this-and-above('lg') {
        padding: 0 calc($page-hpad + $roffset-lg) 0 $page-hpad-lg;

        &__heading {
            font-size: $h1-lg;
        }
    }

    @include this-and-above('xl') {
        padding: 0 calc($page-hpad + $roffset-xl) 0 $page-hpad-xl;

        &__heading {
            font-size: $h1-xl;
        }
    }

    @include this-and-above('xxl') {
        padding: 0 calc($page-hpad + $roffset-xxl) 0 $page-hpad-xxl;

        &__heading {
            font-size: $h1-xxl;
        }
    }
}
</style>