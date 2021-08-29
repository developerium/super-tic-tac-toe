import React, { FC, useContext, useEffect } from 'react';
import { GameContext } from '../game-context/GameContext';
import { PageLayout } from '../layout/PageLayout';
import { Tile, TileRow } from '../../game/tile/tile';

interface TileRowProps {
  row: TileRow;
  x: number;
}

interface TileProps {
  tile: Tile | null;
  x: number;
  y: number;
}
const TileFC: FC<TileProps> = ({ tile, y, x }) => <div>{x},{y}</div>;

const TileRowFC: FC<TileRowProps> = ({ row, x }) => (
  <div>
    {row.map((tile, y) => (
      <TileFC tile={tile} y={y} x={x} key={`${x}-${y}`} />
    ))}
  </div>
);

export const GamePage: FC = () => {
  const { setting, game, newGame } = useContext(GameContext);

  useEffect(() => {
    newGame?.();
  }, []);

  if (!game) {
    return (
      <PageLayout title="Loading ...">
        <i className="nes-octocat animate" />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="TicTacToe">
      {game.getTiles().map((tileRow, index) => (
        <TileRowFC row={tileRow} x={index} key={index} />
      ))}
    </PageLayout>
  );
};
