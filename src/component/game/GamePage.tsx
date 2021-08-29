import React, { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { GameContext } from '../game-context/GameContext';
import { PageLayout } from '../layout/PageLayout';
import { TileRowFC } from './TileRowFC';
import { PlayerAvatar } from './PlayerAvatar';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlayerContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const GamePage: FC = () => {
  const { game, newGame, players } = useContext(GameContext);

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
      <PlayerContent>
        {players.map((player, index) => (
          <PlayerAvatar
            key={player}
            index={index}
            selected={player === game?.nextPlayer}
            id={player}
          />
        ))}
      </PlayerContent>
      <Content>
        {game.getTiles().map((tileRow, index) => (
          <TileRowFC row={tileRow} x={index} key={index} />
        ))}
      </Content>
    </PageLayout>
  );
};
