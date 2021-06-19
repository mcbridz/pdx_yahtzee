import React, { useState, useEffect, useCallback } from "react";
import Chat from "../components/Chat";
import { useHistory } from "react-router-dom";

import Dice from "../components/Dice";
import RollButton from "../components/RollButton";
import ScoreCard from "../components/ScoreCard";
import "../styles/GameTable.css";


const numOfDice = 5;
const numOfRolls = 3;

const GameBoard = (props) => {

  const locked = props.locked
  const setLocked = props.setLocked
  const dice = props.dice
  const setDice = props.setDice
  const rolling = props.rolling
  const setRolling = props.setRolling
  const rollsRemaining = props.rollsRemaining
  const setRollsRemaining = props.setRollsRemaining

  const history = useHistory();

  const initiateRoll = () => {
    setRolling(true);

    // setTimeout(rollDice, 1000);
    rollDice({})
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
    // console.log(dice);
    const rolls = [];
    for (let i = 0; i < numOfDice; i++) {
      if (locked[i]) {
        rolls.push(dice[i]);
      } else {
        dice[i] = Math.ceil(Math.random() * 6);
        rolls.push(dice[i]);
      }
      console.log(rolls)
      setDice(rolls);
      console.log('EMITTING DICE')
      props.emitDice(rolls)
    }

    // setLocked({
    //   locked: rollsRemaining > 0 ? locked : Array(numOfDice).fill(true),
    // });
    setRollsRemaining(rollsRemaining - 1);
    setRolling(false);
  };

  const scoreMove = (section, ruleFn) => {
    console.log("getting through?");
    props.setScoreCard({ ...props.scoreCard, [section]: ruleFn(dice) });
  };

  const toggleLocked = (i) => {
    console.log(i);
    let lockedArr = [...locked.slice(0, i), !locked[i], ...locked.slice(i + 1)];
    setLocked(lockedArr);
  };

  return (
    <div id="game-table">
      <div>{props.gameState.turnNum }</div>
      <div id="dice-btn-container">
        {(props.gameState.started) ? <div>
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
          />
          </div>
          <RollButton
          initiateRoll={initiateRoll}
            rollsRemaining={rollsRemaining}
            rollDice={rollDice}
        />
        </div>:<button onClick={props.startGame(props.gameState._id)}>Start Game</button>}
        
      </div>
      <Chat version={0} value={0} credentials={props.credentials} />
      <ScoreCard
        scoreCard={props.scoreCard}
        setScoreCard={props.setScoreCard}
        dice={dice}
        scoreMove={scoreMove}
        markScore={props.markScore}
        gameState={props.gameState}
      />
    </div>
  );
};

export default GameBoard;
