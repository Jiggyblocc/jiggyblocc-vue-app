<script setup>
import { RouterView, useRouter } from 'vue-router'; // Import RouterView and useRouter
import { useAuthStore } from './stores/authStore';

// Get the store and router instances
const authStore = useAuthStore();
const router = useRouter();

// Function to handle logout and redirection
const handleLogout = () => {
  authStore.logout();
  router.push('/'); // Redirect to landing page after logging out
};
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <h1 class="logo" @click="router.push('/')">TicketVue Pro</h1>
        <nav>
          <button @click="router.push('/tickets')" class="nav-button">Tickets</button>
          
          <template v-if="!authStore.isAuthenticated">
            <button @click="router.push('/auth/login')" class="nav-button primary">Login</button>
          </template>
          <template v-else>
            <button @click="router.push('/dashboard')" class="nav-button">Dashboard</button>
            <button @click="handleLogout" class="nav-button">Logout</button>
          </template>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <RouterView /> 
    </main>

    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} TicketVue Pro. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
/* Global Styling and Layout CSS (Mirrors global CSS from React blueprint) */
:root {
  --primary-color: #3b82f6; /* Blue */
  --text-color: #1f2937; /* Dark Gray */
  --bg-color: #f9fafb; /* Light Gray Background */
}

/* Base Body Style */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  min-height: 100vh;
}

/* App Container (Ensures content is centered and takes full height) */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styling */
.app-header {
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 15px 20px;
  width: 100%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Max-width rule is applied here, exactly mirroring the React Layout */
  max-width: 1440px; 
  margin: 0 auto;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  cursor: pointer;
  margin: 0;
}

.nav-button {
  background: none;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color);
  border-radius: 6px;
  transition: background-color 0.2s;
}

.nav-button:hover {
  background-color: #f3f4f6;
}

.nav-button.primary {
  background-color: var(--primary-color);
  color: white;
}

.nav-button.primary:hover {
  background-color: #2563eb;
}

/* Main Content Area */
.app-main {
  flex-grow: 1;
  width: 100%;
  /* This centers the content and applies the max-width to the container of the pages */
  max-width: 1440px;
  margin: 0 auto;
}

/* Footer Styling */
.app-footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.85rem;
  margin-top: auto;
}
</style>