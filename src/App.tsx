import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'nes.css/css/nes.min.css';

import './App.css';
import { HomePage } from './component/home/HomePage';
import { GamePage } from './component/game/GamePage';
import { AboutMePage } from './component/about-me/AboutMePage';
import { NotFoundPage } from './component/not-found/NotFoundPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about-me">
          <AboutMePage />
        </Route>
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
