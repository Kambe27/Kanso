# Kanso - Minimalist Task Manager

Kanso is a sleek, minimalist To-Do application built to demonstrate full-stack capabilities using React, Tailwind CSS, Apollo Client, Node.js, and GraphQL. The application employs a high-contrast dark theme to maintain focus and simplicity, true to its namesake (Kanso: the Zen philosophy of simplicity).

## Live Deployment

* Frontend Deployment: [Insert your Vercel Link Here]
* Note: The frontend is configured to communicate with the local GraphQL backend. Please run the backend locally to test full functionality.

## How It Works

This application was built specifically for an assessment, emphasizing rapid prototyping over production-ready persistence.

* Authentication (Dummy Data): The app features a mock authentication system. When a user submits an email and password, the Apollo Server generates a simulated Base64 token. This token is passed back to the frontend and stored in `localStorage` to persist the session and authorize subsequent GraphQL requests.
* Database (In-Memory): To satisfy the rapid-prototyping constraints, the backend utilizes an in-memory array to store To-Do items. CRUD operations (Create, Read, Update, Delete) mutate this array directly. Restarting the backend server will reset the data to its default state.
* State Management: Apollo Client manages the frontend data cache. Mutations utilizing `refetchQueries` and ID-based cache updates ensure the UI stays perfectly synchronized with the backend without requiring manual React state management for the task list.

## Repository Structure

* `/kanso-web`: React frontend (Vite, Tailwind CSS v4, Apollo Client).
* `/kanso-backend`: Node.js backend (Apollo Server v4, GraphQL, In-Memory DB).

## Technology Stack

* Frontend: React, Vite, Tailwind CSS v4, `@apollo/client`, `lucide-react`
* Backend: Node.js, `@apollo/server`, `graphql`

## Development Challenges: Vite & Apollo Client

During the build process, a significant technical hurdle occurred regarding dependency bundling. 

Modern versions of Apollo Client (3.9+) utilize strict ESM export maps. Vite's dependency optimizer frequently fails to resolve these paths correctly, resulting in runtime errors such as `does not provide an export named 'useMutation'`. 

To resolve this and ensure a stable build:
1. Apollo Client was intentionally pinned to version `3.8.8`, which is highly stable within Vite environments.
2. The installation required the `--legacy-peer-deps` flag to bypass an `ERESOLVE` conflict, as Vite initialized the project with React 19, while Apollo 3.8.8 expects React 18 peer dependencies.
3. The Vite cache folder (`node_modules/.vite`) was manually purged to force a clean dependency graph.

## Local Setup Instructions

1. Start the Backend
Open a terminal and navigate to the backend folder:

cd kanso-backend
npm install
npm start

The GraphQL server will run on http://localhost:4000/

2. Start the Frontend
Open a new, separate terminal window:

cd kanso-web
npm install --legacy-peer-deps
npm run dev
The frontend will be available at http://localhost:5173/

## Time Taken
Total Time to Complete: 2 Hours