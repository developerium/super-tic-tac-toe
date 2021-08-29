import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => (
  <div>
    <div className="nes-container is-dark with-title">
      <p className="title">Super Tic Tak Toe</p>
      <p>Welcome to our awesome game, tic tak toe on steroids!</p>

      <Link to="/game" className="nes-btn is-primary">
        Play !
      </Link>
    </div>
  </div>
);
