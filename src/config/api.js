// API Configuration
// This file shows how to set up API endpoints for the club management system

// Example API endpoints that should be implemented:
/*
GET /api/clubs - Get all clubs
GET /api/clubs/:id - Get club by ID
POST /api/clubs - Create new club
PUT /api/clubs/:id - Update club
DELETE /api/clubs/:id - Delete club

GET /api/events - Get all events
GET /api/events/:id - Get event by ID
POST /api/events - Create new event
PUT /api/events/:id - Update event
DELETE /api/events/:id - Delete event

GET /api/users - Get all users
GET /api/users/:id - Get user by ID
POST /api/users - Create new user
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user

GET /api/announcements - Get all announcements
POST /api/announcements - Create new announcement
*/

// For development, you can use JSON Server:
// npm install -g json-server
// json-server --watch data.json --port 3001

// Or create a simple Express.js server:
/*
const express = require('express');
const cors = require('cors');
const data = require('./data.json');

const app = express();
app.use(cors());
app.use(express.json());

// Clubs endpoints
app.get('/api/clubs', (req, res) => {
  res.json(data.clubs);
});

app.get('/api/clubs/:id', (req, res) => {
  const club = data.clubs.find(c => c.id === parseInt(req.params.id));
  if (!club) return res.status(404).json({ error: 'Club not found' });
  res.json(club);
});

// Events endpoints
app.get('/api/events', (req, res) => {
  res.json(data.events);
});

app.get('/api/events/:id', (req, res) => {
  const event = data.events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
});

app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});
*/



// Prefer using a Vite environment variable so the app can use the dev server proxy
// Set VITE_API_BASE_URL to a full backend URL in production, or leave empty for
// development so requests are made to relative paths (e.g. `/api/clubs`) and
// Vite's proxy (configured in vite.config.js) will forward them to the backend.
// Example in .env: VITE_API_BASE_URL=https://api.example.com
export const API_BASE_URL = 'https://living-heddi-cmsbackend-6f6751c2.koyeb.app/'
