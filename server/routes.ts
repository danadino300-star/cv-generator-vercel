import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { insertUserSchema, insertCVSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // PayPal routes - from PayPal integration blueprint
  app.get("/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  // User and CV management routes
  app.get("/api/user/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        // Create new user if not exists
        const newUser = await storage.createUser({ email, cvCount: 0, hasPaid: false });
        return res.json(newUser);
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/cv", async (req, res) => {
    try {
      const cvData = insertCVSchema.parse(req.body);
      const user = await storage.getUserByEmail(cvData.email);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if user has reached the limit
      if (user.cvCount >= 2 && !user.hasPaid) {
        return res.status(403).json({ 
          error: "CV limit reached", 
          requiresPayment: true 
        });
      }

      const cv = await storage.createCV({
        userId: user.id,
        name: cvData.name,
        role: cvData.role,
        email: cvData.email,
        phone: cvData.phone,
        location: cvData.location,
        summary: cvData.summary,
      });

      await storage.incrementUserCVCount(user.email);

      res.json(cv);
    } catch (error) {
      console.error("Error creating CV:", error);
      res.status(500).json({ error: "Failed to create CV" });
    }
  });

  app.post("/api/payment/complete", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      await storage.updateUserPaymentStatus(email, true);
      
      res.json({ success: true, message: "Payment recorded successfully" });
    } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ error: "Failed to update payment status" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
