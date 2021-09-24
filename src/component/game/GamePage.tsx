import React, { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BeforeCapture,
  DragDropContext,
  DragStart,
  DragUpdate,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

import { GameContext } from '../game-context/GameContext';
import { PageLayout } from '../layout/PageLayout';
import { TileRowFC } from './TileRowFC';
import { PlayerAvatar } from './PlayerAvatar';
import { PlayerPieceHolder } from './PlayerPieceHolder';
import { Pin } from '../../game/tile/tile';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlayerContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const GamePage: FC = () => {
  const { game, newGame, playerManager } = useContext(GameContext);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const nextPlayer = game?.nextPlayer;
  const players = playerManager?.getPlayers() || [];

  useEffect(() => {
    newGame?.();
  }, []);

  if (!game || !playerManager || !nextPlayer) {
    return (
      <PageLayout title="Loading ...">
        <div>
          <div className="nes-octocat animate" />
          Hi :)
        </div>
      </PageLayout>
    );
  }

  const onBeforeCapture = (before: BeforeCapture) => {
    console.log('onBeforeCapture', { before });
  };
  const onBeforeDragStart = (initial: DragStart) => {
    console.log('onBeforeDragStart', { initial });
  };
  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    console.log('onDragStart', { initial, provided });
  };
  const onDragUpdate = (initial: DragUpdate, provided: ResponderProvided) => {
    console.log('onDragUpdate', { initial, provided });
  };
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log('onDragEnd', { result, provided });

    const pin: Pin = result.source.index;
    const destination = result.destination?.droppableId;

    if (!destination) {
      console.log('no destination tile found');
      return;
    }

    const [xRaw, yRaw] = destination.split('-');
    const x = parseInt(xRaw, 10);
    const y = parseInt(yRaw, 10);

    if (isNaN(x) || isNaN(y) || !game.validate({ x, y, pin })) {
      console.log('invalid move');
      return;
    }

    if (!playerManager.removePin({ pin, player: nextPlayer })) {
      console.log('unable to remove pin');
      return;
    }

    game.createMove({ x, y, pin });

    setRefreshCounter(refreshCounter + 1);
  };

  return (
    <PageLayout title="TicTacToe">
      <Content>
        <DragDropContext
          onBeforeCapture={onBeforeCapture}
          onBeforeDragStart={onBeforeDragStart}
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          <PlayerContent>
            {players.map((player) => (
              <PlayerAvatar
                key={player.id}
                selected={player.id === nextPlayer}
                className={player.cssClass}
                index={player.index}
              />
            ))}
          </PlayerContent>

          <Droppable droppableId="playerPiece" type="piece">
            {(provided, snapshot) => (
              <Content
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <PlayerContent>
                  {players.map((player) =>
                    player.id === nextPlayer ? (
                      <PlayerPieceHolder key={player.id} player={player} />
                    ) : null
                  )}
                </PlayerContent>

                <TileContent>
                  {game.getTiles().map((tileRow, index) => (
                    <TileRowFC
                      row={tileRow}
                      x={index}
                      key={index}
                      placeholder={provided.placeholder}
                    />
                  ))}
                </TileContent>
              </Content>
            )}
          </Droppable>
        </DragDropContext>
      </Content>
    </PageLayout>
  );
};
