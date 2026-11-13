# RightTrack

A mobile-responsive personal finance dashboard that turns receipt photos into spending records and helps users track budgets over time.

**Live demo:** [righttrack.vercel.app](https://righttrack.vercel.app)

## Features

- Email/password and Google sign-in
- Receipt upload and extraction through Mindee
- Spending creation, editing, deletion, filtering, and summaries
- Budget goals with progress visualisations
- Three-month spending history
- Responsive React interface

## Architecture

RightTrack is split into two applications:

- `client/`: React, Vite, Redux Toolkit, React Router, Recharts, and Tailwind CSS
- `server/`: Express, PostgreSQL, Sequelize, JWT authentication, Cloudinary, and Mindee

The receipt flow uploads an image to the API, stores it through Cloudinary, sends the stored image to Mindee for extraction, and lets the user review the resulting spending data. Receipt images therefore leave the local device and are processed by third-party services.

## Run locally

Requirements:

- Node.js 20+
- PostgreSQL
- Cloudinary and Mindee credentials for receipt scanning
- A Google OAuth client ID for Google sign-in (set your own for local Google sign-in; the hosted demo's ID is the fallback)

### API

```sh
cd server
cp env_template.txt .env
npm ci
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npm start
```

The development database defaults are documented in `server/config/config.json`. For production, set `DATABASE_URL`.

### Web client

```sh
cd client
cp .env.example .env.local
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Environment variables

Client:

```dotenv
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Server variables are listed in `server/env_template.txt`. Never commit real credentials or production connection strings.

## Quality checks

```sh
cd client
npm run lint
npm run build
```

The server also contains Jest and Supertest integration tests. They require the PostgreSQL test database to be created and migrated before running `npm test`.

## Project status

I built RightTrack on my own in four days, client and server. It demonstrates an end-to-end product flow; it is not financial advice or accounting software.
