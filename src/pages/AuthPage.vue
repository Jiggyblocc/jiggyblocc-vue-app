<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// --- State (V-Model binding) ---
const email = ref('');
const password = ref('');
const username = ref(''); 

// --- Computed Properties for Conditional Rendering ---
// Checks if the URL is /auth/login
const isLoginMode = computed(() => route.params.mode === 'login');
const formTitle = computed(() => isLoginMode.value ? 'Welcome Back!' : 'Create Your Account');

// --- Submission Logic ---
const handleSubmit = (event) => {
  event.preventDefault();
  
  if (isLoginMode.value) {
    // Mock Login: use the same mock credentials
    if (email.value === 'test@user.com' && password.value === 'password') {
      authStore.login();
      // Redirect to the Dashboard on success
      router.push('/dashboard'); 
    } else {
      alert('Login failed. Use test@user.com and password.');
    }
  } else {
    // Simulate Signup and redirect to login
    alert(`Signup simulated for user: ${username.value} / ${email.value}`);
    router.push('/auth/login');
  }
};

const toggleMode = () => {
  const newMode = isLoginMode.value ? 'signup' : 'login';
  router.push(`/auth/${newMode}`);
};
</script>

<template>
  <div class="auth-page-container">
    <div class="auth-card">
      <h2 class="form-title">{{ formTitle }}</h2>
      
      <form @submit="handleSubmit">
        <div class="form-group" v-if="!isLoginMode">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required>
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" required>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>

        <button type="submit" class="submit-button">
          {{ isLoginMode ? 'Login' : 'Sign Up' }}
        </button>
      </form>

      <p class="toggle-link">
        {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
        <span @click="toggleMode" class="toggle-action">
          {{ isLoginMode ? 'Sign Up' : 'Login' }}
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* CSS to perfectly mirror the clean, centered style (AuthPage.module.css equivalent) */
.auth-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
}

.auth-card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 30px;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: var(--primary-color, #3b82f6);
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color, #3b82f6);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.toggle-link {
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 25px;
}

.toggle-action {
  color: var(--primary-color, #3b82f6);
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
}

.toggle-action:hover {
  color: #2563eb;
  text-decoration: underline;
}
</style>