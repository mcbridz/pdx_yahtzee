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
    if (props.ourTurn) {
      return messages[props.rollsRemaining];
    } else {
      return "Not your turn";
    }
  };

  return (
    <div id="roll-btn-div">
      <button
        onClick={props.rollDice}
        disabled={props.rollsRemaining === 0 || !props.ourTurn}
        id="roll-btn"
      >
        {rollMessage()}
      </button>
    </div>
  );
};

export default RollButton;
