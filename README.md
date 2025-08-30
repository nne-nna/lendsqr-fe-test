# Lendsqr Admin – Assessment

A small React + TypeScript + SCSS app that implements **Login**, **Dashboard**, **Users**, and **User Details** pages.

## ✨ Features
- Pixel-faithful layout based on the provided screenshots
- Users page lists 500 mocked users with filters, pagination and status pills
- User details page reads from mock API and **caches** the user in `localStorage` per requirement
- Mobile responsive (sidebar collapses, grid stacks)
- Unit tests with Vitest + React Testing Library
- Clean folder structure, typed APIs

## ▶️ Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## 🧪 Tests
```bash
npm run test
```

## 🗃️ Mock API
`src/mock/users.json` contains 500 deterministic records. The API is simulated in `src/api/users.ts` with a small delay.

## 🧱 Tech stack
React + TypeScript + Vite + SCSS, Vitest + Testing Library.
