import React, { FC } from 'react';
import styled from 'styled-components';

import { Location, TileRow } from '../../game/tile/tile';
import { TileFC } from './TileFC';

interface TileRowProps {
  row: TileRow;
  x: number;
  winnerLocations?: Location[];
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const isWinnerLocation =
  ({ x, y }: Location) =>
    (winnerLocation: Location) =>
      x === winnerLocation.x && y === winnerLocation.y;

export const TileRowFC: FC<TileRowProps> = ({ row, x, winnerLocations }) => (
  <Row>
    {row.map((tile, y) => (
      <TileFC
        tile={tile}
        y={y}
        x={x}
        key={`${x}-${y}`}
        isWinner={
          winnerLocations &&
          winnerLocations.some(
            isWinnerLocation({
              x,
              y,
            })
          )
        }
      />
    ))}
  </Row>
);
