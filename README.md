# EventHub

A React app to explore live events from the Ticketmaster API, register for them, and manage your registrations.

## Features
- Register, login, logout (saved in localStorage)
- Browse, search and filter events by keyword, city, date and category
- Event details page
- Register for events and cancel registrations
- My Events page with upcoming and completed events

## Tech Stack
React, Redux Toolkit, React Router, Tailwind CSS, Vite

## Setup

1. Clone and install:
```bash
   git clone https://github.com/Abdul-Rehman474/event-management-system.git
   cd event-management-system
   npm install
```

2. Create a `.env` file (copy `.env.example`) and add your Ticketmaster API key:
```
   VITE_TICKETMASTER_API_KEY=your_api_key_here
```
   Get a free key at https://developer.ticketmaster.com/

3. Run:
```bash
   npm run dev
```
   Open http://localhost:5173

## Note
Login is a frontend-only simulation using localStorage, so it is not secure for real use.