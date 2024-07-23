import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Formik, Form , Field } from 'formik';
import axios from 'axios';
import SearchResult from './SearchResult';
import Portfolio from './Portfolio';
import { LineChart } from '@mui/x-charts/LineChart';

const searchTicker = async (values) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/search?search=${values.ticker}`, {
        }, {withCredentials: true});
        return response;
    } catch (error) {
        throw error;
    }
}


const Landing = () => {
    const [bidPrices, setBidPrices] = useState([])
    const [askPrices, setAskPrices] = useState([])
    const [time, setTime] = useState([])

    const [tickers, setTickers] = useState([])

    const [graphTicker, setGraphTicker] = useState("AAPL")
    const [visiblePortfolio, setVisiblePortfolio] = useState(false)

    const changeGraphTicker = (symbol) => {
        if (symbol !== graphTicker) {
            setBidPrices([])
            setAskPrices([])
            setTime([])
            setGraphTicker(symbol)
        }
    }

    useEffect(() => {
        const loadData = () => {
                axios.get(`http://localhost:8080/api/quote?ticker=${graphTicker}&type=STOCKS`, {
                }, {withCredentials: true}).then(result => {
                    //console.log(result.data)
                    const bidString = result.data.body.primaryData.bidPrice
                    const bid = Number(bidString.replace(/[^0-9.-]+/g,""))
                    const askString = result.data.body.primaryData.askPrice
                    const ask = Number(askString.replace(/[^0-9.-]+/g,""))

                    setAskPrices(x => [...x, ask])
                    setBidPrices(x => [...x, bid])
                    setTime(y => [...y, y.length])
                }).catch(err => {
                    console.error(err)
                })
        }
        loadData()
        const interval = setInterval(() => loadData(), 180000) //fetching every 3 minutes
        return () => {
            clearInterval(interval)
        }
    }, [graphTicker])

    return (
        <div>
            <Header title={"Welcome!"}/>
            <Formik
                initialValues={{ ticker: "" }}
                onSubmit={async (values) => {
                try {
                    const res = await searchTicker(values)
                    if (res.status === 200) {
                        const data = res.data
                        setTickers(data.body)
                    }
                    else {
                        console.log("Login failed")
                    }
                }
                catch (error) {
                    console.error("Error logging in: ", error)
                }
                }}
            >
                <Form>
                    <label htmlFor="ticker">Ticker: </label>
                    <Field name="ticker" type="text" />
                    <button type="submit">Search ticker</button>
                </Form>
            </Formik>
            <div>
                {
                    tickers.map((ticker, index) => (ticker.type === "S" ? (<><SearchResult index={index} ticker={ticker}/><button onClick={() => changeGraphTicker(ticker.symbol)}>Change graph</button></>) : null ))
                }
            </div>
            <div style={{padding: '16dp'}}>
                <LineChart
                    xAxis={[{ data: time }]}
                    series={[
                        {
                            id: `${graphTicker}_BID_PRICE`,
                            label: `${graphTicker} Bid`,
                            data: bidPrices,
                        },
                        {
                            id: `${graphTicker}_ASK_PRICE`,
                            label: `${graphTicker} Ask`,
                            data: askPrices,
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
            <div>
                <button onClick={() => setVisiblePortfolio(!visiblePortfolio)}>Show open positions</button>
            </div>
            <div>
                {visiblePortfolio ? <Portfolio/> : null}
            </div>
        </div>
    );
};

export default Landing;
