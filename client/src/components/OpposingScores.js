import React, { useState} from "react";
import ScoreCard from "./ScoreCard";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const OpposingScores = (props) => {
 
  const [selectedCard, setSelectedScoreCard] = useState(0);
  const [showScoreCards, setShowScoreCards] = useState(false);

  const changeHandler = (index) => {
    return () => {
      console.log("changing selected card to " + index.toString());

      const showing = showScoreCards;
      console.log(showing);
      if (!showing) {
        hideScoreCards();
      }
      
      setSelectedScoreCard(index);
    };
  };

  const makeButtons = (opposingPlayerScoreCards) => {
    return opposingPlayerScoreCards.map((opponent, i) => {
      return (
        <button className="opponent-title" onClick={changeHandler(i)}>
          {opponent.player}
        </button>
      );
    });
  };

  const hideScoreCards = () => {
    console.log("hideScoreCards fired");
    if (!showScoreCards) {
      console.log("Setting buttonsAndCardFlexBox width to inherit");
      document.getElementById("buttonsAndCardFlexBox").style.width = "inherit";
      // document.getElementById("buttonsAndCardFlexBox").style.display = "flex";
      setShowScoreCards(true);
    } else {
      document.getElementById("buttonsAndCardFlexBox").style.width = "70px";
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
            {showScoreCards ? (
              <FaArrowCircleRight size={28} color="white" />
            ) : (
              <FaArrowCircleLeft size={28} color="white" />
            )}
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
                <p className="opposing-player-indicator">
                  {opponent.player}'s Scorecard
                </p>
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
