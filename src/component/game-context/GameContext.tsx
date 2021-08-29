import React, { createContext, FC, useCallback, useState } from 'react';
import { Game } from '../../game/game';
import { Pin } from '../../game/tile/tile';

type SettingValue = number | string;
type ChangeSetting = (name: string, value: SettingValue) => void;

export interface Player {
  id: string;
  cssClass: string;
  index: number;
  pieces: {
    [Pin.Small]: number;
    [Pin.Medium]: number;
    [Pin.Large]: number;
  };
}
const playerClasses = [
  'is-success',
  'is-warning',
  'is-error',
  'is-primary',
  'is-disabled',
];

interface IGameContext {
  setting: { [key: string]: SettingValue };
  changeSetting?: ChangeSetting;
  game: Game | null;
  newGame?: () => void;
  players: Player[];
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
  players: [],
};

export const GameContext = createContext(initialState);

export const GameContextProvider: FC = ({ children }) => {
  const [setting, setSetting] = useState(initialSetting);
  const [players, setPlayers] = useState<Player[]>([]);
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
      (element, index) => ({
        id: `${Math.random()}`,
        index: index + 1,
        cssClass: playerClasses[index],
        pieces: {
          [Pin.Small]: 3,
          [Pin.Medium]: 3,
          [Pin.Large]: 3,
        },
      })
    );

    setPlayers(newPlayers);

    setGame(
      new Game({
        size: setting.gameSize,
        players: newPlayers.map((player) => player.id),
      })
    );
  }, [setting, setGame]);

  return (
    <GameContext.Provider
      value={{ setting, changeSetting, game, newGame, players }}
    >
      {children}
    </GameContext.Provider>
  );
};
