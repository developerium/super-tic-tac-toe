import React, { FC, useContext, useEffect } from 'react';
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
import { PlayerPiece } from './PlayerPiece';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  const { game, newGame, players } = useContext(GameContext);

  useEffect(() => {
    newGame?.();
  }, []);

  if (!game) {
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

    const pin = result.source.index;
    const destination = result.destination?.droppableId;

    if (!destination) {
      console.log('no destination tile found');
      return;
    }
    const [x, y] = destination.split('-');

    game.createMove({
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      pin,
    });
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
                selected={player.id === game?.nextPlayer}
                player={player}
              />
            ))}
          </PlayerContent>

          <Droppable droppableId="playerPiece" type="piece">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
                }}
                {...provided.droppableProps}
              >
                <PlayerContent>
                  {players.map((player) =>
                    player.id === game?.nextPlayer ? (
                      <PlayerPiece key={player.id} player={player} />
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
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Content>
    </PageLayout>
  );
};
