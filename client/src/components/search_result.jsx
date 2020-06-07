import React from 'react';

const SearchResult = (props) => {
    return (
        <div className="search_input search_result" onClick={() => {
            props.selectResult(props.searchResult.site_no);
            props.clear();
        }}>
        {
            props.searchResult.station_nm
        }
        </div>
    );
};

export default SearchResult;