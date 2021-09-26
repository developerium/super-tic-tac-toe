import React, { CSSProperties, FC, useContext } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { Pin, Tile } from '../../game/tile/tile';
import { GameContext } from '../game-context/GameContext';
import { Player } from '../../game/player-manager/player-manager';
import { PlayerPiece } from './PlayerPiece';
import { HiddenDiv } from './HiddenDiv';

interface TileProps {
  tile: Tile | null;
  x: number;
  y: number;
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed gray;
  width: 120px;
  height: 120px;
`;

const getPinSymbol = (pin: Pin) => {
  switch (pin) {
  case Pin.Small:
    return 'S';
  case Pin.Medium:
    return 'M';
  case Pin.Large:
    return 'L';
  default:
    return 'unknown';
  }
};

const dragOverStyle: CSSProperties = {
  backgroundColor: '#33bfff',
};

export const TileFC: FC<TileProps> = ({ tile, y, x }) => {
  const { playerManager } = useContext(GameContext);

  const player: undefined | Player = playerManager?.getPlayer(tile?.player);

  return (
    <Droppable droppableId={`${x}-${y}`}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={snapshot.isDraggingOver ? dragOverStyle : undefined}
        >
          {!player && <div />}
          {player && typeof tile?.pin !== 'undefined' && (
            <PlayerPiece pin={tile.pin} className={player.cssClass}>
              {getPinSymbol(tile.pin)}
            </PlayerPiece>
          )}
          <HiddenDiv>{provided.placeholder}</HiddenDiv>
        </Box>
      )}
    </Droppable>
  );
};
