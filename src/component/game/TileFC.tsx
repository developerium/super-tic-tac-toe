import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { Tile } from '../../game/tile/tile';
import { GameContext } from '../game-context/GameContext';
import { PlayerAvatar } from './PlayerAvatar';
import { Player } from '../../game/player-manager/player-manager';
import { PlayerPiece } from './PlayerPiece';

interface TileProps {
  tile: Tile | null;
  x: number;
  y: number;
}

const Box = styled.div`
  border: 1px dashed gray;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TileFC: FC<TileProps> = ({ tile, y, x }) => {
  const { playerManager } = useContext(GameContext);

  const player: undefined | Player = playerManager?.getPlayer(tile?.player);

  return (
    <Droppable droppableId={`${x}-${y}`}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={
            snapshot.isDraggingOver ? { backgroundColor: 'blue' } : undefined
          }
        >
          {!player && (
            <div>
              {x},{y}
            </div>
          )}
          {player && typeof tile?.pin !== 'undefined' && (
            <PlayerPiece pin={tile?.pin} className={player.cssClass}>
              <PlayerAvatar index={player.index} className={''} />
            </PlayerPiece>
          )}
        </Box>
      )}
    </Droppable>
  );
};
