// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

// We will create these Page components next
import LandingPage from '../pages/LandingPage.vue';
import AuthPage from '../pages/AuthPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import TicketListPage from '../pages/TicketListPage.vue';
import TicketDetailPage from '../pages/TicketDetailPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/auth/:mode(login|signup)', component: AuthPage, name: 'Auth' },
    // Routes requiring authentication (meta: { requiresAuth: true } is the flag)
    { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
    { path: '/tickets', component: TicketListPage, meta: { requiresAuth: true } },
    { path: '/tickets/:id', component: TicketDetailPage, meta: { requiresAuth: true } },
  ],
});

// Implements the ProtectedRoute logic
router.beforeEach((to, from) => {
  // Use the pinia store outside of a component
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect unauthenticated users to login
    return { name: 'Auth', params: { mode: 'login' } };
  }
  return true;
});

export default router;