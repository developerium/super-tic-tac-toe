import React, { FC } from 'react';
import styled from 'styled-components';

interface PlayerAvatarProps {
  selected?: boolean;
  index: number;
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
  index
}) => (
  <Container selected={selected}>
    <Icon className={`nes-text ${className}`}>P{index + 1}</Icon>
  </Container>
);
