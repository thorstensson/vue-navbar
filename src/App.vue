<script setup>
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <nav>
    <NavBar />
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

:root {
  overscroll-behavior: none;
}

html,
body {
  background-color: $primary;
  margin: 0;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
}

body {
  min-height: 100vh;
}

.container-app {
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
