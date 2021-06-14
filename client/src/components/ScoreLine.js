import React, { useState } from "react";
import "../styles/ScoreLine.css";
import { UpperScores } from "./ScoreCard";
const ScoreLine = (props) => {
  const { scores, setScores, version } = props;
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
    "grandTotal"
  ];

  const testArr = ["aces", "twos"];

  return (
    <div>
      <td
        colSpan="3"
        className="score-line-description"
        onClick={() => console.log(allScores[version])}
      >
        {scores.version === undefined
          ? upperScoresDescriptions[props.value]
          : ""}
      </td>
      <td colSpan="1" className="score-line-score">
        {scores.version === undefined ? "" : scores.version}
      </td>
    </div>
  );
};

export default ScoreLine;
