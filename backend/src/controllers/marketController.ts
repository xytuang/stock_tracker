import { Request, Response} from "express"
import axios from "axios";
import { BASE_URL, API_KEY } from "../utils/config";


/*
* Returns list of tickers that contain search query
*/

export const searchMarket = async (req: Request, res: Response) => {
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
  };

/*
* Returns real time market quotes
*/
export const getMarketQuotes = async (req: Request, res: Response) => {
  const ticker = req.query.ticker as string;
  const type = req.query.type as string;
  if (!ticker) {
    return res.status(400).send('Ticker parameter required')
  }
  if (!type) {
    return res.status(400).send('Type parameter required')
  }
    const options = {
      method: 'GET',
      url: `${BASE_URL}/v1/markets/quote`,
      params: {
        ticker: ticker,
        type: type
      },
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
};

/*
* Returns news for a specific ticker
*/
export const getNews =  async (req: Request, res: Response) => {
  const ticker = req.query.ticker as string;
  if (!ticker) {
    return res.status(400).send('Ticker parameter required')
  }
    const options = {
      method: 'GET',
      url: `${BASE_URL}/v1/markets/news`,
      params: {
        ticker: ticker,
      },
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
};
