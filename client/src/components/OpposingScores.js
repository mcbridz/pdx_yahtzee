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
  const [selectedCard, setSelectedScoreCard] = useState(0)
  const [showScoreCards, setShowScoreCards] = useState(true)

  const changeHandler = (index) => {
    return () => {
      console.log("changing selected card to " + index.toString())
      const showing = showScoreCards;
      if (!showing) {
        hideScoreCards();
      }
      setSelectedScoreCard(index)
    }
  }

  const makeButtons = (opposingPlayerScoreCards) => {
    return opposingPlayerScoreCards.map((opponent, i) => {
      return <button onClick={changeHandler(i)}>{opponent.player}</button>
    })
  }

  const hideScoreCards = () => {
    if (showScoreCards) {
      document.getElementById("buttonsAndCardFlexBox").style.width = "0px";
      // document.getElementById("buttonsAndCardFlexBox").style.display = "none";
      setShowScoreCards(false)
    } else {      
      document.getElementById("buttonsAndCardFlexBox").style.width = "inherit";
      // document.getElementById("buttonsAndCardFlexBox").style.display = "flex";
      setShowScoreCards(true)
    }
  }

  return <div id="scoreCardsContainer">
    <div id="scoreCardFlexBox">
      <div id="buttonsFlexBox">
        <button id="hideScoreCards" onClick={hideScoreCards}>&times;</button>
      </div>
      <div id="buttonsAndCardFlexBox">
        <div id="buttonContainer">
          {makeButtons(props.opposingPlayers)}
        </div>
        {props.opposingPlayers.map((opponent, i) => {
          return (
            <div className="opposingScoreCard" key={"oppoPlayerCard" + i} style={{ display: (i === selectedCard) ? "block" : "none" }}>
              {/* {console.log(opponent)} */}
              <ScoreCard
                scoreCard={props.opposingPlayers[i]}
                dice={props.dice}
                markScore={props.markScore}
                gameState={props.gameState}
                ourTurn={props.ourTurn}
                version={1}
                key={i}
              />
            </div>
          )
        })}
      </div>
    </div>
  </div>
};


export default OpposingScores;
