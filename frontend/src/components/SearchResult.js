import React from "react"

const SearchResult = ({index, ticker}) => {
    return (
        <span key={index}>Symbol: {ticker.symbol} Name: {ticker.name}</span>
    )
}

export default SearchResult