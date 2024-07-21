import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import { PORT } from "./utils/config";
import market_routes from './routes/market_routes'
import authentication_routes from './routes/authentication_routes'
import users_routes from './routes/users_routes'

const app = express();
app.use(cors({
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/auth', authentication_routes)
app.use('/users', users_routes)
app.use('/api', market_routes)


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

const MONGO_URL ='mongodb+srv://xytuang:Txy200207*@cluster0.rqtaicj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error ) => console.log(error));