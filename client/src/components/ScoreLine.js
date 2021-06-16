import React, { useState } from "react";
import "../styles/ScoreLine.css";

const ScoreLine = (props) => {
  const upperScoresDescriptions = [
    "Sum of all aces",
    "Sum of all twos",
    "Sum of all threes",
    "Sum of all fours",
    "Sum of all fives",
    "Sum of all sixes",
    "Add total of all dice",
    "Score 25",
    "Four consecutive dice, Score 30",
    "Five consecutive dice, Score 40",
    "Score 50",
  ];

  const allScores = [
    "aces",
    "twos",
    "threes",
    "fours",
    "fives",
    "sixes",
    "3ofAKind",
    "4ofAKind",
    "fullHouse",
    "smStraight",
    "lgStraight",
    "yahtzee",
    "chance",
    "upperPreBonus",
    "upperBonus",
    "upperWithBonus",
    "lowerTotal",
    "grandTotal",
  ];

  return (
    <div>
      <td colSpan="3" className="score-line-description">
        {!props.disabled
          ? upperScoresDescriptions[props.description]
          : props.scores}
      </td>
    </div>
  );
};

export default ScoreLine;
