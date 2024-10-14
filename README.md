# Fullstack solid setup

## Project Setup

This repository provides a **common project setup** for web apps using **Vue/React**, **Node.js**, and essential tools for frontend and backend development, testing, and automation.

## Technologies

-   **Vue/React**: Popular frontend frameworks for building user interfaces.
-   **Vite**: Fast build tool for modern web development with support for hot module replacement.
-   **TypeScript**: Superset of JavaScript providing static typing for better code quality.
-   **Tailwind CSS**: Utility-first CSS framework for quickly styling components.
-   **Service Worker**: Enables background tasks and improves performance in Progressive Web Apps (PWA).

-   **Node.js**: JavaScript runtime for building scalable backend services.
-   **MySQL**: Relational database used for storing and managing data.
-   **Jest**: Testing framework for unit and integration tests in Node.js.

-   **Lerna**: Monorepo tool to manage multiple projects and dependencies.
-   **Prettier**: Code formatter that ensures consistent coding styles.
-   **ESLint**: Linter for identifying and fixing code quality issues.
-   **JSCPD**: Tool for detecting duplicate code across the codebase.

-   **Cypress**: Component and End-to-end testing framework for frontend applications.
-   **Jest**: Used in backend services for unit and integration testing.

-   **Vite Plugins**: Added for optimizing PWA features and removing unnecessary test case IDs in production builds.

-   **Error/Security Middlewares**: Handles error responses, security measures, and logs access/errors for auditing.

## Installation

1. Install dependencies:

    ```bash
    npm install
    lerna bootstrap
    ```

2. Run backend migrations:

    ```bash
    lerna run migrate --stream --scope=backend
    ```

3. Create a `.env` file with database, port, and API key info.

## Development Workflow

-   Start the frontend and backend:
    ```bash
    lerna run dev --stream --scope=frontend --scope=backend
    ```
-   Run tests:
    ```bash
    lerna run test --stream --scope=backend
    lerna run cy:chrome --stream --scope=frontend -- --component

    # Need to run the app before end to end test
    lerna run cy:chrome --stream --scope=frontend -- --e2e
    ```

## Scripts

-   **Start Development**: `lerna run dev --stream --scope=frontend --scope=backend`
-   **Backend Migrations**: `lerna run migrate --stream --scope=backend`
-   **Run Cypress Tests**: `lerna run cy:chrome --stream --scope=frontend`
-   **Lint & Format**: `npm run lint` / `npm run format`

## Deployment

1. **Build**:

    ```bash
    lerna run build --stream --scope=frontend --scope=backend
    ```

2. **Deploy**:

    ```bash
    # Frontend
    pm2 serve FOLDER_NAME PORT --name APP_NAME --spa

    # Backend
    pm2 start INITIAL_FILE --name APP_NAME
    ```

3. **Nginx** configuration:

    ```nginx
    server {
        listen 80;
        server_name yourdomain.com;

        location / {
            root /var/www/frontend;
            try_files $uri /index.html;
        }

        location /api/ {
            proxy_pass http://localhost:3000/;
        }
    }
    ```
