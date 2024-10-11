<script setup></script>

<template>
    <div>
        <div class="contact">
            <slot name="contact"></slot>
        </div>
        <div class="social">
            <slot name="social"></slot>
        </div>
        <hr class="modal-hr">
    </div>
</template>

<style lang="scss" scoped>
.contact,
.social {
    display: inline;
    z-index: 100;
    color: $clr-primary;
    font-size: 15px;
    line-height: 1.2;
    text-decoration: none;

    @include this-and-above('lg') {
        display: none;
    }
}

.modal-hr {
    position: absolute;
    width: 100%;
    bottom: 60px;
    right: 0;
    border: none;
    height: 2px;
    color: black;
    background-color: black;
}
</style>
