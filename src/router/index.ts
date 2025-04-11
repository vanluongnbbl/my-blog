import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { localStorageServices } from '@/utils/localStorageServices'
import { getUserProfile } from '@/api/auth/useUserProfile'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  let isAuthenticated = false
  const gestRoute = ['login']

  if (!gestRoute.includes(to.name as string)) {
    const userProfile = await getUserProfile()
    if (userProfile?.data?.id) {
      authStore.setAuth({
        id: userProfile?.data?.id,
        username: userProfile?.data?.username,
        email: userProfile?.data?.email,
      })

      isAuthenticated = !!localStorageServices.getAccessToken() && !!userProfile?.data?.id
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
