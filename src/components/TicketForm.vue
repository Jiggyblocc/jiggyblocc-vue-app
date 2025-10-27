<script setup>
import { ref, watch, onMounted } from 'vue';
import { TICKET_STATUSES } from '../data/mockTickets';

// 1. Props: Define the inputs the parent component will send
const props = defineProps({
  initialTicket: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      description: '',
      status: TICKET_STATUSES.OPEN,
      priority: 'Low',
      assignedTo: 'Unassigned',
      dateCreated: null,
    }),
  },
  isNew: {
    type: Boolean,
    default: true,
  }
});

// 2. Emits: Define the event the component will fire upon submission
const emit = defineEmits(['submitForm', 'cancel']);

// 3. Form State: Create reactive state for the form inputs
const formTicket = ref({});

// 4. Lifecycle/Watch: Initialize form state and watch for prop changes
const initializeForm = () => {
    // Deep clone the props object to prevent mutating it directly
    formTicket.value = JSON.parse(JSON.stringify(props.initialTicket));
    
    // Ensure the dateCreated is set for new tickets
    if (props.isNew) {
      formTicket.value.dateCreated = new Date().toISOString().substring(0, 10);
      // Give new tickets a temporary ID for tracking before final creation
      formTicket.value.id = Date.now(); 
    }
};

onMounted(initializeForm);

// Watch for changes in the initialTicket prop (e.g., when switching tickets in parent view)
watch(() => props.initialTicket, initializeForm, { deep: true });


// 5. Submission Logic
const handleSubmit = () => {
  // Fire the 'submitForm' event with the final data
  emit('submitForm', formTicket.value);
};

// 6. Hardcoded options (mirroring the dropdowns in React)
const statusOptions = Object.values(TICKET_STATUSES);
const priorityOptions = ['Low', 'Medium', 'High'];
const assigneeOptions = ['Unassigned', 'Alice', 'Bob', 'Charlie'];
</script>

<template>
  <div class="form-card">
    <h2 class="form-title">{{ props.isNew ? 'Create New Ticket' : `Edit Ticket #${formTicket.id}` }}</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="formTicket.title" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="formTicket.description" rows="4" required></textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group half-width">
          <label for="status">Status</label>
          <select id="status" v-model="formTicket.status" required>
            <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
          </select>
        </div>

        <div class="form-group half-width">
          <label for="priority">Priority</label>
          <select id="priority" v-model="formTicket.priority" required>
            <option v-for="priority in priorityOptions" :key="priority" :value="priority">{{ priority }}</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label for="assignedTo">Assigned To</label>
        <select id="assignedTo" v-model="formTicket.assignedTo" required>
          <option v-for="assignee in assigneeOptions" :key="assignee" :value="assignee">{{ assignee }}</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">
          {{ props.isNew ? 'Create Ticket' : 'Save Changes' }}
        </button>
        <button type="button" @click="emit('cancel')" class="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* CSS to ensure identical form styling */
.form-card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
}

.form-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 25px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.half-width {
  flex: 1;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary-color, #3b82f6);
  outline: none;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.submit-button, .cancel-button {
  padding: 10px 20px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button {
  background-color: var(--primary-color, #3b82f6);
  color: white;
}

.submit-button:hover {
  background-color: #2563eb;
}

.cancel-button {
  background-color: #e5e7eb;
  color: #374151;
}

.cancel-button:hover {
  background-color: #d1d5db;
}
</style>