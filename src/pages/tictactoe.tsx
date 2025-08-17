import React, { useState } from "react";
import "./static/style/main.css";

const gameStatus = {
  TIE: "Tie",
  ONGOING: "Next player",
  WINNER: "Winner",
};

let status: string = gameStatus.ONGOING;
let winner: string = "";

const createEmptyBoard = () =>
  Array(3)
    .fill(null)
    .map(() => Array(3).fill(""));

function renderStatus(status: string, currentPlayer: string) {
  switch (status) {
    case gameStatus.TIE:
      return status;
    case gameStatus.ONGOING:
      return `${status}: ${currentPlayer}`;
    case gameStatus.WINNER:
      return `${status}: ${winner}`;
  }
}

const winConditions = [
  // rows
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],

  // cols
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],

  // diagonals
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState("X");

  function checkWinner() {
    for (const [[aRow, aCol], [bRow, bCol], [cRow, cCol]] of winConditions) {
      // Loop through every possible wind condition and assess if they're present
      // on the current board
      const a = board[aRow][aCol];
      const b = board[bRow][bCol];
      const c = board[cRow][cCol];

      // if a set of three coordinates exist with valid win conditions
      if (a && a === b && a === c) {
        status = gameStatus.WINNER;
        return a; // a will be the winning player, X or O
      }
    }

    return null;
  }

  function checkBoardFull() {
    for (let row of board) {
      for (let cell of row) {
        if (cell === "") return false;
      }
    }
    return true;
  }

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] != "" || winner != null) return;

    board[rowIndex][colIndex] = currentPlayer;

    setBoard(board);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

    winner = checkWinner();

    // If no winner and board is full, then game is tied
    if (checkBoardFull()) status = gameStatus.TIE;
  };

  const resetBoard = () => {
    setBoard(createEmptyBoard());
    status = gameStatus.ONGOING;
  };

  return (
    <>
      <div className="game">
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <h1>Tic Tac Toe!</h1>
          <div className="status">{renderStatus(status, currentPlayer)}</div>
          <div className="reset">
            <button onClick={resetBoard}>Reset</button>
          </div>
        </div>

        <div className="board">
          {board.map((row, rowIndex) => {
            return (
              <div className="row" key={rowIndex}>
                {row.map((_, colIndex) => {
                  const position = rowIndex * 3 + colIndex;
                  return (
                    <div
                      className="square"
                      key={position}
                      onClick={() => handleClick(rowIndex, colIndex)}
                    >
                      {" "}
                      {board[rowIndex][colIndex]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
