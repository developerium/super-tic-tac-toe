import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'nes.css/css/nes.min.css';

import { GameContextProvider } from './component/game-context/GameContext';
import { HomePage } from './component/home/HomePage';
import { GamePage } from './component/game/GamePage';
import { AboutMePage } from './component/about-me/AboutMePage';
import { NotFoundPage } from './component/not-found/NotFoundPage';
import { GameSettingPage } from './component/game-setting/GameSettingPage';

const App: FC = () => {
  return (
    <GameContextProvider>
      <Router>
        <Switch>
          <Route path="/about-me">
            <AboutMePage />
          </Route>
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/game-setting">
            <GameSettingPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </GameContextProvider>
  );
};

export default App;
