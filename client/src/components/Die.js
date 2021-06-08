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

  return (
    <div>
      {numDie === "One" && <FaDiceOne size={64} onClick={props.toggleLocked} />}
      {numDie === "Two" && <FaDiceTwo size={64} onClick={props.toggleLocked} />}
      {numDie === "Three" && (
        <FaDiceThree size={64} onClick={props.toggleLocked} />
      )}
      {numDie === "Four" && (
        <FaDiceFour size={64} onClick={props.toggleLocked} />
      )}
      {numDie === "Five" && (
        <FaDiceFive size={64} onClick={props.toggleLocked} />
      )}
      {numDie === "Six" && <FaDiceSix size={64} onClick={props.toggleLocked} />}
    </div>
  );
};

export default Die;
