import React from 'react';

const searchResultPage = ({ searchOutput }) => {
    return (
        <div className='search-results-child'>

            <div className='flex-results'>
                {
                    searchOutput.map((result) => (
                        <div className="tile">
                            <img className='image' src={result.image} width="500" height="500"></img>
                            <div className='price'><b>${result.price}</b></div>
                            <div className='productname'><b>{result.name}</b></div>
                            <div className='brand'><b>Brand: {result.brand}</b></div>
                            <div className='retailer'><b>Retailer: {result.retailer}</b></div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default searchResultPage;