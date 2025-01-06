<script setup>
import { ref, onBeforeUnmount } from 'vue';
import NavHeader from './NavHeader.vue';
import NavMobileFooter from './NavMobileFooter.vue';

const isDown = ref(false);
const isMobileActive = ref(false);
const screenWidth = ref(window.innerWidth);

let currScrollPos;
let prevScrollPos;

/**
 * A minimal & responsive navbar for those who like BEM with &.
 * Turns full modal on smaller devices. Hides on scroll down.
 */

const toggleMenu = () => {
    isMobileActive.value = !isMobileActive.value;
}

const closeMenu = () => {
    if (screenWidth.value < 992) {
        toggleMenu();
    }
}

const checkScreenWidth = () => {
    screenWidth.value = window.innerWidth;
    if (screenWidth.value > 992) {
        isMobileActive.value = false;
    }
}

// Two birds, one stone
const wrapNavigate = (navigate, event) => {
    closeMenu();
    navigate(event);
}

const onScroll = () => {
    currScrollPos = window.scrollY;
    if (prevScrollPos > currScrollPos) {
        isDown.value = false;
    } else {
        isDown.value = true;
    }
    prevScrollPos = currScrollPos;
}

window.addEventListener('scroll', onScroll)
window.addEventListener('resize', checkScreenWidth);
onBeforeUnmount(() => window.removeEventListener('resize', checkScreenWidth));
checkScreenWidth();
</script>

<template>

    <div class="nav-wrapper" :class="{ 'nav-wrapper--moveup': isDown }">
        <div class="nav-wrapper__inner">

            <NavHeader class="header-wrapper" :class="{ 'header-wrapper--alt-color': isMobileActive }">
                <template #name>
                    &bull; Thorstensson
                </template>
                <template #contact>
                    Vue Developer / Designer<br>
                    <a href="mailto:someone@example.com">Some info here</a>
                </template>
                <template #social>
                    <a target='_blank' href='https://www.linkedin.com/in/thomasthorstensson'>LinkedIn / </a><br>
                    <a target='_blank' href='https://www.flickr.com/photos/thomasthorstensson/'>&nbsp;Flickr</a>
                </template>b
            </NavHeader>

            <div class="nav" :class="[isMobileActive ? 'nav--open' : 'nav--closed']">
                <ul class="nav__list">

                    <router-link to="/home" custom v-slot="{ isActive, navigate, href }">
                        <li :href="href" @click="wrapNavigate(navigate, $event)" class="nav__item"
                            :class="{ 'nav--link-active': isActive }">Home</li>
                    </router-link>

                    <router-link to="/work" custom v-slot="{ isActive, navigate, href }">
                        <li :href="href" @click="wrapNavigate(navigate, $event)" class="nav__item"
                            :class="{ 'nav--link-active': isActive }">Work</li>
                    </router-link>

                    <router-link to="/about" custom v-slot="{ isActive, navigate, href }">
                        <li :href="href" @click="wrapNavigate(navigate, $event)" class="nav__item"
                            :class="{ 'nav--link-active': isActive }">About</li>
                    </router-link>
                </ul>

                <NavMobileFooter class="footer-wrapper">
                    <template #contact>
                        <a href="mailto:someone@example.com">Some info here</a><br />
                    </template>
                    <template #social>
                        <a target='_blank' href='https://www.linkedin.com/in/thomasthorstensson'>LinkedIn<br></a>
                        <a target='_blank' href='https://www.flickr.com/photos/thomasthorstensson/'>Flickr</a>
                    </template>
                </NavMobileFooter>
            </div>

            <div class="burger" @click="toggleMenu" :class="{ 'burger--anim': isMobileActive }">
                <svg width="30px" height="30px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <line x1="0" y1="17" x2="48" y2="17" stroke-width="3" />
                        <line x1="12" y1="31" x2="48" y2="31" stroke-width="3" />
                    </g>
                    <g>
                        <line x1="0" y1="24" x2="48" y2="24" stroke-width="3" />
                        <line x1="0" y1="24" x2="48" y2="24" stroke-width="3" />
                    </g>
                </svg>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
* {
    user-select: none;
}

