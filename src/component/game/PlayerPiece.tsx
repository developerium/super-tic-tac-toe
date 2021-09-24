import React, { FC } from 'react';
import styled from 'styled-components';
import { Pin } from '../../game/tile/tile';

const BasePiece = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SmallPiece = styled(BasePiece)`
  width: 40px;
  height: 40px;
`;

const MediumPiece = styled(BasePiece)`
  width: 60px;
  height: 60px;
`;

const LargePiece = styled(BasePiece)`
  width: 80px;
  height: 80px;
`;

interface PlayerPieceProps {
  pin: Pin;
  className?: string;
}

export const PlayerPiece: FC<PlayerPieceProps> = ({
  pin,
  children,
  className,
}) => {
  switch (pin) {
  case Pin.Small:
    return (
      <SmallPiece className={`nes-btn ${className}`}>{children}</SmallPiece>
    );
  case Pin.Medium:
    return (
      <MediumPiece className={`nes-btn ${className}`}>{children}</MediumPiece>
    );
  case Pin.Large:
    return (
      <LargePiece className={`nes-btn ${className}`}>{children}</LargePiece>
    );
  default:
    return <div>unknown pin received</div>;
  }
};
