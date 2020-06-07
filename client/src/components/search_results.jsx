// jshint esversion:8
import React from 'react';
import SearchResult from './search_result.jsx';

const SearchResults = (props) => {
    return (
        <div className="search_results" style={{display: 'inline-block'}}>
        {
            props.searchResults.length ? 
            (
                props.searchResults.map((result, i) => {
                    return (
                        <div className="centered">
                        <SearchResult clear={props.clear} selectResult={props.selectResult} key={i} searchResult={result} />
                        </div>
                    )
                })
            ) 
            : 
            (
                null
            )
        }
        </div>
    );

};

export default SearchResults;