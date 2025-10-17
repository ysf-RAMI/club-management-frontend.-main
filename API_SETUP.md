# Club Management Frontend - API Setup

## Current Status
The application is now configured to use API endpoints with fallback to local data. Currently, it will try to connect to API endpoints and fall back to the local `data.json` file if the API is not available.

## API Endpoints Required

The following API endpoints need to be implemented:

### Clubs
- `GET /api/clubs` - Get all clubs
- `GET /api/clubs/:id` - Get club by ID
- `POST /api/clubs` - Create new club
- `PUT /api/clubs/:id` - Update club
- `DELETE /api/clubs/:id` - Delete club

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Quick API Setup Options

### Option 1: JSON Server (Recommended for Development)
```bash
# Install JSON Server globally
npm install -g json-server

# Run JSON Server with the data.json file
json-server --watch data.json --port 3001

# The API will be available at http://localhost:3001
```

### Option 2: Express.js Server
Create a simple Express.js server using the example code in `src/config/api.js`

### Option 3: Use Existing Backend
If you have an existing backend, update the `API_BASE_URL` in `src/config/api.js` to point to your backend URL.

## Current Behavior

1. **With API Available**: The app will fetch data from the API endpoints
2. **Without API**: The app will automatically fall back to the local `data.json` file
3. **Error Handling**: Proper error handling with console warnings when API is not available

## Configuration

The API base URL is configured in `src/config/api.js`:
- Development: `http://localhost:3001`
- Production: Update to your production API URL

## Data Structure

The application expects the following data structure from the API:

```json
{
  "clubs": [
    {
      "id": 1,
      "name": "Club Name",
      "description": "Club description",
      "image": "image_url",
      "categorie": "category",
      "maxMembrs": 50,
      "created_by": 1,
      "created_at": "2024-01-20T10:00:00Z",
      "updated_at": "2024-01-20T10:00:00Z"
    }
  ],
  "events": [
    {
      "id": 1,
      "club_id": 1,
      "title": "Event Title",
      "description": "Event description",
      "date": "2024-02-15T18:00:00Z",
      "location": "Event location",
      "image": "image_url",
      "max_participants": 30,
      "created_by": 1,
      "created_at": "2024-01-28T10:00:00Z",
      "updated_at": "2024-01-28T10:00:00Z"
    }
  ]
}
```

## Testing the API

Once you have an API running, you can test it by:

1. Starting your API server
2. Running the frontend application
3. Checking the browser console for API calls
4. The app should now fetch data from the API instead of the fallback

## Troubleshooting

- **404 Errors**: Make sure your API server is running and the endpoints are correctly implemented
- **CORS Issues**: Ensure your API server has CORS enabled for the frontend domain
- **Data Format**: Verify that your API returns data in the expected format
- **Fallback**: If API is not available, the app will automatically use local data
