<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { Transition } from 'vue';
</script>

<template>
   <nav>
      <Navbar />
    </nav>
  <div class="wrapper">
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

body {
  min-height:100vh;
}

/*full width, pages will set their own padding*/
.wrapper {
  max-width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
