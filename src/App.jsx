import { useState } from "react";
import './App.css';
import Board from './componentes/Board/Board';
import SquareBoard from './componentes/ScoreBoard/ScoreBoard';

const posicionesGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [turn, setTurn] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setScore({ X: 0, O: 0 });
  };

  const comprobarGanados = newSquare => {
    for (let i = 0; i < posicionesGanadoras.length; i++) {
      const [a, b, c] = posicionesGanadoras[i];
      if (newSquare[a] && newSquare[a] === newSquare[b] && newSquare[a] === newSquare[c]) {
        andGame(newSquare, posicionesGanadoras[i]);
        return;
      }
    }

    if (!newSquare.includes(null)) {
      andGame(null, Array.from(Array(10).keys()));
      return;
    }
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const manejadorClick = squareIndex => {
    let newSquares = [...squares];
    newSquares.splice(squareIndex, 1, turn);
    setSquares(newSquares);
    comprobarGanados(newSquares);
  };

  const finDelJuego = (result, posicionesGanadoras) => {
    setTurn(null);
    if (result !== null) {
      setScore({ ...score, [result]: score[result] + 1 });
    }
    setWinningSquares(posicionesGanadoras);
    setTimeout(reset, 2000);
  };

  return (
    <>
      <h1 className="title">TaTeTi</h1>
      <p className="title">Este es un tateti creado con react.js</p>

      <div className="container">
        <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={manejadorClick} />
        <ScoreBoard scoreO={score.O} scoreX={score.X} />
      </div>
    </>
  );
}

export default App;