# CV Generator Application

## Overview

This is a full-stack web application for generating professional CVs/resumes with a freemium business model. Users can create up to 2 CVs for free, with additional CVs requiring payment through PayPal integration. The application features a modern, responsive UI with a professional resume display template and a CV generator form.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, chosen for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (alternative to React Router, smaller bundle size)
- **TanStack Query (React Query)** for server state management, caching, and API request handling

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives (accessible, unstyled components)
- **Tailwind CSS v4** for utility-first styling with custom theme configuration
- **Class Variance Authority (CVA)** for managing component variants
- **Framer Motion** for animations and transitions (note: package.json indicates this was removed as a dependency but still used in components)

**Form Management**
- **React Hook Form** for performant form state management
- **Zod** for schema validation with `@hookform/resolvers` integration
- Form validation schemas shared between client and server via the `shared` directory

**Design Decisions**
- Component aliasing configured in `tsconfig.json` and `vite.config.ts` for clean imports (`@/`, `@shared/`, `@assets/`)
- Custom Vite plugin (`vite-plugin-meta-images`) for dynamic Open Graph image URL generation based on Replit deployment domain
- Development-only plugins (Replit cartographer and dev banner) conditionally loaded

### Backend Architecture

**Server Framework**
- **Express.js** as the web server framework
- Dual server entry points: `index-dev.ts` (development with Vite middleware) and `index-prod.ts` (production serving static files)
- Custom logging middleware for request/response tracking
- Raw body capture for webhook verification (PayPal integration)

**Development vs Production**
- Development: Vite dev server integrated as Express middleware with HMR support
- Production: Serves pre-built static assets from `dist/public` directory
- Build process: Client bundled with Vite, server bundled with esbuild

**API Design**
- RESTful API endpoints under `/api` prefix
- User management endpoints for email-based user lookup and creation
- CV creation endpoint with business logic for free tier limits (2 CVs max without payment)
- PayPal integration endpoints (`/setup`, `/order`, `/order/:orderID/capture`) isolated from main API

### Data Storage

**Database Solution**
- **PostgreSQL** via Neon serverless driver with WebSocket support
- **Drizzle ORM** for type-safe database queries and migrations
- Connection pooling configured for serverless environments

**Schema Design**
- `users` table: email-based identification, CV count tracking, payment status flag
- `cvs` table: stores CV data (name, role, contact info, summary) linked to users via foreign key
- UUID primary keys with automatic generation via PostgreSQL `gen_random_uuid()`
- Timestamps for audit trails (`createdAt`)

**Type Safety**
- Drizzle Zod integration for automatic schema-to-Zod conversion
- Shared type definitions between client and server via `shared/schema.ts`
- Insert schemas omit auto-generated fields (id, timestamps)

**Storage Layer Abstraction**
- `IStorage` interface defines contract for data operations
- `DatabaseStorage` implements the interface, enabling future storage backend swaps
- Methods: user CRUD, CV CRUD, payment status updates, CV count incrementation

### Authentication & Authorization

**Current State**
- Email-based user identification without password authentication
- No session management or authentication tokens implemented
- User creation happens automatically on first access via email

**Business Logic Enforcement**
- CV creation limited to 2 for non-paying users
- Payment status (`hasPaid`) flag bypasses CV count restrictions
- Server-side validation prevents unauthorized CV creation

### External Dependencies

**Payment Processing**
- **PayPal Server SDK** (`@paypal/paypal-server-sdk`) for payment integration
- Critical code sections marked as "DO NOT MODIFY" to maintain PayPal functionality
- Environment-based configuration (sandbox for development, production for live)
- OAuth client credentials authentication
- Order creation and capture workflow implemented

**Development Tools**
- **Replit-specific plugins**: runtime error modal, cartographer (code mapping), dev banner
- Custom meta image plugin for dynamic Open Graph tags on Replit deployments

**Database Hosting**
- Neon serverless PostgreSQL with WebSocket support for low-latency connections
- Environment variable `DATABASE_URL` required for database connection

**UI Icons**
- **Lucide React** as the icon library (configured in `components.json`)

**Fonts**
- Google Fonts: Inter (sans-serif), Libre Baskerville (serif) for professional typography
- Loaded via CDN in `client/index.html`

### Configuration Management

**Environment Variables**
- `DATABASE_URL`: PostgreSQL connection string (required)
- `PAYPAL_CLIENT_ID`: PayPal OAuth client ID (required)
- `PAYPAL_CLIENT_SECRET`: PayPal OAuth secret (required)
- `NODE_ENV`: Environment flag (development/production)
- `REPL_ID`: Replit deployment identifier (optional, affects plugin loading)

**Build Configuration**
- TypeScript with strict mode enabled
- Module resolution: bundler mode for modern imports
- ESNext target with DOM libraries
- Path aliases for clean imports across client, shared, and server code