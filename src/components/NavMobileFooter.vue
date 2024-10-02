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

    @media only screen and (min-width: 992px) {
        display: none;
    }
}

.modal-hr {
    position: absolute;
    width: 100%;
    bottom: 70px;
    right: 0;
    border: none;
    height: 2px;
    /* Set the hr color thinner line trick */
    color: black;
    background-color: black;
}
</style>
