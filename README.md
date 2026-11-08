# Notes REST API

An Express 5 and Mongoose notes API demonstrating CRUD operations backed by MongoDB.

## Setup

Use Node.js 20.19 or newer and a local or hosted MongoDB database.

```bash
git clone https://github.com/RynTrq/A-Basic-RESTful-server.git
cd A-Basic-RESTful-server
npm ci
export MONGO_URI='mongodb://127.0.0.1:27017/notes'
npm start
```

PowerShell users can set `$env:MONGO_URI="mongodb://127.0.0.1:27017/notes"` instead. The server uses port 3005 by default; set `PORT` to override it.

`.env.example` documents configuration. The application reads environment variables directly; it does not automatically load a `.env` file.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/notes` | Create a note |
| GET | `/notes` | List notes |
| PATCH | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

Example:

```bash
curl -X POST http://localhost:3005/notes -H 'Content-Type: application/json' -d '{"title":"Review","description":"Read the source"}'
```

## Structure

- `server.js` — database connection and server startup.
- `src/app.js` — Express routes.
- `src/db/db.js` — environment-based MongoDB connection.
- `src/models/note.model.js` — note schema.

## Scope

This is an educational API. Authentication, comprehensive request validation, pagination, and integration tests are not included. Run it locally while developing those features.

Never commit database credentials. Any credential previously committed to Git must be revoked or rotated; deleting it from the current source does not remove it from history.

[Portfolio](https://ryntrq.vercel.app) · [GitHub](https://github.com/RynTrq)
