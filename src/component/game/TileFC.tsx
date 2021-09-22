import React, { FC } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { Tile } from '../../game/tile/tile';

interface TileProps {
  tile: Tile | null;
  x: number;
  y: number;
  placeholder?: React.ReactElement<HTMLElement> | null | undefined;
}

const Box = styled.div`
  border: 1px dashed gray;
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TileFC: FC<TileProps> = ({ tile, y, x, placeholder }) => (
  <Droppable droppableId={`${x}-${y}`} type="piece">
    {(provided, snapshot) => (
      <Box ref={provided.innerRef} {...provided.droppableProps}>
        {x},{y}
        {placeholder}
        {tile && JSON.stringify(tile)}
      </Box>
    )}
  </Droppable>
);
