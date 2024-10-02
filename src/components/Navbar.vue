<script setup>
import { ref, onBeforeUnmount } from 'vue';
import NavHeader from './NavHeader.vue';
import NavMobileFooter from './NavMobileFooter.vue';

const isMobileActive = ref(false);
const screenWidth = ref(window.innerWidth);

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

const wrapNavigate = (navigate, event) => {
    closeMenu();
    navigate(event);
}

window.addEventListener('resize', checkScreenWidth);
onBeforeUnmount(() => window.removeEventListener('resize', checkScreenWidth));
checkScreenWidth();
</script>

<template>

    <div class="container-fixed">
        <div class="container-nav">

            <NavHeader class="container-header" :class="{ 'container-header--alt-color': isMobileActive }">
                <template #name>
                    &bull; THORSTENSSON
                </template>
                <template #contact>
                    VUE DEVELOPER/DESIGNER<br>
                    THOMAS.THORSTENSSON@GMAIL.COM
                </template>
                <template #social>
                    <a target='_blank' href='https://www.linkedin.com/in/thomasthorstensson'>LINKEDIN/</a><br>
                    <a target='_blank' href='https://www.flickr.com/photos/thomasthorstensson/'>&nbsp;FLICKR</a>
                </template>
            </NavHeader>

            <div class="nav" :class="[isMobileActive ? 'nav--open' : 'nav--closed']">
                <ul class="nav__list">

                    <router-link to="/home" custom v-slot="{ isActive, navigate, href, route }">
                        <li :href="href" @click="wrapNavigate(navigate, $event)" class="nav__item"
                            :class="{ 'nav--link-active': isActive }">HOME</li>
                    </router-link>

                    <router-link to="/work" custom v-slot="{ isActive, navigate, href, route }">
                        <li :href="href" @click="wrapNavigate(navigate, $event)" class="nav__item"
                            :class="{ 'nav--link-active': isActive }">WORK</li>
                    </router-link>

                    <router-link to="/about" custom v-slot="{ isActive, navigate, href, route }">
                        <li :href="href" @click="wrapNavigate(navigate, $event)" class="nav__item"
                            :class="{ 'nav--link-active': isActive }">ABOUT</li>
                    </router-link>
                </ul>

                <NavMobileFooter class="footer-wrapper">
                    <template #contact>
                        THOMAS.THORSTENSSON@GMAIL.COM<br />
                    </template>
                    <template #social>
                        <a target='_blank' href='https://www.linkedin.com/in/thomasthorstensson'>LINKEDIN<br></a>
                        <a target='_blank' href='https://www.flickr.com/photos/thomasthorstensson/'>FLICKR</a>
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

/*flexbox doesn't go well with fixed so we use another container heaven*/
.container-fixed {
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  width: 100%;
  z-index:999;
}

a,
a:hover,
a:active,
a:visited {
    cursor: pointer;
    color: unset;
    text-decoration: none;
}

.container-nav {
    justify-content: space-between;
    display: flex;
    flex: 0 1 auto;
    align-items: center;
    height: 100%;
    font-family: $sans-ui;
    font-weight: 600;
    font-size: 16px;
    max-width: 95%;
    margin: auto;
    background-color: $clr-primary;
}

.container-header {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    height: 80px;
    color: $clr-secondary;
    font-weight: isColorDark($clr-primary);

    /*when modal menu slides in colors are --inverted so we check against clr-secondary. the font weight fix on dark bg is all a little out there
    feel free to fork, remove*/
    &--alt-color {
        color: $clr-primary;
        font-weight: isColorDark($clr-secondary);
    }
}

.footer-wrapper {
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: auto;
    text-align: right;

    :deep(.contact),
    :deep(.social) {
        font-weight: isColorDark($clr-secondary);
        /*primary is bg col but for modal inverse and we only see footer when modal open*/
    }
}

.nav {
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    /*in moddal view font and background colors are inverted*/
    color: $clr-primary;
    background-color: $clr-secondary;
    transition: left 0.3s;
    height: 100vh;
    font-weight: isColorDark($clr-primary);

    &--open {
        font-weight: $sans-ui-wt-def;
        /*big bold text no need to calc font weight*/
        left: 0%;
        opacity: 1;
        transition: opacity, .4s;
    }

    &--closed {
        left: -100%;
        transition: opacity, .4s;
        opacity: 0;
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
    }

    &__item::before {
        content: "";
        opacity: 0;
        transition: opacity .5s ease-in-out;
    }

    &__item:hover::before,
    &--link-active::before {
        position: absolute;
        content: "\2022";
        white-space: nowrap;
        left: -28px;
        opacity: 1;

    }

    @media only screen and (min-width: 992px) {
        transition: none;
        position: relative;
        width: initial;
        height: 80px;
        background-color: $clr-primary;
        color: $clr-secondary;

        &--closed {
            opacity: 1;
            /*simple way to avoid transsition upon resize desktop to mobile*/
            left: unset;
            right: 0;
        }

        &__list {
            margin: 0;
        }

        &__item {
            display: inline;
            margin: 0;
            margin: 0 0 0 30px;
            position: relative;
            font-size: 16px;
        }

        &__item:hover::before,
        &--link-active::before {
            left: -10px;
        }
    }
}

/*for this svg I wont apply the inception rule, yikes*/
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

    /*bubbles*/
    @media only screen and (min-width: 992px) {
        display: none;
    }
}
</style>