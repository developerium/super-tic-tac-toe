import React, { FC } from 'react';
import styled from 'styled-components';

import { TileRow } from '../../game/tile/tile';
import { TileFC } from './TileFC';

interface TileRowProps {
  row: TileRow;
  x: number;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TileRowFC: FC<TileRowProps> = ({ row, x }) => (
  <Row>
    {row.map((tile, y) => (
      <TileFC tile={tile} y={y} x={x} key={`${x}-${y}`} />
    ))}
  </Row>
);
