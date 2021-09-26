import React, { ChangeEventHandler, FC, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';
import { GameContext } from '../game-context/GameContext';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const SelectWrapper = styled.div`
  margin-bottom: 16px;
`;

export const GameSettingPage: FC = () => {
  const { setting, changeSetting, newGame } = useContext(GameContext);

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { name, value } = event.target;
    changeSetting?.(name, parseInt(value, 10));
  };

  return (
    <PageLayout title="Game setting">
      <Content>
        <p>Quickly set game settings</p>

        <label htmlFor="playerCount">Player count:</label>
        <SelectWrapper className="nes-select">
          <select
            required
            id="playerCount"
            name="playerCount"
            onChange={onChange}
            value={setting.playerCount}
          >
            <option value={2}>2 Players</option>
            <option value={3}>3 Players</option>
            <option value={4}>4 Players</option>
          </select>
        </SelectWrapper>

        <label htmlFor="gameSize">Game size:</label>
        <SelectWrapper className="nes-select">
          <select
            required
            id="gameSize"
            name="gameSize"
            onChange={onChange}
            value={setting.gameSize}
          >
            <option value={3}>3x3</option>
            <option value={5}>5x5</option>
            <option value={9}>9x9</option>
          </select>
        </SelectWrapper>
      </Content>

      <Link to="/game" className="nes-btn is-primary" onClick={newGame}>
        Play !
      </Link>
    </PageLayout>
  );
};
