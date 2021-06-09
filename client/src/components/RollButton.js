import React from "react";

const RollButton = (props) => {
  const rollMessage = () => {
    let messages = [
      "No rolls remaining",
      "One roll remaining",
      "Two rolls remaining",
      "Start turn",
    ];
    return messages[props.rollsRemaining];
  };

  return (
    <div>
      <button
        onClick={props.initiateRoll}
        disabled={props.rollsRemaining === 0}
      >
        {rollMessage()}
      </button>
    </div>
  );
};

export default RollButton;
