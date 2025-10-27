<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="landing-container">
    <!-- The structure remains the same -->
    <div class="hero-section">
      <div class="hero-content">
        <!-- Text content is now left-aligned -->
        <h2 class="hero-title">
          TicketVue Pro: <span class="highlight">Effortless</span> Ticket Management
        </h2>
        <p class="hero-subtitle">
          Streamline your support workflow and resolve issues faster with our integrated system.
        </p>
        <div class="hero-actions">
          <!-- The "Get Started" button is now the primary, solid blue button (matching screenshot) -->
          <button @click="router.push('/auth/login')" class="action-button primary">
            Get Started
          </button>
          <!-- The "Login" button is now the secondary, outlined button (matching screenshot) -->
          <button @click="router.push('/auth/login')" class="action-button secondary">
            Login
          </button>
        </div>
      </div>
      
      <!-- Graphic Elements -->
      <div class="hero-graphic">
        <!-- The large blue circle needs to be darker and more prominent -->
        <div class="circle-main"></div>
        <!-- The blurred effect behind it -->
        <div class="circle-blur"></div>
        <div class="circle-small"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS to perfectly mirror the wavy design from the React Hero component */

.landing-container {
  padding: 40px 20px;
  position: relative;
  overflow: hidden; 
}

.hero-section {
  position: relative;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 60px 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  min-height: 400px;
  
  /* FIX: Use flex to align content and graphic side-by-side */
  display: flex;
  justify-content: space-between; 
  align-items: center;
  text-align: left; /* Ensure text alignment is left */
  z-index: 10;
  overflow: hidden;
}

.hero-content {
  max-width: 50%; /* Content takes up half the space */
  padding-right: 50px;
  z-index: 20; 
}

/* ADJUSTMENT: Header text size and color to match screenshot */
.hero-title {
  font-size: 3.5rem; /* Larger font size */
  font-weight: 900;
  color: #1f2937;
  line-height: 1.1;
  margin-bottom: 25px;
}

.highlight {
  color: var(--primary-color, #3b82f6);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 30px;
}

.hero-actions button {
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 15px; /* Use margin-right for left-aligned buttons */
}

/* FIX: "Get Started" is the primary blue button */
.action-button.primary {
  background-color: var(--primary-color, #3b82f6);
  color: white;
  border: 1px solid var(--primary-color, #3b82f6);
}

.action-button.primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

/* FIX: "Login" is the secondary outlined button */
.action-button.secondary {
  background-color: #ffffff;
  color: var(--primary-color, #3b82f6);
  border: 1px solid var(--primary-color, #3b82f6);
}

.action-button.secondary:hover {
  background-color: #f3f4f6;
  transform: translateY(-1px);
}

/* Graphics (Mirroring the distinct wavy/geometric shapes and blur) */
.hero-graphic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
}

/* FIX: Removed square and large circle, replaced with a main circle and a blur circle */
/* The large solid blue circle on the right */
.circle-main {
    position: absolute;
    top: 50%;
    right: 5%; /* Positioned on the right edge */
    width: 300px;
    height: 300px;
    background-color: #2563eb; /* Darker, prominent blue */
    border-radius: 50%;
    transform: translateY(-50%);
}

/* The subtle blur effect behind the main circle */
.circle-blur {
    position: absolute;
    top: 50%;
    right: 15%;
    width: 400px;
    height: 400px;
    background-color: #60a5fa; /* Lighter blue */
    border-radius: 50%;
    filter: blur(80px); /* Creates the glow/blur effect */
    opacity: 0.3;
    transform: translateY(-50%);
}

/* The small wave at the bottom (was hero-graphic::before) */
.hero-section::after {
    content: '';
    position: absolute;
    bottom: -150px;
    left: 0;
    width: 100%;
    height: 300px;
    background-color: #eff6ff; /* Very light blue */
    border-radius: 50% 50% 0 0 / 100px 100px 0 0; /* Creates the bottom wave */
    transform: translateY(0);
    opacity: 1;
    z-index: 1;
}

@keyframes float {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-20px); }
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Media Query for Mobile Responsiveness */
@media (max-width: 768px) {
    .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 40px 20px;
        min-height: 300px;
    }
    .hero-content {
        max-width: 100%;
        padding-right: 0;
        margin-bottom: 20px;
    }
    .hero-title {
        font-size: 2rem;
        margin-bottom: 10px;
    }
    .hero-subtitle {
        font-size: 1rem;
    }
    .hero-actions button {
        margin: 5px;
    }
    /* Hide large graphics on small screens for better performance and layout */
    .circle-main, .circle-blur, .hero-graphic, .hero-section::after {
        display: none;
    }
}
</style>
