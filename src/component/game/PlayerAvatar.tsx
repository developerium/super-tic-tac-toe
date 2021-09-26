import React, { FC } from 'react';
import styled from 'styled-components';

interface PlayerAvatarProps {
  selected?: boolean;
  name: string;
  className: string;
}

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
  selected = false,
  className,
  name
}) => (
  <Container selected={selected}>
    <Icon className={`nes-text ${className}`}>{name}</Icon>
  </Container>
);
