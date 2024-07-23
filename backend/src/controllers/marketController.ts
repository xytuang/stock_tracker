import { Request, Response} from "express"
import { exec } from "child_process";
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
        return res.send(response.data);
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
      return res.send(response.data);
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

const getRatio = (predictionArr: String[]) => {
  var positiveCount = 0;

  for (let i = 0; i < predictionArr.length; i++) {
    if (predictionArr[i] == "1") {
      positiveCount++;
    }
  }

  return positiveCount/predictionArr.length
  
}

export const getPredict = async (req: Request, res: Response) => {
  const ticker = req.query.ticker as string;
  if (!ticker) {
    return res.status(400).send('Ticker parameter required');
  }
  const urls = ['arg1', 'arg2', 'arg3'];
  const urlString = urls.join(' ');
  let headlines: String = "";
  exec(`python3 ../python/get_headline.py ${urlString}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return res.status(400).send('Could not read headlines');
    }
    
    if (stderr) {
      console.log("error when parsing headlines")
      console.error(`stderr: ${stderr}`);
    }
    headlines = stdout.trim()
  });

  let result: String = ""
  exec(`python3 ../python/get_predictions.py ${headlines}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return res.status(400).send('Could not read headlines');
    }
    
    if (stderr) {
      console.log("error when parsing headlines")
      console.error(`stderr: ${stderr}`);
    }
    result = stdout.trim()
  });
  const predictionArr = result.split(' ');
  return res.status(200).json({"rating": getRatio(predictionArr)}).end();
}
