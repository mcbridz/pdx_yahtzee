import React, { useState } from "react";
import "../styles/ScoreLine.css";

const ScoreLine = (props) => {
  const [score, setScore] = useState(undefined);

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

  return (
    <div>
      <td colspan="3" className="score-line-description">
        {score === undefined ? upperScoresDescriptions[props.value] : ""}
      </td>
      <td colspan="1" className="score-line-score">
        {score === undefined ? "" : score}
      </td>
    </div>
  );
};

export default ScoreLine;
