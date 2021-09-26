import React, { FC, useContext } from 'react';
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
  isWinner?: boolean;
}

interface BoxProps {
  isDraggingOver?: boolean;
  isWinner?: boolean;
}

const Box = styled.div<BoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed gray;
  width: 120px;
  height: 120px;

  ${({ isWinner }) =>
    isWinner &&
    `
    background-color: #33eb91;
    animation: blinker 1s step-start infinite;
    `}
  ${({ isDraggingOver }) => isDraggingOver && `background-color: #8561c5;`}
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

export const TileFC: FC<TileProps> = ({ tile, y, x, isWinner = false }) => {
  const { playerManager } = useContext(GameContext);

  const player: undefined | Player = playerManager?.getPlayer(tile?.player);

  return (
    <Droppable droppableId={`${x}-${y}`}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          isWinner={isWinner}
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
