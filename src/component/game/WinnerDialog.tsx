import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface WinnerDialogProps {
  winner: string;
  newGame?: () => void;
}

const StyledDialog = styled.dialog`
  width: 100%;
  top: 25%;
`;

export const WinnerDialog: FC<WinnerDialogProps> = ({ winner, newGame }) => (
  <StyledDialog className="nes-dialog" open>
    <form method="dialog">
      <p className="title">Game over</p>
      <p>{winner} is the winner!!</p>
      <p>Good job :)</p>
      <menu className="dialog-menu">
        <Link to="/game-setting" className="nes-btn">
          Change settings
        </Link>
        &nbsp;
        <button className="nes-btn is-primary" onClick={newGame}>
          Play again
        </button>
      </menu>
    </form>
  </StyledDialog>
);
