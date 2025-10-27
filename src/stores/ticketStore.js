// src/stores/ticketStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import initialTickets from '../data/mockTickets'; // Import the static mock data

export const useTicketStore = defineStore('ticket', () => {
  // --- State (The mutable list of tickets, like React's useState) ---
  const tickets = ref(initialTickets);
  const currentFilter = ref('All'); // State for the active filter button

  // --- Getters (The computed properties for filtering) ---
  const filteredTickets = computed(() => {
    if (currentFilter.value === 'All') {
      return tickets.value;
    }
    // Filter the list based on the active status
    return tickets.value.filter(ticket => ticket.status === currentFilter.value);
  });
  
  // --- Actions (The CRUD operations) ---
  
  // Translates the state-updating logic for deletion (D in CRUD)
  const deleteTicket = (id) => {
    // Overwrite the tickets array, keeping only those that don't match the ID
    tickets.value = tickets.value.filter(ticket => ticket.id !== id);
  };
  
  // Action to change the filter state
  const setFilter = (filter) => {
    currentFilter.value = filter;
  };
  
  // Action to add or update a ticket (Placeholder for now)
  const saveTicket = (ticketData) => {
      // In the U/C step, this will handle finding and updating/adding a ticket
      // For now, we'll just log
      console.log('Ticket Save/Update simulated:', ticketData);
  };

  return { 
    tickets, 
    currentFilter, 
    filteredTickets, 
    deleteTicket, 
    setFilter,
    saveTicket
  };
});