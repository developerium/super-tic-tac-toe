import React, { FC } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import { Player } from '../game-context/GameContext';
import { Pin } from '../../game/tile/tile';

interface PlayerPieceProps {
  player: Player;
}

const Large = styled.h3``;
const Medium = styled.h4``;
const Small = styled.h5``;

export const PlayerPiece: FC<PlayerPieceProps> = ({ player }) => {
  return (
    <div className={`nes-text ${player.cssClass}`}>
      <Draggable draggableId="draggable-1" index={0}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Large>large: {player.pieces[Pin.Large]}</Large>
          </div>
        )}
      </Draggable>

      <Draggable draggableId="draggable-2" index={0}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Medium>medium: {player.pieces[Pin.Medium]}</Medium>
          </div>
        )}
      </Draggable>


      <Draggable draggableId="draggable-3" index={0}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Small>small: {player.pieces[Pin.Small]}</Small>
          </div>
        )}
      </Draggable>
    </div>
  );
};
