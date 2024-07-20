import { Router } from "express";
import { searchMarket, getMarketQuotes, getNews } from "../controllers/marketController";
const marketRouter = Router();

marketRouter.get('/search', searchMarket);
marketRouter.get('/quote', getMarketQuotes);
marketRouter.get('/news', getNews);

export default marketRouter

