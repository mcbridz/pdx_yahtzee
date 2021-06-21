import React from "react";

const LittleScoreLine = (props) => {
  const version = ["", "-mini"];
  
  return <td className={"upper-total-score"+ version[props.version]}>{props.scores}</td>;
};

export default LittleScoreLine;
