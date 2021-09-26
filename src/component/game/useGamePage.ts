import { useContext, useEffect, useState } from 'react';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';

import { GameContext } from '../game-context/GameContext';
import { Pin } from '../../game/tile/tile';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGamePage = () => {
  const { game, newGame, playerManager } = useContext(GameContext);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const nextPlayer = game?.nextPlayer;
  const players = playerManager?.getPlayers() || [];
  const gameWinner = game?.getWinner();

  useEffect(() => {
    newGame?.();
  }, []);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log('onDragEnd', { result, provided });

    if (!game || !playerManager || !nextPlayer) {
      console.log('game is not ready');
      return;
    }

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

  const onReset = () => {
    console.log('handle on Reset!!');
  };

  return {
    game,
    playerManager,
    nextPlayer,
    players,
    onDragEnd,
    gameWinner,
    onReset,
  };
};