import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user.store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore()
      if (!userStore.user?._id) next('login')
      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: () => import("../views/NotFound.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
