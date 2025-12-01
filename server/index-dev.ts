import { type Server } from "node:http";
import type { Express } from "express";
import runApp from "./app.ts";

export async function setupDev(app: Express, server: Server) {
  console.log("Development server started. API is available at /api");
  // In dev mode, we don't serve the frontend from here.
  // The frontend is served by Vite on a different port (usually 5173).
}

(async () => {
  await runApp(setupDev);
})();
