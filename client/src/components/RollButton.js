import React from "react";
import "../styles/RollButton.css";

const RollButton = (props) => {
  const rollMessage = () => {
    let messages = [
      "No rolls remaining",
      "One roll remaining",
      "Two rolls remaining",
      "Start your turn!",
    ];
    return messages[props.rollsRemaining];
  };

  return (
    <div id="roll-btn-div">
      <button
        onClick={props.rollDice}
        disabled={props.rollsRemaining === 0}
        id="roll-btn"
      >
        {rollMessage()}
      </button>
    </div>
  );
};

export default RollButton;
