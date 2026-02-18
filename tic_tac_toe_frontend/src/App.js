import React, { useMemo, useState } from "react";
import "./App.css";

/**
 * Calculate the winner (if any) for the provided squares.
 * Returns 'X', 'O', or null.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * True when all squares are filled and there is no winner.
 */
function isDraw(squares) {
  return squares.every((v) => v !== null) && !calculateWinner(squares);
}

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => isDraw(squares), [squares]);

  const currentPlayer = xIsNext ? "X" : "O";

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "It’s a draw!";
    return `Turn: ${currentPlayer}`;
  }, [winner, draw, currentPlayer]);

  // PUBLIC_INTERFACE
  function handleSquareClick(index) {
    // Ignore clicks if game over or square already filled.
    if (winner || squares[index] !== null) return;

    setSquares((prev) => {
      const next = [...prev];
      next[index] = xIsNext ? "X" : "O";
      return next;
    });
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="App">
      <main className="page">
        <section className="card" aria-label="Tic Tac Toe game">
          <header className="header">
            <div className="titleWrap">
              <h1 className="title">Tic Tac Toe</h1>
              <p className="subtitle">Two players • Same device</p>
            </div>

            <div className="statusArea" aria-live="polite">
              <span
                className={[
                  "statusPill",
                  winner ? "statusPill--winner" : "",
                  draw ? "statusPill--draw" : "",
                ].join(" ")}
              >
                {statusText}
              </span>
            </div>
          </header>

          <div className="boardWrap">
            <div className="board" role="grid" aria-label="3 by 3 board">
              {squares.map((value, idx) => {
                const isDisabled = Boolean(winner) || value !== null;
                const label = value
                  ? `Square ${idx + 1}, ${value}`
                  : `Square ${idx + 1}, empty`;

                return (
                  <button
                    key={idx}
                    type="button"
                    className={[
                      "square",
                      value === "X" ? "square--x" : "",
                      value === "O" ? "square--o" : "",
                    ].join(" ")}
                    onClick={() => handleSquareClick(idx)}
                    disabled={isDisabled}
                    role="gridcell"
                    aria-label={label}
                  >
                    <span className="squareValue" aria-hidden="true">
                      {value ?? ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <footer className="footer">
            <div className="helpText">
              {winner || draw ? (
                <span>Game over. Press reset to play again.</span>
              ) : (
                <span>
                  Players take turns placing <strong>X</strong> and{" "}
                  <strong>O</strong>.
                </span>
              )}
            </div>

            <button type="button" className="resetBtn" onClick={resetGame}>
              Reset
            </button>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
