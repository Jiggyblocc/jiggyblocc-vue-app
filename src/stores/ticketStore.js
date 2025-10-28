// src/stores/ticketStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import initialTickets from '../data/mockTickets'; 

export const useTicketStore = defineStore('ticket', () => {
  
  const tickets = ref(initialTickets);
  const currentFilter = ref('All'); 

  const filteredTickets = computed(() => {
    if (currentFilter.value === 'All') {
      return tickets.value;
    }
    return tickets.value.filter(ticket => ticket.status === currentFilter.value);
  });
  
  // --- Actions ---
  
  const deleteTicket = (id) => {
    tickets.value = tickets.value.filter(ticket => ticket.id !== id);
  };
  
  const setFilter = (filter) => {
    currentFilter.value = filter;
  };
  
  // 🚨 UPDATED: Completed logic to find and replace the updated ticket 🚨
  const saveTicket = (ticketData) => {
      // Find the index of the ticket we need to update
      const index = tickets.value.findIndex(t => t.id === ticketData.id);

      if (index !== -1) {
          // Replace the old ticket object with the new data to ensure reactivity
          tickets.value[index] = ticketData;
          console.log(`Ticket #${ticketData.id} updated in store.`);
      } 
      // Note: Creation logic (adding new ID) remains in TicketDetailPage
  };

  return { 
    tickets, 
    currentFilter, 
    filteredTickets, 
    deleteTicket, 
    setFilter,
    saveTicket // Ensure this is returned
  };
});