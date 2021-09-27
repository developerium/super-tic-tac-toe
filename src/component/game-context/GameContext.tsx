import React, { createContext, FC, useCallback, useState } from 'react';
import { Game } from '../../game/game';
import { PlayerManager } from '../../game/player-manager/player-manager';

type SettingValue = number | string;
type ChangeSetting = (name: string, value: SettingValue) => void;

interface IGameContext {
  setting: { [key: string]: SettingValue };
  changeSetting?: ChangeSetting;
  game: Game | null;
  playerManager: PlayerManager | null;
  newGame?: () => void;
}

const initialSetting = {
  playerCount: 2,
  gameSize: 3,
};

const initialState: IGameContext = {
  setting: {
    ...initialSetting,
  },
  game: null,
  playerManager: null,
};

export const GameContext = createContext(initialState);

export const GameContextProvider: FC = ({ children }) => {
  const [setting, setSetting] = useState(initialSetting);
  const [playerManager, setPlayerManager] = useState<PlayerManager | null>(
    null
  );
  const [game, setGame] = useState<Game | null>(null);

  const changeSetting = useCallback<ChangeSetting>(
    (name, value) => {
      setSetting({
        ...setting,
        [name]: value,
      });
    },
    [setting, setSetting]
  );

  const newGame = useCallback(() => {
    const newPlayers = Array.from(
      new Array(setting.playerCount),
      () => `${Math.random()}`
    );

    setPlayerManager(
      new PlayerManager({
        ids: newPlayers,
        pieceCount: setting.gameSize,
      })
    );

    setGame(
      new Game({
        size: setting.gameSize,
        players: newPlayers,
      })
    );
  }, [setting, setGame]);

  return (
    <GameContext.Provider
      value={{ setting, changeSetting, game, newGame, playerManager }}
    >
      {children}
    </GameContext.Provider>
  );
};
