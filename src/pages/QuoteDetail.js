import React, { Fragment, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuotes';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import useHttp from '../hooks/use-Http';
import { getSingleQuote } from '../lib/api';


//   const DUMMY_QUOTES = [
//     { id: 'q1',
//     author: 'Max',
//     text: 'Learning React is fun!'
//   },  
//   { id: 'q2', 
//   author: 'Maximilian', 
//   text: 'Learning React is Great!'
// },  
//   ];

const QuoteDetail = () => {

    const match = useRouteMatch();
    const params = useParams();

    const { quoteId } = params;

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

    useEffect(() => {
      sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if(status === 'pending') {
      return <div className='centered'>
        <LoadingSpinner/>
      </div>
    };

    if(error) {
      return <p className='centered'>{error}</p>
    };

    if(!loadedQuote.text) {
      return <p>No quote found!</p>
    };

  

  return (
    <Fragment>
     <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
     <Route path={match.path} exact>
     <div className='centered'>
       <Link className='btn--flat' to={`${match.url}/comments`}>Load Comment</Link>
     </div>
     </Route>
     <Route path={`${match.path}/comments`}>
        <Comments/>
     </Route>
    </Fragment>
  )
}

export default QuoteDetail
