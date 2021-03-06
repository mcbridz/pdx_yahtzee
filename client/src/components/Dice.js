import React from "react";
import Die from "./Die";
import "../styles/Dice.css";

const Dice = (props) => {
  const lockedStyle = { color: "red" };
  return (
    <div id="dice-container">
      {props.dice.map((die, index) => (
        <Die
          val={die}
          style={props.locked ? lockedStyle : ""}
          locked={props.locked[index]}
          key={index}
          index={index}
          rolling={props.rolling && !props.locked[index]}
          toggleLocked={props.toggleLocked}
          rollsRemaining={props.rollsRemaining}
          disabled={props.rollsRemaining === 0 || !props.ourTurn}
          ourTurn={props.ourTurn}

        />
      ))}
    </div>
  );
};

export default Dice;
