import { createRouter, createWebHistory } from 'vue-router'
import SimplePage from '@/components/SimplePage.vue';

const routes = [
  {
    path: '/:id',
    component: SimplePage
  },
  { path: '/', redirect: '/home' }
];

const router = createRouter({
  linkActiveClass: 'nav--link-active',
  linkExactActiveClass: 'nav--link-exact-active',
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        props: true
      }
    }
  }

})

export default router
