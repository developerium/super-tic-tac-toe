import React, { createContext, FC, useCallback, useState } from 'react';
import { Game } from '../../game/game';

type SettingValue = number | string;
type ChangeSetting = (name: string, value: SettingValue) => void;

interface IGameContext {
  setting: { [key: string]: SettingValue };
  changeSetting?: ChangeSetting;
  game: Game | null;
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
};

export const GameContext = createContext(initialState);

export const GameContextProvider: FC = ({ children }) => {
  const [setting, setSetting] = useState(initialSetting);
  const changeSetting = useCallback<ChangeSetting>(
    (name, value) => {
      setSetting({
        ...setting,
        [name]: value,
      });
    },
    [setting, setSetting]
  );

  const [game, setGame] = useState<Game | null>(null);
  const newGame = useCallback(() => {
    setGame(
      new Game({
        size: setting.gameSize,
        players: Array.from(new Array(setting.playerCount), () => `${Math.random()}`),
      })
    );
  }, [setting, setGame]);

  return (
    <GameContext.Provider value={{ setting, changeSetting, game, newGame }}>
      {children}
    </GameContext.Provider>
  );
};
