import './Square.css';
import classNames from 'classnames';

const Square = ({ value, onClick, turn, winner }) => {

    const manejarClick = () => {
        (turn !== null && value === null) && onClick();
    };

    let squareClass = classNames({
        square: true,
        [`square--${value}`]: value !== null,  // Utilizar backticks aquí
        winner: winner,  
    });

  return (
    <div className={squareClass} onClick={() => manejarClick()}></div> 
  );
};

export default Square;