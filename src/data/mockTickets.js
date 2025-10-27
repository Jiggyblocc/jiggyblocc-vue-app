// src/data/mockTickets.js
export const TICKET_STATUSES = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  CLOSED: 'Closed',
};

const mockTickets = [
  // --- 5 OPEN Tickets ---
  { id: 1, title: "Database connection failing after update", description: "The primary database fails to connect post-patch.", status: TICKET_STATUSES.OPEN, priority: 'High', assignedTo: 'Alice', dateCreated: '2025-01-15' },
  { id: 2, title: "Login button intermittently non-responsive", description: "Users reporting issues submitting the login form.", status: TICKET_STATUSES.OPEN, priority: 'Medium', assignedTo: 'Bob', dateCreated: '2025-01-16' },
  { id: 3, title: "Typo on landing page header", description: "The word 'Tickets' is misspelled on the hero section.", status: TICKET_STATUSES.OPEN, priority: 'Low', assignedTo: 'Unassigned', dateCreated: '2025-01-17' },
  { id: 4, title: "API latency spiking during peak hours", description: "Need to investigate server load during noon.", status: TICKET_STATUSES.OPEN, priority: 'High', assignedTo: 'Charlie', dateCreated: '2025-01-18' },
  { id: 5, title: "Need to update footer copyright year", description: "Change copyright year to 2026.", status: TICKET_STATUSES.OPEN, priority: 'Low', assignedTo: 'Alice', dateCreated: '2025-01-19' },

  // --- 5 IN PROGRESS Tickets ---
  { id: 6, title: "Implement dark mode feature toggle", description: "Working on the CSS for the new dark theme.", status: TICKET_STATUSES.IN_PROGRESS, priority: 'Medium', assignedTo: 'Bob', dateCreated: '2025-01-20' },
  { id: 7, title: "Refactor ticket filtering logic", description: "Currently optimizing the store getters for better performance.", status: TICKET_STATUSES.IN_PROGRESS, priority: 'High', assignedTo: 'Charlie', dateCreated: '2025-01-21' },
  { id: 8, title: "Add file upload capability to form", description: "Integrating cloud storage API for attachments.", status: TICKET_STATUSES.IN_PROGRESS, priority: 'Medium', assignedTo: 'Alice', dateCreated: '2025-01-22' },
  { id: 9, title: "Update README documentation for deployment", description: "Adding Vercel instructions to the docs.", status: TICKET_STATUSES.IN_PROGRESS, priority: 'Low', assignedTo: 'Bob', dateCreated: '2025-01-23' },
  { id: 10, title: "Design review for new dashboard icons", description: "Waiting for final icon set approval from design team.", status: TICKET_STATUSES.IN_PROGRESS, priority: 'Low', assignedTo: 'Unassigned', dateCreated: '2025-01-24' },

  // --- 5 CLOSED Tickets ---
  { id: 11, title: "Initial project setup completed", description: "Vite, Vue, and Pinia installed and configured.", status: TICKET_STATUSES.CLOSED, priority: 'Low', assignedTo: 'Alice', dateCreated: '2025-01-25' },
  { id: 12, title: "Auth system implemented and tested", description: "Login/Logout and route protection verified.", status: TICKET_STATUSES.CLOSED, priority: 'Medium', assignedTo: 'Charlie', dateCreated: '2025-01-26' },
  { id: 13, title: "Initial dashboard page built", description: "Summary statistics display verified.", status: TICKET_STATUSES.CLOSED, priority: 'Medium', assignedTo: 'Bob', dateCreated: '2025-01-27' },
  { id: 14, title: "Fixed CSS grid layout issue", description: "Resolved minor bug in card spacing on mobile.", status: TICKET_STATUSES.CLOSED, priority: 'Low', assignedTo: 'Alice', dateCreated: '2025-01-28' },
  { id: 15, title: "Ticket list table finalized", description: "Filtering and deletion functionality working.", status: TICKET_STATUSES.CLOSED, priority: 'Medium', assignedTo: 'Charlie', dateCreated: '2025-01-29' },
];

export default mockTickets;