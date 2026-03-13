# hnglearn-14-api

## Overview

This is a simple RESTful API for managing users, built with Express.js. It uses a file-based storage system for persistence and includes basic CRUD operations for user management.

## Features

- User CRUD (Create, Read, Update, Delete)
- File-based storage (JSON files)
- Input validation with Zod
- Pagination support for user listing

## Project Structure

```
src/
	controllers/
		user/
			user.controller.js
	repository/
		filestore/
			filestore.repository.js
			data/
				last.json
				users.json
	routes/
		user.route.js
	schema/
		schema.js
	services/
		user/
			user.service.js
	utils/
		pagination.js
index.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
# or
npm install
```

### Running the Server

```bash
pnpm start
# or
npm start
# Server runs on http://localhost:3000
```

## API Endpoints

### Base URL

`http://localhost:3000`

### User Routes

- `GET /users` — List all users (supports `?q`, `page`, `limit` query params)
- `GET /users/:id` — Get user by ID
- `POST /users` — Create a new user
  - Body: `{ "name": string, "email": string }`
- `PUT /users/:id` — Update user by ID
  - Body: `{ "name"?: string, "email"?: string }`
- `DELETE /users/:id` — Delete user by ID

## Data Storage

- User data is stored in `src/repository/filestore/data/users.json`.
- The last used user ID is tracked in `src/repository/filestore/data/last.json`.

## Validation

- Input validation is handled using Zod schemas in `src/schema/schema.js`.

## License

ISC
