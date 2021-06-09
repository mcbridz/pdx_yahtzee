import React, { useState } from "react";

import Dice from "../components/Dice";
import RollButton from "../components/RollButton";

const numOfDice = 5;
const numOfRolls = 3;

const GameBoard = () => {
  const [locked, setLocked] = useState(Array(numOfDice).fill(false));
  const [dice, setDice] = useState(Array.from({ length: numOfDice }));
  const [rolling, setRolling] = useState(false);
  const [rollsRemaining, setRollsRemaining] = useState(numOfRolls);
  const [scores, setScores] = useState({
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    upperScore: undefined,
    bonus: false,
    totalUpperScore: undefined,
    threeOfAKind: undefined,
    fourOfAKind: undefined,
    fullHouse: undefined,
    smallStraight: undefined,
    largeStraight: undefined,
    yahtzee: undefined,
    chance: undefined,
    yahtzeeBonus: 0,
    totalLowerScore: undefined,
    totalScore: undefined,
  });

  const initiateRoll = () => {
    setRolling(true);

    setTimeout(rollDice, 1000);
  };

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

  const toggleLocked = (i) => {
    console.log(i);
    let lockedArr = [...locked.slice(0, i), !locked[i], ...locked.slice(i + 1)];
    setLocked(lockedArr);
  };

  return (
    <div>
      <h1>Hey it's yahtzee!</h1>
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
      <RollButton initiateRoll={initiateRoll} rollsRemaining={rollsRemaining} />
    </div>
  );
};

export default GameBoard;