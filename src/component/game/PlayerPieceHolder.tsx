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

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

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

export const PlayerPieceHolder: FC<PlayerPieceProps> = ({ player }) => (
  <Root>
    {player.pieces[Pin.Large] > 0 && (
      <DraggablePiece draggableId="draggable-1" draggableIndex={Pin.Large}>
        <PlayerPiece pin={Pin.Large} className={player.cssClass}>
          <Large>{player.pieces[Pin.Large]}x</Large>
        </PlayerPiece>
      </DraggablePiece>
    )}

    {player.pieces[Pin.Medium] > 0 && (
      <DraggablePiece draggableId="draggable-2" draggableIndex={Pin.Medium}>
        <PlayerPiece pin={Pin.Medium} className={player.cssClass}>
          <Medium>{player.pieces[Pin.Medium]}x</Medium>
        </PlayerPiece>
      </DraggablePiece>
    )}

    {player.pieces[Pin.Small] > 0 && (
      <DraggablePiece draggableId="draggable-3" draggableIndex={Pin.Small}>
        <PlayerPiece pin={Pin.Small} className={player.cssClass}>
          <Small>{player.pieces[Pin.Small]}x</Small>
        </PlayerPiece>
      </DraggablePiece>
    )}
  </Root>
);
