import React, { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { GameContext } from '../game-context/GameContext';
import { PageLayout } from '../layout/PageLayout';
import { TileRowFC } from './TileRowFC';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GamePage: FC = () => {
  const { game, newGame } = useContext(GameContext);

  useEffect(() => {
    newGame?.();
  }, []);

  if (!game) {
    return (
      <PageLayout title="Loading ...">
        <div>
          <div className="nes-octocat animate" />
          Hi :)
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="TicTacToe">
      <Content>
        {game.getTiles().map((tileRow, index) => (
          <TileRowFC row={tileRow} x={index} key={index} />
        ))}
      </Content>
    </PageLayout>
  );
};
