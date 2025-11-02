import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Server routes will go here if needed
  const httpServer = createServer(app);
  return httpServer;
}
