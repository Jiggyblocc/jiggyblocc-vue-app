<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTicketStore } from '../stores/ticketStore';
import TicketForm from '../components/TicketForm.vue';
import { TICKET_STATUSES } from '../data/mockTickets';

const route = useRoute();
const router = useRouter();
const ticketStore = useTicketStore();

// --- State ---
// Translates the 'view' vs 'edit' mode state from React
const isEditing = ref(false); 
// Holds the data for the current ticket
const currentTicket = ref(null);

// --- Computed ---
const ticketId = computed(() => route.params.id);
const isNewTicket = computed(() => ticketId.value === 'new');

// --- Functions ---

// 1. Fetching logic (translates finding the ticket in React's useEffect)
const loadTicket = () => {
    if (isNewTicket.value) {
        // C-reate mode: Start with an empty form
        currentTicket.value = null; 
        isEditing.value = true;
    } else {
        // R-ead/U-pdate mode: Find the ticket in the store
        const foundTicket = ticketStore.tickets.find(t => t.id === Number(ticketId.value));
        
        if (foundTicket) {
            currentTicket.value = foundTicket;
            isEditing.value = false; // Default to View Mode
        } else {
            // Handle 404 case
            router.push('/tickets'); 
        }
    }
};

// 2. Submission Handler (C/U in CRUD)
const handleFormSubmit = (formData) => {
    // This logic translates the state update/add logic from your React controller
    
    // In a new ticket scenario (C-reate)
    if (isNewTicket.value) {
        const newId = Date.now(); // Simple mock ID generation
        const newTicket = { 
            ...formData, 
            id: newId, 
            // Ensures correct ID is used if the form used a temporary one
            dateCreated: new Date().toISOString().substring(0, 10),
            // Default other fields if needed
        };
        ticketStore.tickets.push(newTicket); // Add to the mutable store list
        
        // Redirect to the newly created ticket's detail page
        router.push(`/tickets/${newId}`);
    } 
    // In an existing ticket scenario (U-pdate)
    else {
        ticketStore.saveTicket(formData); // Use the placeholder action in the store
        
        // Find and update the ticket in the store list directly for the blueprint:
        const index = ticketStore.tickets.findIndex(t => t.id === formData.id);
        if (index !== -1) {
            // Vue: Update the mutable item in the reactive array
            ticketStore.tickets[index] = formData; 
        }
        
        currentTicket.value = formData; // Update local view state
        isEditing.value = false; // Switch back to View Mode
        alert(`Ticket #${formData.id} saved successfully!`);
    }
};

// 3. Watch: Re-run loadTicket when the route parameter changes (e.g., from /tickets/1 to /tickets/2)
watch(ticketId, loadTicket);

// 4. OnMounted: Run loadTicket when the component is first created
onMounted(loadTicket);

// Helper function for styling the status badge
const getStatusClass = (status) => {
    return `status-badge status-${status.toLowerCase().replace(' ', '-')}`;
};

// Function to handle the 'Cancel' button from the form
const handleCancel = () => {
    if (isNewTicket.value) {
        router.push('/tickets'); // Go back to list if creating a new one
    } else {
        isEditing.value = false; // Go back to view mode if editing
    }
};
</script>

<template>
  <div class="ticket-detail-container">
    <button @click="router.push('/tickets')" class="back-button">
      &larr; Back to Ticket List
    </button>

    <TicketForm 
      v-if="isEditing || isNewTicket"
      :initial-ticket="currentTicket"
      :is-new="isNewTicket"
      @submitForm="handleFormSubmit"
      @cancel="handleCancel"
    />
    
    <div v-else-if="currentTicket" class="detail-card">
      <div class="detail-header">
        <h1 class="ticket-title">
          #{{ currentTicket.id }}: {{ currentTicket.title }}
        </h1>
        <button @click="isEditing = true" class="edit-button">
          Edit Ticket
        </button>
      </div>

      <div class="metadata-grid">
        <div class="meta-item">
          <strong>Status:</strong> 
          <span :class="getStatusClass(currentTicket.status)">{{ currentTicket.status }}</span>
        </div>
        <div class="meta-item">
          <strong>Priority:</strong> {{ currentTicket.priority }}
        </div>
        <div class="meta-item">
          <strong>Assigned To:</strong> {{ currentTicket.assignedTo }}
        </div>
        <div class="meta-item">
          <strong>Date Created:</strong> {{ currentTicket.dateCreated }}
        </div>
      </div>

      <div class="description-section">
        <h2>Description</h2>
        <p class="ticket-description">{{ currentTicket.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS to ensure identical detail/view styling */
.ticket-detail-container {
  padding: 40px 20px;
}

.back-button {
  background: none;
  border: none;
  color: #6b7280;
  font-weight: 600;
  padding: 5px 0;
  cursor: pointer;
  transition: color 0.2s;
  margin-bottom: 20px;
  display: block; /* Important for alignment */
}

.back-button:hover {
  color: #1f2937;
}

.detail-card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 15px;
  margin-bottom: 25px;
}

.ticket-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
}

.edit-button {
  background-color: #d1d5db;
  color: #374151;
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background-color: #9ca3af;
}

/* Metadata Grid */
.metadata-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.meta-item {
  background-color: #f9fafb;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #4b5563;
}

.meta-item strong {
  color: #1f2937;
  font-weight: 700;
}

.description-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  border-left: 4px solid var(--primary-color, #3b82f6);
  padding-left: 10px;
  margin-bottom: 15px;
}

.ticket-description {
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap; /* Preserves formatting */
}

/* Status Badge Styling (Mirrored from the list page) */
.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

.status-open { background-color: #ef4444; } 
.status-in-progress { background-color: #f59e0b; }
.status-closed { background-color: #10b981; }
</style>