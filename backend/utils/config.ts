import dotenv from "dotenv";
dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const API_KEY: string = process.env.API_KEY || '';
const BASE_URL: string = 'https://yahoo-finance15.p.rapidapi.com/api'

export {
    PORT,
    API_KEY,
    BASE_URL
}