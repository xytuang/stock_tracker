import React from "react"

const SearchResult = ({index, ticker}) => {
    return (
        <div key={index}>Symbol: {ticker.symbol} Name: {ticker.name}</div>
    )
}

export default SearchResult