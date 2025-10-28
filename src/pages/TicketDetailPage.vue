<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTicketStore } from '../stores/ticketStore';
import TicketForm from '../components/TicketForm.vue';
// Note: TICKET_STATUSES is imported here only if needed for display in the form options, 
// but typically it's enough to just be in the mockTickets file or the store.
// import { TICKET_STATUSES } from '../data/mockTickets'; 

const route = useRoute();
const router = useRouter();
const ticketStore = useTicketStore();

// --- State ---
const isEditing = ref(false); 
const currentTicket = ref(null);

// --- Computed ---
const ticketId = computed(() => route.params.id);
const isNewTicket = computed(() => ticketId.value === 'new');

// --- Functions ---

const loadTicket = () => {
    if (isNewTicket.value) {
        // C-reate mode: Start with an empty form
        currentTicket.value = null; 
        isEditing.value = true; // 🚨 MUST be true to show the form 
    } else {
        // R-ead/U-pdate mode: Find the ticket in the store
        // Use a getter or direct find from the store's reactive state
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

// Submission Handler (C/U in CRUD)
const handleFormSubmit = (formData) => {
    
    // In a new ticket scenario (C-reate)
    if (isNewTicket.value) {
        const newId = Date.now(); // Simple mock ID generation
        const newTicket = { 
            ...formData, 
            id: newId, 
            dateCreated: new Date().toISOString().substring(0, 10),
        };
        // Add to the mutable store list
        ticketStore.tickets.push(newTicket); 
        
        // Use placeholder alert (needs to be replaced by a proper toast system)
        alert(`New ticket #${newId} created successfully!`);
        
        // Redirect to the newly created ticket's detail page
        router.push(`/tickets/${newId}`);
    } 
    // In an existing ticket scenario (U-pdate)
    else {
        // 🚨 FIXED: Rely on the store action for the array update logic
        ticketStore.saveTicket(formData); 
        
        // Update local view state
        currentTicket.value = formData; 
        isEditing.value = false; // Switch back to View Mode
        
        // Use placeholder alert (needs to be replaced by a proper toast system)
        alert(`Ticket #${formData.id} saved successfully!`);
    }
};

// Watch: Re-run loadTicket when the route parameter changes 
watch(ticketId, loadTicket);

// OnMounted: Run loadTicket when the component is first created
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
  max-width: var(--max-content-width, 1440px); /* Use global width if defined */
  margin: 0 auto;
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
  display: block; 
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
  white-space: pre-wrap;
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

/* Use color rules from the blueprint: open (green), in_progress (amber), closed (gray) */
.status-open { background-color: #10b981; } /* Green tone */
.status-in-progress { background-color: #f59e0b; } /* Amber tone */
.status-closed { background-color: #9ca3af; } /* Gray tone */

@media (max-width: 600px) {
    .detail-header {
        flex-direction: column;
        align-items: flex-start;
    }
    .edit-button {
        margin-top: 15px;
    }
}
</style>