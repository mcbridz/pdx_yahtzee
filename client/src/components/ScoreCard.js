import React, { useState } from "react";
import ScoreLine from "./ScoreLine";
import "../styles/ScoreCard.css";
import LittleScoreLine from "./LittleScoreLine";
import {
  sum,
  sameDice,
  count,
  fullHouse,
  smStraight,
  lgStraight,
  yahtzee,
  threeOfAKind,
  fourOfAKind,
  chance,
} from "../ScoringRules";

const ScoreCard = (props) => {
  // const [numOfChecks, setNumOfChecks] = useState(0);
  const upperScores = ["Aces", "Twos", "Threes", "Fours", "Fives", "Sixes"];
  const lowerScores = [
    "3 of a kind",
    "4 of a kind",
    "Full House",
    "Sm. Straight",
    "Lg. Straight",
    "YAHTZEE",
    "Chance",
  ];

  const sendOrder = (task) => {
    const taskObj = {
      game: props.gameState._id,
      scoreCard: props.scoreCard.id,
      tasks: task,
    };
    props.markScore(taskObj);
  };

  const scoreAces = () => {
    return () => {
      const dice = props.dice;
      let acesAmount = count(dice, 1);
      const acesTask = [{ task: "markAces", data: acesAmount }];
      sendOrder(acesTask);
    };
  };

  const scoreTwos = () => {
    return () => {
      const dice = props.dice;
      let twosAmount = count(dice, 2);
      const twosTask = [{ task: "markTwos", data: twosAmount }];
      sendOrder(twosTask);
    };
  };

  const scoreThrees = () => {
    return () => {
      const dice = props.dice;
      let threesAmount = count(dice, 3);
      const threesTask = [{ task: "markThrees", data: threesAmount }];
      sendOrder(threesTask);
    };
  };

  const scoreFours = () => {
    return () => {
      const dice = props.dice;
      let foursAmount = count(dice, 4);
      const foursTask = [{ task: "markFours", data: foursAmount }];
      sendOrder(foursTask);
    };
  };

  const scoreFives = () => {
    return () => {
      const dice = props.dice;
      let fivesAmount = count(dice, 5);
      const fivesTask = [{ task: "markFives", data: fivesAmount }];
      sendOrder(fivesTask);
    };
  };

  const scoreSixes = () => {
    return () => {
      const dice = props.dice;
      let sixesAmount = count(dice, 6);
      const sixesTask = [{ task: "markSixes", data: sixesAmount }];
      sendOrder(sixesTask);
    };
  };

  const scoreFullHouse = () => {
    return () => {
      const dice = props.dice;
      let fullHouseScore = fullHouse(dice);
      const fullHouseTask = [{ task: "markFullHouse", data: fullHouseScore }];
      sendOrder(fullHouseTask);
    };
  };

  const scoreSmStraight = () => {
    return () => {
      const dice = props.dice;
      let smStraightScore = smStraight(dice);
      console.log(smStraightScore);
      const smStraightTask = [
        { task: "markSmStraight", data: smStraightScore },
      ];
      sendOrder(smStraightTask);
    };
  };

  const scoreLgStraight = () => {
    return () => {
      const dice = props.dice;
      let lgStraightScore = lgStraight(dice);
      const lgStraightTask = [
        { task: "markLgStraight", data: lgStraightScore },
      ];
      sendOrder(lgStraightTask);
    };
  };

  const scoreYahtzee = () => {
    return () => {
      const dice = props.dice;
      let yahtzeeScore = yahtzee(dice);
      const yahtzeeTask = [{ task: "markYahtzee", data: yahtzeeScore }];
      sendOrder(yahtzeeTask);
    };
  };

  const scoreThreeOfAKind = () => {
    return () => {
      const dice = props.dice;
      let threeOfAKindScore = threeOfAKind(dice);
      const threeOfAKindTask = [
        { task: "markThreeOfAKind", data: threeOfAKindScore },
      ];
      sendOrder(threeOfAKindTask);
    };
  };

  const scoreFourOfAKind = () => {
    return () => {
      const dice = props.dice;
      let fourOfAKindScore = fourOfAKind(dice);
      const fourOfAKindTask = [
        { task: "markFourOfAKind", data: fourOfAKindScore },
      ];
      sendOrder(fourOfAKindTask);
    };
  };

  const scoreChance = () => {
    return () => {
      const dice = props.dice;
      let chanceScore = sum(dice);
      console.log(chanceScore);
      const chanceTask = [{ task: "markChance", data: chanceScore }];
      sendOrder(chanceTask);
    };
  };

  const disabled =
    props.rollsRemaining === 0 || props.dice[0] === undefined || !props.ourTurn;

  return (
    <div className="score-card">
      <table className="upper-scores-table">
        <thead>
          <tr>
            <th colSpan="12" className="section-header">
              Upper Scores
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="aces-row">
            <td
              colSpan="2"
              className="upper-scores-category-title rounded-top"
              // disabled={!props.ourTurn || props.dice[0] === undefined}
              onClick={
                !disabled || !props.scoreCard.upperSection[0].marked
                  ? scoreAces()
                  : ""
              }
              // disabled={disabled}
            >
              {upperScores[0]} <span className="dice-icon">&#x2680;</span>
            </td>
            <td className="spacer"></td>
            <ScoreLine
              description={0}
              disabled={props.scoreCard.upperSection[0].marked}
              marked={props.scoreCard.upperSection[0].marked}
              name="aces"
              scores={props.scoreCard.upperSection[0].aces}
            />
            <td className="spacer"> </td>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreFours() : ""}
            >
              {upperScores[3]}
              <span className="dice-icon"> &#x2683;</span>
            </td>
            <td className="spacer"></td>
            <ScoreLine
              description={3}
              disabled={props.scoreCard.upperSection[3].marked}
              name="fours"
              scores={props.scoreCard.upperSection[3].fours}
              marked={props.scoreCard.upperSection[3].marked}
            />
          </tr>

          <tr>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreTwos() : ""}
            >
              {upperScores[1]} <span className="dice-icon">&#x2681;</span>
            </td>
            <td className="spacer"></td>
            <ScoreLine
              description={1}
              scores={props.scoreCard.upperSection[1].twos}
              disabled={props.scoreCard.upperSection[1].marked}
              name="twos"
              marked={props.scoreCard.upperSection[1].marked}
            />
            <td className="spacer">{/* {" "} */}</td>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreFives() : ""}
            >
              {upperScores[4]} <span className="dice-icon">&#x2684;</span>
            </td>
            <td colSpan="1" className="spacer"></td>
            <ScoreLine
              description={4}
              scores={props.scoreCard.upperSection[4].fives}
              disabled={props.scoreCard.upperSection[4].marked}
              name="fives"
              marked={props.scoreCard.upperSection[4].marked}
            />
          </tr>

          <tr>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreThrees() : ""}
            >
              {upperScores[2]} <span className="dice-icon">&#x2682;</span>
            </td>
            <td colSpan="1" className="spacer"></td>
            <ScoreLine
              description={2}
              scores={props.scoreCard.upperSection[2].threes}
              disabled={props.scoreCard.upperSection[2].marked}
              name="threes"
              marked={props.scoreCard.upperSection[2].marked}
            />
            <td colSpan="1" className="spacer">
              {/* {" "} */}
            </td>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreSixes() : ""}
            >
              {upperScores[5]} <span className="dice-icon">&#x2685;</span>
            </td>
            <td colSpan="1" className="spacer"></td>
            <ScoreLine
              description={5}
              scores={props.scoreCard.upperSection[5].sixes}
              disabled={props.scoreCard.upperSection[5].marked}
              name="sixes"
              marked={props.scoreCard.upperSection[5].marked}
            />
          </tr>
          <br />
        </tbody>
      </table>

      <table className="upper-totals-table">
        <thead>
          <tr>
            <th colSpan="12" className="upper-totals-table-header">
              Upper Scores Totals
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td className="upper-total-desc">Upper Scores Total</td>
            <td colSpan="1" className="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.upperSectionTotal}
              name="upperSectionTotalBonus"
            />
            <td colSpan="1" className="spacer"></td>
            <td className="upper-total-desc">Bonus</td>
            <td colSpan="1" className="spacer"></td>
            <LittleScoreLine scores={props.scoreCard.bonus} name="upperBonus" />
            <td colSpan="1" className="spacer"></td>
            <td className="upper-total-desc">Upper Scores w/ Bonus</td>
            <td colSpan="1" className="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.upperSectionTotal}
              name="upperSectionTotalBonus"
            />
          </tr>
        </tbody>
      </table>

      <br />
      <table className="lower-scores-table">
        <thead>
          <tr>
            <th colSpan="12">Lower Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreThreeOfAKind() : ""}
            >
              {lowerScores[0]}
            </td>
            <td className="spacer"></td>
            <ScoreLine
              description={6}
              scores={props.scoreCard.lowerSection[0].threeOfAKind}
              disabled={props.scoreCard.lowerSection[0].marked}
              name="threeOfAKind"
              marked={props.scoreCard.lowerSection[0].marked}
            />
            <td className="spacer"> </td>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreSmStraight() : ""}
            >
              {lowerScores[3]}
            </td>
            <td className="spacer"></td>
            <ScoreLine
              description={8}
              scores={props.scoreCard.lowerSection[3].smStraight}
              disabled={props.scoreCard.lowerSection[3].marked}
              name="smStraight"
              marked={props.scoreCard.lowerSection[3].marked}
            />
          </tr>

          <tr>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreFourOfAKind() : ""}
            >
              {lowerScores[1]}
            </td>
            <td className="spacer"></td>
            <ScoreLine
              description={6}
              scores={props.scoreCard.lowerSection[1].fourOfAKind}
              disabled={props.scoreCard.lowerSection[1].marked}
              name="fourOfAKind"
              marked={props.scoreCard.lowerSection[1].marked}
            />
            <td className="spacer"> </td>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreLgStraight() : ""}
            >
              {lowerScores[4]}
            </td>
            <td className="spacer"></td>
            <ScoreLine
              description={9}
              scores={props.scoreCard.lowerSection[4].lgStraight}
              disabled={props.scoreCard.lowerSection[4].marked}
              name="lgStraight"
              marked={props.scoreCard.lowerSection[4].marked}
            />
          </tr>

          <tr>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreFullHouse() : ""}
            >
              {lowerScores[2]}
            </td>
            <td className="spacer"></td>
            <ScoreLine
              description={7}
              scores={props.scoreCard.lowerSection[2].fullHouse}
              disabled={props.scoreCard.lowerSection[2].marked}
              name="fullHouse"
              marked={props.scoreCard.lowerSection[2].marked}
            />
            <td className="spacer"> </td>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={!disabled ? scoreYahtzee() : ""}
            >
              {lowerScores[5]} <span className="dice-icon-yahtzee">&#x2685;</span>
              <span className="dice-icon-yahtzee">&#x2685;</span>
              <span className="dice-icon-yahtzee">&#x2685;</span>
              <span className="dice-icon-yahtzee">&#x2685;</span>
              <span className="dice-icon-yahtzee">&#x2685;</span>
            </td>
            <td className="spacer"></td>
            <ScoreLine
              description={10}
              scores={props.scoreCard.lowerSection[5].yahtzee}
              disabled={
                props.scoreCard.lowerSection[5].marked ||
                props.dice[0] === undefined
              }
              marked={props.scoreCard.lowerSection[5].marked}
              name="yahtzee"
            />
          </tr>
        </tbody>
      </table>

      <table className="yahtzee-bonus-table">
        <thead>
          <tr>
            <th colSpan="12" className="yahtzee-bonus-header" onClick={scoreYahtzee()}>
              Yahtzee Bonus
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="chance-row">
            <div className="chance-row-left-side">
              <td
                colSpan="2"
                id="chance"
                className="upper-scores-category-title"
                onClick={!disabled ? scoreChance() : ""}
              >
                {lowerScores[6]}
              </td>
              <td className="spacer"></td>
              <ScoreLine
                description={6}
                scores={props.scoreCard.lowerSection[6].chance}
                marked={props.scoreCard.lowerSection[6].marked}
                disabled={props.scoreCard.lowerSection[6].marked}
                name="chance"
              />
            </div>
            {/* <td colSpan="2"></td> */}
            <div className="chance-row-right-side">
              <td colSpan="4" className="yahtzee-bonus-desc">
                Each check mark for a Yahtzee after <br /> the first scores 100
                points
              </td>

              {/* <td colSpan="6"></td> */}
              <div className="checkboxes">
                <td colSpan="1" className="bonus-yahtzee-checkbox">
                  <input
                    className="bonus-checkbox"
                    type="checkbox"
                    checked={props.scoreCard.yahtzeeBonus.numYahtzees >= 1}
                  />
                </td>
                <td colSpan="1" className="bonus-yahtzee-checkbox">
                  <input
                    className="bonus-checkbox"
                    type="checkbox"
                    checked={props.scoreCard.yahtzeeBonus.numYahtzees >= 2}
                  />
                </td>
                <td colSpan="1" className="bonus-yahtzee-checkbox">
                  <input
                    className="bonus-checkbox"
                    type="checkbox"
                    checked={props.scoreCard.yahtzeeBonus.numYahtzees >= 3}
                    // disabled
                  />
                </td>
              </div>
            </div>
          </tr>
        </tbody>
      </table>

      <table className="totals-table">
        <thead>
          <tr>
            <th colSpan="12" className="upper-totals-table-header">
              Score Totals
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td className="upper-total-desc">Upper Scores Total</td>
            <td colSpan="1" className="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.upperSectionTotal}
              disabled
              name="upperSectionTotal"
            />
            <td colSpan="1" className="spacer"></td>
            <td className="upper-total-desc">Lower Scores Total</td>
            <td colSpan="1" className="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.lowerSectionTotal}
              disabled
              name="lowerSectionTotal"
            />
            <td colSpan="1" className="spacer"></td>
            <td className="upper-total-desc">Grand Total</td>
            <td colSpan="1" className="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.grandTotal}
              disabled
              name="grandTotal"
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
