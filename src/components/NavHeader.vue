<script setup>
import { useSlots } from 'vue';
const slots = useSlots();
</script>

<template>
    <div>
        <div v-if="slots.name" class="name">
            <slot name="name"></slot>
        </div>
        <div v-if="slots.contact" class="contact">
            <slot name="contact"></slot>
        </div>
        <div v-if="slots.social" class="social">
            <slot name="social"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.name,
.contact,
.social {
    z-index: 100;
    color: inherit;
    margin-right: auto;
}

.name:empty,
.contact:empty,
.social:empty {
    display: none;
}

.contact,
.social {
    display: none;

    @include this-and-above('lg') {
        display: inline;
    }
}
</style>