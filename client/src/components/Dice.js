import React from "react";
import Die from "./Die";

const Dice = (props) => {
  return (
    <div>
      {console.log(props.dice)}
      {props.dice.map((die, index) => (
        <Die
          val={die}
          locked={props.locked[index]}
          key={index}
          index={index}
          rolling={props.rolling && !props.locked[index]}
          toggleLocked={props.toggleLocked}
        />
      ))}
    </div>
  );
};

export default Dice;
