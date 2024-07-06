import React, { Suspense } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";

function App() {

  const NewQuote = React.lazy(() => import('./pages/NewQuote'));

  const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));

  const AllQuote = React.lazy(() => import('./pages/AllQuote'));

  const NotFound = React.lazy(() => import('./pages/NotFound'));

  return (
    <Layout>
      <Suspense fallback={<div className="centered">
        <LoadingSpinner/>
      </div>}>
    <Switch>
      <Route path="/" exact>
        <Redirect to="/quotes"/>
      </Route>
      <Route path="/quotes" exact>
        <AllQuote/>
      </Route>
      <Route path="/quotes/:quoteId">
         <QuoteDetail/>
        </Route>
        <Route path="/new-quote">
        <NewQuote/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
    </Switch>
    </Suspense>
    </Layout> 
  );
}

export default App;
