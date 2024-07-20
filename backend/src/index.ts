import express, { Express, Request, response, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://yahoo-finance15.p.rapidapi.com/api'

app.get('/v1/markets/search', async (req, res) => {
  const searchQuery = req.query.search as string;
  if (!searchQuery) {
    return res.status(400).send('Search parameter required')
  }
    const options = {
      method: 'GET',
      url: `${BASE_URL}/v1/markets/search`,
      params: {search: searchQuery},
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});