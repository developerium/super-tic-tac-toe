import React, { FC } from 'react';
import styled from 'styled-components';

import { Player } from '../game-context/GameContext';
import { Pin } from '../../game/tile/tile';

interface PlayerPieceProps {
  player: Player;
}

const Large = styled.h3``;
const Medium = styled.h4``;
const Small = styled.h5``;

export const PlayerPiece: FC<PlayerPieceProps> = ({ player }) => {
  return (
    <div className={`nes-text ${player.cssClass}`}>
      <Large>large: {player.pieces[Pin.Large]}</Large>
      <Medium>medium: {player.pieces[Pin.Medium]}</Medium>
      <Small>small: {player.pieces[Pin.Small]}</Small>
    </div>
  );
};
