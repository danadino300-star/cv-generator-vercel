import { app } from "../server/app";
import { registerRoutes } from "../server/routes";

// Register routes
registerRoutes(app);

export default app;
