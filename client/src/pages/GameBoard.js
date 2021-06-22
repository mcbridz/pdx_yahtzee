import React, { useState, useEffect, useCallback } from "react";
import Chat from "../components/Chat";
import { useHistory } from "react-router-dom";

import Dice from "../components/Dice";
import RollButton from "../components/RollButton";
import ScoreCard from "../components/ScoreCard";
import "../styles/GameTable.css";
import OpposingScores from "../components/OpposingScores";

const numOfDice = 5;
const numOfRolls = 3;

const GameBoard = (props) => {
  const locked = props.locked;
  const setLocked = props.setLocked;
  const dice = props.dice;
  const setDice = props.setDice;
  const rolling = props.rolling;
  const setRolling = props.setRolling;
  const rollsRemaining = props.rollsRemaining;
  const setRollsRemaining = props.setRollsRemaining;

  const history = useHistory();

  const initiateRoll = () => {
    setRolling(true);

    rollDice({});
  };

  const checkLoginStatus = useCallback(() => {
    if (props.credentials.username === "") {
      history.push("/login");
    }
  }, [props.credentials, history]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const rollDice = (evt) => {
    const rolls = [];
    for (let i = 0; i < numOfDice; i++) {
      if (locked[i]) {
        rolls.push(dice[i]);
      } else {
        dice[i] = Math.ceil(Math.random() * 6);
        rolls.push(dice[i]);
      }
      console.log(rolls);
      setDice(rolls);
      console.log("EMITTING DICE");
      props.emitDice(rolls);
    }

    // setLocked({
    //   locked: rollsRemaining > 0 ? locked : Array(numOfDice).fill(true),
    // });
    setRollsRemaining(rollsRemaining - 1);
    setRolling(false);
  };

  const toggleLocked = (i) => {
    console.log(i);
    let lockedArr = [...locked.slice(0, i), !locked[i], ...locked.slice(i + 1)];
    setLocked(lockedArr);
  };

  return (
    <div className="game-table">
      <div id="dice-btn-container">
        {props.gameState.started ? (
          <div>
            {!props.ourTurn ? (
              <p>{props.gameState.currentPlayer.username}'s turn</p>
            ) : (
              ""
            )}
            <div id="dice-div">
              <Dice
                dice={props.dice}
                setDice={props.setDice}
                locked={props.locked}
                setLocked={props.setLocked}
                rolling={props.rolling}
                setRolling={props.setRolling}
                rollDice={props.rollDice}
                toggleLocked={toggleLocked}
                rollsRemaining={props.rollsRemaining}
                disabled={props.rollsRemaining === 0}
                ourTurn={props.ourTurn}
              />
            </div>
            <RollButton
              initiateRoll={initiateRoll}
              rollsRemaining={rollsRemaining}
              rollDice={rollDice}
              ourTurn={props.ourTurn}
            />
          </div>
        ) : (
          <button onClick={props.startGame(props.gameState._id)}>
            Start Game
          </button>
        )}
      </div>
      <Chat version={0} value={0} credentials={props.credentials} />
      <ScoreCard
        scoreCard={props.scoreCard}
        dice={dice}
        markScore={props.markScore}
        gameState={props.gameState}
        ourTurn={props.ourTurn}
        rollsRemaining={props.rollsRemaining}
        version={0}
      />
      {/* <OpposingScores
        scoreCard={props.scoreCard}
        dice={dice}
        markScore={props.markScore}
        gameState={props.gameState}
        ourTurn={props.ourTurn}
        version={0}
        opposingPlayers={props.opposingPlayers}
      /> */}
    </div>
  );
};

export default GameBoard;
