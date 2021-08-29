import React, { FC } from 'react';
import styled from 'styled-components';

interface PlayerAvatarProps {
  index: number;
  selected: boolean;
  id: string;
}

const playerClasses = [
  'nes-bulbasaur',
  'nes-charmander',
  'nes-squirtle',
  'nes-mario',
  'nes-logo',
  'nes-jp-logo',
  'snes-logo',
  'snes-jp-logo',
];

const Container = styled.div``;

export const PlayerAvatar: FC<PlayerAvatarProps> = ({
  index,
  selected,
  id,
}) => (
  <Container>
    <i className={playerClasses[index]} />
  </Container>
);
