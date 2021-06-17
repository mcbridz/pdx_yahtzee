import React, { useState } from "react";

const LittleScoreLine = (props) => {
  const [score, setScore] = useState(undefined);
  return <td id="upper-total-score">{score}</td>;
};

export default LittleScoreLine;
