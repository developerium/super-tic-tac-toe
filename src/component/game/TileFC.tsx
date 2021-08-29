import React, { FC } from 'react';
import styled from 'styled-components';

import { Tile } from '../../game/tile/tile';

interface TileProps {
  tile: Tile | null;
  x: number;
  y: number;
}

const Box = styled.div`
  border: 1px dashed gray;
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TileFC: FC<TileProps> = ({ tile, y, x }) => (
  <Box>
    {x},{y}
  </Box>
);
