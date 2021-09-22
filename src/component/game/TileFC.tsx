import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { Tile } from '../../game/tile/tile';
import { GameContext } from '../game-context/GameContext';
import { PlayerAvatar } from './PlayerAvatar';
import { Player } from '../../game/player-manager/player-manager';

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

export const TileFC: FC<TileProps> = ({ tile, y, x, placeholder }) => {
  const { playerManager } = useContext(GameContext);

  const player: undefined | Player = playerManager?.getPlayer(tile?.player);

  return (
    <Droppable droppableId={`${x}-${y}`} type="piece">
      {(provided, snapshot) => (
        <Box ref={provided.innerRef} {...provided.droppableProps}>
          {x},{y}
          {placeholder}
          {player && <PlayerAvatar player={player} />}
        </Box>
      )}
    </Droppable>
  );
};
