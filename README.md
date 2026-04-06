# Zorvyn Backend

Node.js + Express + MongoDB backend for a simple finance/transactions API with JWT auth and role-based access.

## Tech

- Node.js, Express
- MongoDB + Mongoose
- JWT auth (`Authorization: Bearer <token>`)

## Project layout

- `backend/server.js` – starts the server and connects to MongoDB
- `backend/app.js` – Express app + route mounting
- `backend/routes/*` – API routes
- `backend/models/*` – Mongoose models
- `backend/middleware/*` – auth + role authorization
- `backend/postman/*` – Postman assets

## Prerequisites

- Node.js installed
- MongoDB running locally
  - Default connection used by this project: `mongodb://127.0.0.1:27017/finance-db`

## Setup

From the repo root:

```bash
cd backend
npm install
```

Create your environment file:

```bash
cd backend
copy .env.example .env
```

## Run the server

```bash
cd backend
node server.js
```

Configuration is read from `backend/.env` (with fallbacks if not set).

Required variables:

- `PORT` (default: `3000`)
- `MONGO_URI` (default: `mongodb://127.0.0.1:27017/finance-db`)
- `JWT_SECRET` (default: `SECRET_KEY`)

## Authentication

### JWT secret

JWT signing/verifying uses `JWT_SECRET` from `backend/.env` (fallback: `SECRET_KEY`).

- Token is signed in `backend/controllers/auth.controller.js`
- Token is verified in `backend/middleware/auth.middleware.js`

### Roles

Users have a `role`:

- `viewer`
- `analyst`
- `admin`

Authorization is enforced via `backend/middleware/role.middleware.js`.

## API

Base URL (when running locally): `http://localhost:3000`

### Auth

#### Register

`POST /auth/register`

Body:

```json
{ "name": "Ada", "email": "ada@example.com", "password": "pass123", "role": "viewer" }
```

Notes:

- `role` is optional and only supports `viewer` or `analyst`.
- Admin users are not self-registrable; promote users via the admin-only Users API.
- The implementation returns a safe user payload (no password hash).

#### Login

`POST /auth/login`

Body:

```json
{ "email": "ada@example.com", "password": "pass123" }
```

Response:

```json
{ "token": "<jwt>" }
```

### Users (admin only)

All endpoints below require `Authorization: Bearer <token>` and `admin` role.

- `GET /users` – list users
- `PATCH /users/:id` – update a user

### Transactions (admin + analyst)

All endpoints below require `Authorization: Bearer <token>`.

Role behavior:

- `viewer`: read-only (can list only their own transactions)
- `analyst`: read-only (can list only their own transactions)
- `admin`: full CRUD (can read all transactions)

#### List transactions (paginated)

`GET /transactions`

Query params:

- `page` (number, default `1`)
- `type` (`income` | `expense`)
- `category` (string)
- `startDate` (date string; converted with `new Date(startDate)`)
- `endDate` (date string; converted with `new Date(endDate)`)

Pagination behavior:

- `limit = 10`
- `skip = (page - 1) * 10`

Example:

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/transactions?page=2&type=expense&startDate=2026-01-01&endDate=2026-12-31"
```

#### Create transaction

`POST /transactions`

Body (example):

```json
{
  "amount": 25.5,
  "type": "expense",
  "category": "food",
  "date": "2026-04-06",
  "note": "lunch"
}
```

The server also attaches `userId` from the authenticated user (`req.user.id`).

#### Update transaction

`PATCH /transactions/:id`

- `admin` can update any transaction
- `analyst` can only update their own transactions (`transaction.userId === req.user.id`)

#### Delete transaction

`DELETE /transactions/:id`

- `admin` can delete any transaction
- `analyst` can only delete their own transactions

### Summary

All endpoints below require `Authorization: Bearer <token>`.

- `GET /summary` (`admin`, `analyst`, `viewer`) – returns income/expense totals and balance
- `GET /summary/recent` (`admin`, `analyst`, `viewer`) – recent transactions (default `limit=5`)
- `GET /summary/category` (`admin`, `analyst`, `viewer`) – totals grouped by `category` (supports `startDate`/`endDate`)
- `GET /summary/trends` (`admin`, `analyst`, `viewer`) – totals grouped by `interval=month|week` (supports `startDate`/`endDate`)

Data visibility:

- `admin` sees system-wide totals
- non-admin users see only their own transactions in summaries

Useful query params:

- `GET /summary?startDate=2026-01-01&endDate=2026-12-31`
- `GET /summary/trends?interval=week`
- `GET /summary/recent?limit=10`

## Postman

Postman assets live under `backend/postman/` (collections, environments, flows, etc.).

## Common issues

- **MongoDB connection fails**: ensure MongoDB is running and reachable at `127.0.0.1:27017`.
- **401 Unauthorized**: send `Authorization: Bearer <token>` header.
- **403 Forbidden**: your user `role` is not allowed for that endpoint.
