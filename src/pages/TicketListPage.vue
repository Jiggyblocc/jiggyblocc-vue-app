<script setup>
import { useTicketStore } from '../stores/ticketStore';
import { TICKET_STATUSES } from '../data/mockTickets';
import { useRouter } from 'vue-router';

const router = useRouter();
const ticketStore = useTicketStore();

// Define the filter options based on the mock data constants
const filterOptions = ['All', ...Object.values(TICKET_STATUSES)];

// Function to handle viewing/editing a ticket (U in CRUD)
const viewTicketDetail = (id) => {
  router.push(`/tickets/${id}`);
};
</script>

<template>
  <div class="ticket-list-container">
    <div class="header-and-filters">
      <h1 class="page-title">Ticket Management List</h1>
      <button @click="router.push('/tickets/new')" class="new-ticket-button">
        + Create New Ticket
      </button>
    </div>

    <div class="filter-bar">
      <button
        v-for="filter in filterOptions"
        :key="filter"
        @click="ticketStore.setFilter(filter)"
        :class="['filter-button', { active: ticketStore.currentFilter === filter }]"
      >
        {{ filter }} ({{ ticketStore.tickets.filter(t => filter === 'All' || t.status === filter).length }})
      </button>
    </div>

    <div class="ticket-table-wrapper">
      <table class="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in ticketStore.filteredTickets" :key="ticket.id">
            <td>{{ ticket.id }}</td>
            <td class="ticket-title-cell" @click="viewTicketDetail(ticket.id)">
              {{ ticket.title }}
            </td>
            <td>
              <span :class="['status-badge', `status-${ticket.status.toLowerCase().replace(' ', '-')}`]">
                {{ ticket.status }}
              </span>
            </td>
            <td>{{ ticket.priority }}</td>
            <td>{{ ticket.assignedTo }}</td>
            <td>
              <button @click="ticketStore.deleteTicket(ticket.id)" class="action-delete">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!ticketStore.filteredTickets.length" class="no-results">
        No tickets match the current filter.
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS to perfectly mirror the table, filter bar, and status badges */
.ticket-list-container {
  padding: 40px 20px;
}

.header-and-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1f2937;
}

.new-ticket-button {
  background-color: var(--primary-color, #3b82f6);
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.new-ticket-button:hover {
  background-color: #2563eb;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
}

.filter-button {
  background: none;
  border: none;
  padding: 8px 15px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  transition: color 0.2s;
  border-bottom: 3px solid transparent;
}

.filter-button:hover {
  color: #1f2937;
}

.filter-button.active {
  color: var(--primary-color, #3b82f6);
  border-bottom: 3px solid var(--primary-color, #3b82f6);
}

/* Table Styling */
.ticket-table-wrapper {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

.ticket-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.ticket-table thead th {
  text-align: left;
  padding: 15px;
  background-color: #f9fafb;
  color: #4b5563;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.ticket-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
}

.ticket-table tbody tr:hover {
  background-color: #f9fafb;
}

.ticket-table tbody td {
  padding: 15px;
  color: #374151;
}

/* Specific Cell Styling */
.ticket-title-cell {
  font-weight: 600;
  color: var(--primary-color, #3b82f6);
  cursor: pointer;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ticket-title-cell:hover {
  text-decoration: underline;
}

/* Status Badge Styling (Mirrors React's distinct status colors) */
.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

.status-open { background-color: #ef4444; } /* Red */
.status-in-progress { background-color: #f59e0b; } /* Yellow/Orange */
.status-closed { background-color: #10b981; } /* Green */

/* Delete Action Button */
.action-delete {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.action-delete:hover {
  background-color: #fee2e2;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-size: 1.1rem;
}
</style>