a,
a:hover,
a:active,
a:visited {
    cursor: pointer;
    color: unset;
    text-decoration: none;
}

.modal-open {
    height: 100vh;
    overflow-y: hidden;
}

.nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    margin: auto;
    width: 100%;
    z-index: 999;
    overflow: hidden;
    transition: top .4s;

    &--moveup {
        top: -100px;
    }
}

.nav-wrapper__inner {
    display: flex;
    align-items: center;
    height: 100%;
    font-family: $sans-ui;
    font-weight: 600;
    font-size: 16px;
    max-width: 95%;
    margin: auto;
    background-color: $clr-primary;
}

.header-wrapper {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    height: 80px;
    color: $clr-secondary;
    font-weight: isColorDark($clr-primary);

    &--alt-color {
        color: $clr-primary;
        font-weight: isColorDark($clr-secondary);
    }
}

.footer-wrapper {
    position: absolute;
    right: 20px;
    bottom: 15px;
    width: auto;
    text-align: right;

    :deep(.contact),
    :deep(.social) {
        font-weight: isColorDark($clr-secondary);
    }
}

.nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    // In moddal view font and background colors are inverted.
    color: $clr-primary;
    background-color: $clr-secondary;
    transition: left .4s cubic-bezier(.075, .82, .165, 1);

    &--open {
        font-weight: $sans-ui-wt-def;
        left: 0%;
        touch-action: none;
        -webkit-overflow-scrolling: none;
        overflow: hidden;
        /* Other browsers */
        overscroll-behavior: none;
    }

    &--closed {
        left: -100%;
    }

    &__list {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        list-style: none;
        width: fit-content;
        text-align: center;
    }

    &__item {
        cursor: pointer;
        font-size: 60px;
        white-space: nowrap;
        line-height: 1.1;
    }

    &__item::before {
        content: "";
        opacity: 0;
        transition: opacity .5s ease-in-out;
        line-height: 1;
    }

    &__item:hover::before,
    &--link-active::before {
        position: absolute;
        content: "\2022";
        white-space: nowrap;
        left: -28px;
        opacity: 1;
    }

    // Switch to desktop
    @include this-and-above('lg') {
        transition: none;
        position: relative;
        width: initial;
        height: 80px;
        background-color: $clr-primary;
        color: $clr-secondary;
        font-weight: isColorDark($clr-primary);

        &--closed {
            opacity: 1;
            left: unset;
            right: 0;
        }

        &__list {
            margin: 0;
        }

        &__item::before {
            line-height: unset;
        }

        &__item {
            display: inline;
            margin: 0;
            margin: 0 0 0 30px;
            position: relative;
            font-size: 16px;
            line-height: unset;
        }

        &__item:hover::before,
        &--link-active::before {
            left: -10px;
        }
    }
}

// For this svg I wont apply the inception rule, yikes. 
.burger {
    z-index: 20;
    transition: transform 1.5s;
    cursor: pointer;
    box-sizing: border-box;
    height: 35px;
    width: 35px;

    svg {
        stroke: $clr-secondary;
        transition: .2s;
        g {
            &:first-child {
                opacity: 1;
                transition: opacity 0s .2s;

                line {
                    transition: transform .2s .2s;
                    transform: translateY(0px);
                }
            }

            &:last-child {
                opacity: 0;
                transition: opacity 0s .2s;

                line {
                    transition: transform .2s;
                    transform: rotate(0deg);
                    transform-origin: center;
                }
            }
        }
    }

    &--anim svg {
        stroke: $clr-primary;

        g {
            &:first-child {
                opacity: 0;

                line {
                    transition: transform .2s;

                    &:first-child {
                        transform: translateY(7px);
                    }

                    &:last-child {
                        transform: translateY(-7px);
                    }
                }
            }

            &:last-child {
                opacity: 1;

                line {
                    transition: transform .2s .2s;

                    &:first-child {
                        transform: rotate(45deg);
                    }

                    &:last-child {
                        transform: rotate(-45deg);
                    }
                }
            }
        }
    }

    // Bubbles
    @include this-and-above('lg') {
        display: none;
    }
}
</style>