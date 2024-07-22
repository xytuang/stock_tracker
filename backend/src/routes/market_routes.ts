import { Router } from "express";
import { searchMarket, getMarketQuotes, getNews } from "../controllers/marketController";
import { isAuthenticated } from "../middlewares";
const marketRouter = Router();

marketRouter.get('/search', isAuthenticated, searchMarket);
marketRouter.get('/quote', isAuthenticated, getMarketQuotes);
marketRouter.get('/news', isAuthenticated, getNews);

export default marketRouter

