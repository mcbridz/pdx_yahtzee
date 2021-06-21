import React, { useState, useEffect, useCallback } from "react";
import ScoreCard from "./ScoreCard";

const OpposingScores = (props) => {
  // const opposingPlayerScorecards = useCallback(() => {
  //   props.opposingPlayers.map((opponent) => {
  //     return (
  //       <div>
  //         <h2>
  //           {opponent.player} - {opponent.grandTotal}{" "}
  //         </h2>
  //       </div>
  //     );
  //   });
  // }, [props.opposingPlayers]);
  // useEffect(() => {
  //   opposingPlayerScorecards();
  // }, [opposingPlayerScorecards]);
  // return ({gameState.started ? opposingPlayerScorecards : ''})


  return props.opposingPlayers.map((opponent) => {
    return (
      <div>
        <h2>
          {opponent.player} - {opponent.grandTotal}{" "}
        </h2>
      </div>
    );
  });
};

export default OpposingScores;
