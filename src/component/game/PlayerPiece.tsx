import React, { FC } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import { Player } from '../game-context/GameContext';
import { Pin } from '../../game/tile/tile';

interface PlayerPieceProps {
  player: Player;
}

interface PieceProps {
  draggableId: string;
}

const Large = styled.h3``;
const Medium = styled.h4``;
const Small = styled.h5``;

const Piece: FC<PieceProps> = ({ children, draggableId }) => (
  <Draggable draggableId={draggableId} index={0}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {children}
      </div>
    )}
  </Draggable>
);

export const PlayerPiece: FC<PlayerPieceProps> = ({ player }) => {
  return (
    <div className={`nes-text ${player.cssClass}`}>
      <Piece draggableId="draggable-1">
        <Large>large: {player.pieces[Pin.Large]}</Large>
      </Piece>

      <Piece draggableId="draggable-2">
        <Medium>medium: {player.pieces[Pin.Medium]}</Medium>
      </Piece>

      <Piece draggableId="draggable-3">
        <Small>small: {player.pieces[Pin.Small]}</Small>
      </Piece>
    </div>
  );
};
