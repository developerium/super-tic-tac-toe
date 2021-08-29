import React, { FC } from 'react';
import styled from 'styled-components';

interface PlayerAvatarProps {
  index: number;
  selected: boolean;
  id: string;
}

const playerClasses = ['is-success', 'is-warning', 'is-error', 'is-primary', 'is-disabled'];

interface ContainerProps {
  selected: boolean;
}

const Container = styled.div<ContainerProps>`
  border-radius: 10%;
  ${({ selected }) =>
    selected &&
    `
    animation: blinker 1s step-start infinite;
  `}
`;

const Icon = styled.span``;

export const PlayerAvatar: FC<PlayerAvatarProps> = ({
  index,
  selected,
  id,
}) => (
  <Container selected={selected}>
    <Icon className={`nes-text ${playerClasses[index]}`}>P{index + 1}</Icon>
  </Container>
);
