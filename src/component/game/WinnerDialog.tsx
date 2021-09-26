import React, { FC } from 'react';

interface WinnerDialogProps {
  winner: string;
  newGame?: () => void;
}

export const WinnerDialog: FC<WinnerDialogProps> = ({ winner, newGame }) => (
  <dialog className="nes-dialog" open>
    <form method="dialog">
      <p className="title">Game over</p>
      <p>{winner} is the winner</p>
      <p>Good job :)</p>
      <menu className="dialog-menu">
        <button className="nes-btn is-primary" onClick={newGame}>
          Play again
        </button>
      </menu>
    </form>
  </dialog>
);
