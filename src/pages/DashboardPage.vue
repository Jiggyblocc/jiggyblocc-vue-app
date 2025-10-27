<script setup>
import { ref, computed, onMounted } from 'vue';
import mockTickets, { TICKET_STATUSES } from '../data/mockTickets';
// ... (Logic remains exactly the same as before) ...

const ticketSummary = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0,
});

const calculateSummary = () => {
  let openCount = 0;
  let inProgressCount = 0;
  let closedCount = 0;

  mockTickets.forEach(ticket => {
    switch (ticket.status) {
      case TICKET_STATUSES.OPEN:
        openCount++;
        break;
      case TICKET_STATUSES.IN_PROGRESS:
        inProgressCount++;
        break;
      case TICKET_STATUSES.CLOSED:
        closedCount++;
        break;
    }
  });

  ticketSummary.value = {
    total: mockTickets.length,
    open: openCount,
    inProgress: inProgressCount,
    closed: closedCount,
  };
};

onMounted(() => {
  calculateSummary();
});

// Updated card definitions to better match the colors in your image
const statCards = computed(() => [
  { 
    title: 'Total Tickets', 
    value: ticketSummary.value.total, 
    color: 'border-purple', // Purple border/accent
    icon: 'fa-ticket-alt' 
  },
  { 
    title: 'Open Tickets', 
    value: ticketSummary.value.open, 
    color: 'border-green', // Green border/accent (for Open in your image)
    icon: 'fa-lock-open' 
  },
  { 
    title: 'In Progress', 
    value: ticketSummary.value.inProgress, 
    color: 'border-orange', // Orange border/accent
    icon: 'fa-cogs' 
  },
  { 
    title: 'Closed Tickets', 
    value: ticketSummary.value.closed, 
    color: 'border-gray', // Neutral border/accent
    icon: 'fa-check-circle' 
  },
]);
</script>

<template>
  <div class="dashboard-page-container">
    <h1 class="page-title">Ticket Summary</h1>
    
    <div class="stats-grid">
      <div 
        v-for="card in statCards" 
        :key="card.title" 
        class="stat-card"
        :class="card.color"
      >
        <div class="card-content">
          <p class="card-title">{{ card.title }}</p>
          <p class="card-value">{{ card.value }}</p>
        </div>
      </div>
    </div>
    
    <div class="quick-actions-card">
      <h2 class="quick-actions-title">Quick Actions</h2>
      <p class="quick-actions-info">
        Use the links in the header to navigate to Ticket Management.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Base Layout */
.dashboard-page-container {
  padding: 40px 20px;
  max-width: 900px; /* Adjusting max-width to match the centered look of the image */
  margin: 0 auto;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 30px;
}

/* Stat Grid Layout */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 columns across */
  gap: 20px;
  margin-bottom: 40px;
}

/* Individual Stat Card Styling - KEY CHANGES TO MATCH IMAGE */
.stat-card {
  /* White background, border radius, and shadow for the distinct card look */
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-top: 4px solid transparent; /* Used for colored accents */
}

.card-content {
  margin-top: 15px; /* Spacing below the border */
}

.card-value {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 5px;
}

.card-title {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
}

/* Accent Colors (Based on your image) */
.border-purple { border-top-color: #7c3aed; } /* Total */
.border-green { border-top-color: #10b981; } /* Open */
.border-orange { border-top-color: #f97316; } /* In Progress */
.border-gray { border-top-color: #9ca3af; } /* Closed */

/* Quick Actions Card */
.quick-actions-card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid #e5e7eb; /* Subtle border */
}

.quick-actions-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
}

.quick-actions-info {
  color: #6b7280;
  font-size: 1rem;
}
</style>