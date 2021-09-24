import React, { FC } from 'react';
import styled from 'styled-components';
import { Pin } from '../../game/tile/tile';

const BasePiece = styled.div`
  border-radius: 50%;
  background-color: red;
  width: 30px;
  height: 30px;
`;

const SmallPiece = styled(BasePiece)`
  width: 30px;
  height: 30px;
`;

const MediumPiece = styled(BasePiece)`
  width: 60px;
  height: 60px;
`;

const LargePiece = styled(BasePiece)`
  width: 90px;
  height: 90px;
`;

interface PlayerPieceProps {
  pin: Pin;
}

export const PlayerPiece: FC<PlayerPieceProps> = ({ pin, children }) => {
  switch (pin) {
  case Pin.Small:
    return <SmallPiece>{children}</SmallPiece>;
  case Pin.Medium:
    return <MediumPiece>{children}</MediumPiece>;
  case Pin.Large:
    return <LargePiece>{children}</LargePiece>;
  default:
    return <div>unknown pin received</div>;
  }
};
