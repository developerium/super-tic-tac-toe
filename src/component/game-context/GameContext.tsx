import React, { createContext, FC, useCallback, useState } from 'react';

type SettingValue = number | string;
type ChangeSetting = (name: string, value: SettingValue) => void;

const initialSetting = {
  playerCount: 2,
  gameSize: 3,
};

const initialState = {
  setting: {
    ...initialSetting,
  },
  changeSetting: (name: string, value: SettingValue) => {
    console.log(name, value);
  },
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

  return (
    <GameContext.Provider value={{ setting, changeSetting }}>
      {children}
    </GameContext.Provider>
  );
};
