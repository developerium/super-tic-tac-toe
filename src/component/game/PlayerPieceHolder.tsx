import React, { FC } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import { Player } from '../../game/player-manager/player-manager';
import { Pin } from '../../game/tile/tile';
import { PlayerPiece } from './PlayerPiece';

interface PlayerPieceProps {
  player: Player;
}

interface PieceProps {
  draggableId: string;
  draggableIndex: Pin;
}

const Large = styled.h3``;
const Medium = styled.h4``;
const Small = styled.h5``;

const DraggablePiece: FC<PieceProps> = ({
  children,
  draggableId,
  draggableIndex,
}) => (
  <Draggable draggableId={draggableId} index={draggableIndex}>
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

export const PlayerPieceHolder: FC<PlayerPieceProps> = ({ player }) => {
  return (
    <div className={`nes-text ${player.cssClass}`}>
      <DraggablePiece draggableId="draggable-1" draggableIndex={Pin.Large}>
        <Large>
          <PlayerPiece pin={Pin.Large}>{player.pieces[Pin.Large]}x</PlayerPiece>
        </Large>
      </DraggablePiece>

      <DraggablePiece draggableId="draggable-2" draggableIndex={Pin.Medium}>
        <Medium>
          <PlayerPiece pin={Pin.Medium}>
            {player.pieces[Pin.Medium]}x
          </PlayerPiece>
        </Medium>
      </DraggablePiece>

      <DraggablePiece draggableId="draggable-3" draggableIndex={Pin.Small}>
        <Small>
          <PlayerPiece pin={Pin.Small}>{player.pieces[Pin.Small]}x</PlayerPiece>
        </Small>
      </DraggablePiece>
    </div>
  );
};
