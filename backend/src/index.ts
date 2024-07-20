import express, { Express, Request, response, Response } from "express";
import { PORT } from "../utils/config";
import marketRoutes from '../routes/marketRoutes'

const app = express();
app.use('/api', marketRoutes)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});