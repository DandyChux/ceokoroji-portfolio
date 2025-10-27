# Chukwuma Okoroji Portfolio - Refactored

A modern portfolio website built with Svelte + Bun (frontend) and Rust + Actix-web (backend).

## Tech Stack

### Frontend
- **Framework**: Svelte 5 (with svelte-spa-router)
- **Runtime**: Bun
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Build Tool**: Vite

### Backend
- **Language**: Rust
- **Framework**: Actix-web
- **Database**: PostgreSQL with SQLx
- **Email**: SendGrid (via lettre)

## Setup Instructions

### Prerequisites
- **Rust**: 1.70 or higher
- **Bun**: 1.0 or higher  
- **PostgreSQL**: 14 or higher
- **SendGrid API Key**: For contact form emails

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure your `.env` file with:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `BIND_ADDRESS`: Server address (default: 127.0.0.1:8080)

4. Build and run the backend:
   ```bash
   cargo run
   ```

The backend will start on `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

The frontend will start on `http://localhost:5173`.

4. For production build:
   ```bash
   bun run build
   ```

The built files will be in the `dist/` directory.

## API Endpoints

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a specific post by ID
- `POST /api/posts` - Create a new post
- `POST /api/contact` - Send contact form email

## Features

- ✅ Client-side routing with svelte-spa-router
- ✅ Type-safe API with TypeScript and Rust
- ✅ Contact form with email integration
- ✅ Blog post management
- ✅ Project showcase
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode support

## Architecture

The frontend is a **single-page application (SPA)** built with plain Svelte 5 and Vite, without SvelteKit. This provides a clean separation between the frontend and backend:

- **Frontend**: Handles UI and client-side routing
- **Backend**: Rust API server handles all data and business logic

This architecture makes it easy to deploy the frontend as static files and the backend as a standalone service.

## License

Private portfolio project © 2025 Chukwuma Okoroji
