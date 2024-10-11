<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <nav>
    <Navbar />
  </nav>
  <div class="container-app">
    <RouterView v-slot="{ Component }">
      <Transition name="fade">
        <component :key="$route.path" :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss">
html,
body {
  background-color: $clr-primary;
  margin: 0;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
}

html{
  overflow: hidden;
  overscroll-behavior: none;
}

body {
  min-height: 100vh;
  overscroll-behavior-y: contain;
}

.container-app {
  background-color: blue;
  max-width: 100%;
  display: flex;
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  position: absolute;
  opacity: 0;
}
</style>
