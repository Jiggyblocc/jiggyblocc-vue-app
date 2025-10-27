// src/stores/authStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // Translate React's useState(false) for authentication status
  const isAuthenticated = ref(false);

  const login = () => {
    // Mock successful login
    isAuthenticated.value = true;
  };

  const logout = () => {
    // Clear session
    isAuthenticated.value = false;
  };

  return { isAuthenticated, login, logout };
});