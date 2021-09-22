import React, { FC } from 'react';
import styled from 'styled-components';

import { Player } from '../../game/player-manager/player-manager';

interface PlayerAvatarProps {
  selected?: boolean;
  player: Player;
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
  player,
}) => (
  <Container selected={selected}>
    <Icon className={`nes-text ${player.cssClass}`}>P{player.index + 1}</Icon>
  </Container>
);
