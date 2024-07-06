import React, { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from '../hooks/use-Http';
import { getAllQuotes } from '../lib/api';

const AllQuote = () => {
  const { sendRequest, status, data: loadedQuote, error} = useHttp(
    getAllQuotes,
    true
    )

    useEffect(() => {
      sendRequest();
    }, [sendRequest]);

    if(status === 'pending') {
      return (<div className='centered'>
        <LoadingSpinner/>
      </div>
      )
    };

    if(error) {
      return <p className='centered focused'>{error}</p>
    };

    if(status === 'completed' && (!loadedQuote || loadedQuote.length === 0)){
      return <NoQuotesFound/>
    }

  return (
    <>
      <QuoteList quotes={loadedQuote}/>
      </>
  )
}

export default AllQuote
