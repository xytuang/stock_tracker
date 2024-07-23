import React, { useState } from 'react';
import Header from './Header';
import { Formik, Form , Field } from 'formik';
import axios from 'axios';
import SearchResult from './SearchResult';
import Portfolio from './Portfolio';

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
    const [tickers, setTickers] = useState([])
    const [visiblePortfolio, setVisiblePortfolio] = useState(false)
    return (
        <div>
            <Header title={"Landing Page"}/>
            <Formik
                initialValues={{ ticker: "" }}
                onSubmit={async (values) => {
                try {
                    const res = await searchTicker(values)
                    if (res.status === 200) {
                        const data = res.data
                        console.log("Login success", data)
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
                    tickers.map((ticker, index) => (ticker.type === "S" ? (<SearchResult index={index} ticker={ticker}/>) : null ))
                }
            </div>
            <div>
                <button onClick={() => setVisiblePortfolio(!visiblePortfolio)}>Show positions</button>
            </div>
            <div>
                {visiblePortfolio ? <Portfolio/> : null}
            </div>
        </div>
    );
};

export default Landing;
