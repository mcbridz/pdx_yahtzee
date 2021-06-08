import React, { useState } from "react";
import Dice from "./Dice";

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

  const rollDice = (evt) => {
    console.log(dice);
    dice.map((die, i) => {
      setDice(locked[i] ? die : Math.ceil(Math.random() * 6));
      setLocked({
        locked: rollsRemaining > 1 ? locked : Array(numOfDice).fill(true),
      });
      setRollsRemaining({ rollsRemaining: rollsRemaining - 1 });
      setRolling(false);
    });
  };

  const toggleLocked = (i) => {
    if (rollsRemaining > 0 && !rolling) {
      setLocked([...locked.slice(0, i), !locked[i], ...locked.slice(i + 1)]);
    }
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
      />
      <button onClick={rollDice}>Roll</button>
    </div>
  );
};

export default GameBoard;
