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
  const [locked, setLocked] = useState(Array(numOfDice).fill(false));
  const [dice, setDice] = useState(Array.from({ length: numOfDice }));
  const [rolling, setRolling] = useState(false);
  const [rollsRemaining, setRollsRemaining] = useState(numOfRolls);

  const history = useHistory();

  const initiateRoll = () => {
    setRolling(true);

    setTimeout(rollDice, 1000);
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
    console.log(dice);
    const rolls = [];
    for (let i = 0; i < numOfDice; i++) {
      if (locked[i]) {
        rolls.push(dice[i]);
      } else {
        dice[i] = Math.ceil(Math.random() * 6);
        rolls.push(dice[i]);
      }
      setDice(rolls);
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
      <div id="dice-btn-container">
        <div id="dice-div">
          <Dice
            dice={dice}
            setDice={setDice}
            locked={locked}
            setLocked={setLocked}
            rolling={rolling}
            setRolling={setRolling}
            rollDice={rollDice}
            toggleLocked={toggleLocked}
            rollsRemaining={rollsRemaining}
            disabled={rollsRemaining === 0}
          />
        </div>
        <RollButton
          initiateRoll={initiateRoll}
          rollsRemaining={rollsRemaining}
        />
      </div>
      <Chat version={0} value={0} credentials={props.credentials} />
      <ScoreCard
        scoreCard={props.scoreCard}
        setScoreCard={props.setScoreCard}
        dice={dice}
        scoreMove={scoreMove}
        // markScore={props.markScore}
      />
    </div>
  );
};

export default GameBoard;
