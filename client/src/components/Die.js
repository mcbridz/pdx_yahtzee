import React from "react";
import { FaDiceOne } from "react-icons/fa";
import { FaDiceTwo } from "react-icons/fa";
import { FaDiceThree } from "react-icons/fa";
import { FaDiceFour } from "react-icons/fa";
import { FaDiceFive } from "react-icons/fa";
import { FaDiceSix } from "react-icons/fa";

const Die = (props) => {
  const diceSides = ["One", "Two", "Three", "Four", "Five", "Six"];
  const numDie = diceSides[props.val - 1];
  const lockedStyle = { color: "red" };
  return (
    <div>
      {numDie === "One" && (
        <FaDiceOne
          size={80}
          onClick={() => props.toggleLocked(props.index)}
          disabled={props.rollsRemaining === 0}
          style={props.locked ? lockedStyle : ""}
        />
      )}
      {numDie === "Two" && (
        <FaDiceTwo
          size={80}
          onClick={() => props.toggleLocked(props.index)}
          disabled={props.rollsRemaining === 0}
          style={props.locked ? lockedStyle : ""}
        />
      )}
      {numDie === "Three" && (
        <FaDiceThree
          size={80}
          onClick={() => props.toggleLocked(props.index)}
          disabled={props.rollsRemaining === 0}
          style={props.locked ? lockedStyle : ""}
        />
      )}
      {numDie === "Four" && (
        <FaDiceFour
          size={80}
          onClick={() => props.toggleLocked(props.index)}
          disabled={props.rollsRemaining === 0}
          style={props.locked ? lockedStyle : ""}
        />
      )}
      {numDie === "Five" && (
        <FaDiceFive
          size={80}
          onClick={() => props.toggleLocked(props.index)}
          disabled={props.rollsRemaining === 0}
          style={props.locked ? lockedStyle : ""}
        />
      )}
      {numDie === "Six" && (
        <FaDiceSix
          size={80}
          onClick={() => props.toggleLocked(props.index)}
          disabled={props.rollsRemaining === 0}
          style={props.locked ? lockedStyle : ""}
        />
      )}
    </div>
  );
};

export default Die;
