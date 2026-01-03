# Agency Portal

Representative demo project for a Frontend (React) position.

## Stack
- React (hooks, functional components)
- React Router (nested layouts, protected routes)
- Redux Toolkit + RTK Query (state + API caching)
- Tailwind CSS (fast pixel-perfect UI work)
- Backend demo: Express + optional MongoDB (Mongoose)

## Features
- Auth flow (JWT) + route guarding
- Projects: list + search + status filter + pagination
- Project details: status update (mutation + cache invalidation) + tasks list
- Clients list
- Responsive layout (mobile sidebar)
- Basic test (Vitest + Testing Library)

## Run (recommended: 2 terminals)

### 1) Backend

Option A — memory mode (no MongoDB needed):

```bash
cd backend
npm i
npm run dev
```

Option B — MongoDB (Docker):

```bash
cd ..
docker compose up -d mongo
cd backend
cp .env.example .env
npm i
npm run seed
npm run dev
```

Backend runs on http://localhost:4000

### 2) Frontend

```bash
cd frontend
npm i
cp .env.example .env
npm run dev
```

Frontend runs on http://localhost:5173

Demo credentials (prefilled on login screen):
- email: demo@agency.com
- password: demo

## Notes for “pixel-perfect”
- Use Tailwind + small reusable UI components (`src/components/ui`).
- Keep spacing in 4px/8px increments and compare with Figma at 100% zoom.
- Prefer CSS tokens (colors, radius, shadows) in one place.
- Project details: tasks + status update (invalidates cached queries)
- Clients list
- Mobile-first responsive layout (collapsible sidebar)
- Basic test (Vitest + React Testing Library)

## Run (without MongoDB)
This works in *memory mode* out of the box.

### Backend
```bash
cd backend
npm i
npm run dev
```
API will run on `http://localhost:4000`.

### Frontend
```bash
cd frontend
npm i
npm run dev
```
Open `http://localhost:5173`.

Demo credentials are prefilled:
- email: `demo@agency.com`
- password: `demo`

## Run with MongoDB (optional)
From the repo root:
```bash
docker compose up -d
```
Then:
```bash
cd backend
cp .env.example .env
npm i
npm run seed
npm run dev
```

## Notes for a hiring manager
- RTK Query shows real API integration: caching, tags, invalidation.
- Layout uses nested routes + layouts in Router.
- Tailwind makes pixel-perfect work from Figma fast (tokens/components can be extracted).
## Run with MongoDB (optional)

### 1) Start Mongo
From repo root:
```bash
docker compose up -d
```

### 2) Configure backend
Create `backend/.env`:
```bash
MONGO_URL=mongodb://localhost:27017/agency_portal
JWT_SECRET=dev_secret
PORT=4000
```

### 3) Seed demo data
```bash
cd backend
npm i
npm run seed
npm run dev
```

Frontend can point to the same API:
`frontend/.env`:
```bash
VITE_API_URL=http://localhost:4000/api
```

## Demo credentials
- Email: `demo@agency.com`
- Password: `demo`

## What to show in an interview
- Router structure (`AuthLayout` + `AppLayout` + `RequireAuth`)
- RTK Query tags + invalidation (`projects`, `projectById`, `updateProjectStatus`)
- Responsive layout (mobile sidebar overlay)
- Form validation (React Hook Form + Zod)
- Pixel-perfect workflow: Tailwind tokens + reusable UI components
## Demo credentials
- Email: `demo@agency.com`
- Password: `demo`

## Why this is “employer-ready”
- Clear project structure (features, pages, shared UI)
- RTK Query patterns: tags, invalidation, caching
- Router patterns: layouts + protected area
- Responsive UI and reusable components (Button, Input, Card)
- API integration and MongoDB story (Express + Mongoose)

## Next steps (easy upgrades)
- Add optimistic updates for status changes
- Add editable tasks (toggle done) with PATCH endpoint
- Add MSW to mock API in frontend tests
- Add Storybook for pixel-perfect components
