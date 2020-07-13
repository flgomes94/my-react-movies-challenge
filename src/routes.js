import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Movie from './pages/Movie';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/movie/:movie" component={Movie} />
      </Switch>
    </BrowserRouter>
  );
}
