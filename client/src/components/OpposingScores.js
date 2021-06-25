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
  const [selectedCard, setSelectedScoreCard] = useState(0);
  const [showScoreCards, setShowScoreCards] = useState(false);

  const changeHandler = (index) => {
    return () => {
      console.log("changing selected card to " + index.toString());
      
      const showing = showScoreCards;
      console.log(showing)
      if (!showing) {
        hideScoreCards();
      }
      // document.getElementById("oppossingScoreCard" + selectedCard).display =
      //   "none";
      // document.getElementById("oppossingScoreCard" + index).display = "block";
      // setSelectedScoreCard(index);
      setSelectedScoreCard(index)
    };
  };

  const makeButtons = (opposingPlayerScoreCards) => {
    return opposingPlayerScoreCards.map((opponent, i) => {
      return (
        <button onClick={changeHandler(i)}>
          {opponent.player} - {opponent.grandTotal}
        </button>
      );
    });
  };

  const hideScoreCards = () => {
    console.log("hideScoreCards fired")
    if (!showScoreCards) {
      console.log("Setting buttonsAndCardFlexBox width to inherit")
      document.getElementById("buttonsAndCardFlexBox").style.width = "inherit";
      // document.getElementById("buttonsAndCardFlexBox").style.display = "flex";
      setShowScoreCards(true);
    } else {
      document.getElementById("buttonsAndCardFlexBox").style.width = "0px";
      // document.getElementById("buttonsAndCardFlexBox").style.display = "none";
      setShowScoreCards(false);
    }
  };

  const setHidden = (bool) => {
    if (bool) return { display: "block" };
    else return { display: "none" };
  };

  return (
    <div id="scoreCardsContainer">
      <div id="scoreCardFlexBox">
        <div id="buttonsFlexBox">
          <button id="hideScoreCards" onClick={hideScoreCards}>
            &times;
          </button>
        </div>
        <div id="buttonsAndCardFlexBox">
          <div id="buttonContainer">{makeButtons(props.opposingPlayers)}</div>
          {props.opposingPlayers.map((opponent, i) => {
            return (
              <div
                className="opposingScoreCard"
                key={"oppoPlayerCard" + i}
                style={setHidden(i === selectedCard)}
                id={"oppossingScoreCard" + i}
              >
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OpposingScores;
