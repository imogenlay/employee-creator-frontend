# Employee Creator - Frontend

## Purpose

This application is a TypeScript React frontend for a full-stack employee management tool. It communicates with a Spring Boot backend API to provide a clean, interactive interface for managing employees and their contracts. The application also features an AI-powered chat interface, allowing users to query employee data conversationally through a Claude-powered agent.

---

## Build Steps

### Prerequisites

- Node.js 18+
- npm or yarn

### Running the Application

1. Clone the repository:

```bash
   git clone https://github.com/imogenlay/employee-creator-frontend.git
   cd employee-creator-frontend
```

2. Install dependencies:

```bash
   npm install
```

3. Configure your API base URL in your `.env` file:

```env
   VITE_API_BASE_URL=http://localhost:8080
```

4. Start the development server:

```bash
   npm run dev
```

The application will start on `http://localhost:5173` by default.

---

## Pages

### Employee Search

The landing page of the application. Users can search for employees by name using the search bar. Results are displayed and sorted alphabetically or reverse alphabetically, providing quick access to individual employee profiles.

### Employee Profile

A read-only view of a single employee's details, including their personal information, role, employment status, and associated contract. Provides navigation to edit/delete the employee.

### Create Employee

A form-based page for registering a new employee in the system. Captures all required personal and employment details and submits them to the backend API on completion.

### Edit Employee

Mirrors the Create Employee page but pre-populates fields with the selected employee's existing data. Allows users to update any details and persist the changes to the database.

### Create / Edit Contract

A dedicated page for creating a new contract or editing an existing one. Handles contract-specific names and some other details.

### AI Agent Chat

An interactive chat interface powered by a Claude AI agent. Users can ask natural language questions about employees and contracts, with the agent querying the backend on their behalf and returning conversational responses.

---

## Future Goals

- Employee Calendar - a visual calendar view to track and manage employee assignments and scheduling over time
