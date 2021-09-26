import React, { FC } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { PageLayout } from '../layout/PageLayout';
import { TileRowFC } from './TileRowFC';
import { PlayerAvatar } from './PlayerAvatar';
import { PlayerPieceHolder } from './PlayerPieceHolder';
import { HiddenDiv } from './HiddenDiv';
import { useGamePage } from './useGamePage';

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

const VerticalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 16px 0;
`;

export const GamePage: FC = () => {
  const {
    game,
    playerManager,
    nextPlayer,
    players,
    onDragEnd,
    onReset,
    gameWinner,
  } = useGamePage();

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

  return (
    <PageLayout title="Tic Tac Toe" isGameLayout>
      <Content>
        <DragDropContext onDragEnd={onDragEnd}>
          <VerticalContent>
            {players.map((player) => (
              <PlayerAvatar
                key={player.id}
                selected={player.id === nextPlayer}
                className={player.cssClass}
                index={player.index}
              />
            ))}

            <button className="nes-btn" onClick={onReset}>
              reset
            </button>
          </VerticalContent>

          <Droppable droppableId="playerPieces" isDropDisabled>
            {(provided) => (
              <VerticalContent
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {players.map((player) =>
                  player.id === nextPlayer ? (
                    <PlayerPieceHolder key={player.id} player={player} />
                  ) : null
                )}
                <HiddenDiv>{provided.placeholder}</HiddenDiv>
              </VerticalContent>
            )}
          </Droppable>

          <TileContent>
            {game.getTiles().map((tileRow, index) => (
              <TileRowFC
                row={tileRow}
                x={index}
                key={index}
                winnerLocations={gameWinner?.locations}
              />
            ))}
          </TileContent>
        </DragDropContext>
      </Content>
    </PageLayout>
  );
};
