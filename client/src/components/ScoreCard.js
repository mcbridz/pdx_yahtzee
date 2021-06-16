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

  const scoreAces = () => {
    return () => {
      const dice = props.dice
      let acesAmount = count(dice, 1);
      const acesTask = [{ task: "markAces", data: acesAmount }];
      const taskObj = {
        game: props.scoreCard.game,
        scoreCard: props.scoreCard.id,
        tasks: [acesTask],
      };
      props.markScore(taskObj);
    }
  };

  const scoreTwos = (dice) => {
    let twosAmount = count(dice, 2);
    const twosTask = [{ task: "markTwos", data: twosAmount }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [twosTask],
    };
  };

  const scoreThrees = (dice) => {
    let threesAmount = count(dice, 3);
    const threesTask = [{ task: "markThrees", data: threesAmount }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [threesTask],
    };
  };

  const scoreFours = (dice) => {
    let foursAmount = count(dice, 4);
    const foursTask = [{ task: "markFours", data: foursAmount }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [foursTask],
    };
  };

  const scoreFives = (dice) => {
    let fivesAmount = count(dice, 5);
    const fivesTask = [{ task: "markFives", data: fivesAmount }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [fivesTask],
    };
  };

  const scoreSixes = (dice) => {
    let sixesAmount = count(dice, 6);
    const sixesTask = [{ task: "markSixes", data: sixesAmount }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [sixesTask],
    };
  };

  const scoreThreeOfAKind = (dice) => {
    let threeOfAKindScore = threeOfAKind(dice);
    const threeOfAKindTask = [
      { task: "markThreeOfAKind", data: threeOfAKindScore },
    ];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [threeOfAKindTask],
    };
  };

  const scoreFourOfAKind = (dice) => {
    let fourOfAKindScore = fourOfAKind(dice);
    const fourOfAKindTask = [
      { task: "markFourOfAKind", data: fourOfAKindScore },
    ];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [fourOfAKindTask],
    };
  };

  const scoreFullHouse = (dice) => {
    let fullHouseScore = fullHouse(dice);
    const fullHouseTask = [{ task: "markFullHouse", data: fullHouseScore }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [fullHouseTask],
    };
  };

  const scoreSmStraight = (dice) => {
    let smStraightScore = smStraight(dice);
    const smStraightTask = [{ task: "markSmStraight", data: smStraightScore }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [smStraightTask],
    };
  };

  const scoreLgStraight = (dice) => {
    let lgStraightScore = lgStraight(dice);
    const lgStraightTask = [{ task: "markLgStraight", data: lgStraightScore }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [lgStraightTask],
    };
  };

  const scoreYahtzee = (dice) => {
    let yahtzeeScore = yahtzee(dice);
    const yahtzeeTask = [{ task: "markYahtzee", data: yahtzeeScore }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [yahtzeeTask],
    };
  };

  const scoreChance = (dice) => {
    let chanceScore = sum(dice);
    const chanceTask = [{ task: "markChance", data: chanceScore }];
    const taskObj = {
      game: props.scoreCard.game,
      scoreCard: props.scoreCard.id,
      tasks: [chanceTask],
    };
  };

  return (
    <div className="score-card">
      <button onClick={scoreAces()}>test</button>
      <table id="upper-scores-table">
        <thead>
          <tr>
            <th colSpan="12" className="section-header">
              Upper Scores
            </th>
          </tr>
        </thead>
        <tbody>
          <tr id="aces-row">
            <td colSpan="2" className="upper-scores-category-title rounded-top">
              {upperScores[0]} <span id="dice-icon">&#x2680;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              name="aces"
              description={0}
              scores={props.scoreCard.upperSection[0].aces}
              setScoreCard={props.setScoreCard}
              dice={props.dice}
              disabled={props.scoreCard.upperSection[0].marked}
              marked={props.scoreCard.upperSection[0].marked}
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[3]}
              <span id="dice-icon"> &#x2683;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              name="fours"
              description={3}
              scores={props.scoreCard.upperSection[3].fours}
              setScoreCard={props.setScoreCard}
              version={3}
              className="score-line-comp"
              dice={props.dice}
              disabled={props.scoreCard.upperSection[3].marked}
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[1]} <span id="dice-icon">&#x2681;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={1}
              scores={props.scoreCard.upperSection[1].twos}
              setScoreCard={props.setScoreCard}
              version={1}
              dice={props.dice}
              disabled={props.scoreCard.upperSection[1].marked}
              name="twos"
            />
            <td id="spacer">{/* {" "} */}</td>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[4]} <span id="dice-icon">&#x2684;</span>
            </td>
            <td colSpan="1" id="spacer"></td>
            <ScoreLine
              description={4}
              scores={props.scoreCard.upperSection[4].fives}
              setScoreCard={props.setScoreCard}
              version={4}
              dice={props.dice}
              disabled={props.scoreCard.upperSection[4].marked}
              name="fives"
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[2]} <span id="dice-icon">&#x2682;</span>
            </td>
            <td colSpan="1" id="spacer"></td>
            <ScoreLine
              description={2}
              scores={props.scoreCard.upperSection[2].threes}
              setScoreCard={props.setScoreCard}
              version={2}
              dice={props.dice}
              disabled={props.scoreCard.upperSection[2].marked}
              name="threes"
            />
            <td colSpan="1" id="spacer">
              {/* {" "} */}
            </td>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[5]} <span id="dice-icon">&#x2685;</span>
            </td>
            <td colSpan="1" id="spacer"></td>
            <ScoreLine
              description={5}
              scores={props.scoreCard.upperSection[5].sixes}
              setScoreCard={props.setScoreCard}
              version={5}
              dice={props.dice}
              disabled={props.scoreCard.upperSection[5].marked}
              name="sixes"
            />
          </tr>
          <br />
        </tbody>
      </table>

      <table id="upper-totals-table">
        <thead>
          <tr>
            <th colSpan="12" id="upper-totals-table-header">
              Upper Scores Totals
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td id="big-spacer"></td> */}
            <td id="upper-total-desc">Upper Scores Total</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.upperSectionTotal}
              setScoreCard={props.setScoreCard}
              version={13}
              dice={props.dice}
              disabled
              name="upperSectionTotalBonus"
            />
            <td colSpan="1" id="spacer"></td>
            <td id="upper-total-desc">Bonus</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.bonus}
              disabled
              name="upperBonus"
              setScoreCard={props.setScoreCard}
              version={14}
              dice={props.dice}
            />
            <td colSpan="1" id="spacer"></td>
            <td id="upper-total-desc">Upper Scores w/ Bonus</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.upperSectionTotal}
              setScoreCard={
                props.scoreCard.bonus + props.scoreCard.upperSectionTotal
              }
              version={15}
              dice={props.dice}
              disabled
              name="upperSectionTotalBonus"
            />
          </tr>
        </tbody>
      </table>

      <br />
      <table id="lower-scores-table">
        <thead>
          <tr>
            <th colSpan="12">Lower Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[0]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={6}
              scores={props.scoreCard.lowerSection[0].score}
              setScoreCard={props.setScoreCard}
              version={6}
              dice={props.dice}
              disabled={props.scoreCard.lowerSection[0].marked}
              name="threeOfAKind"
              scoreMove={() =>
                props.scoreMove(
                  props.scoreCard.lowerSection[0].score,
                  threeOfAKind
                )
              }
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[3]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={8}
              scores={props.scoreCard.lowerSection[3].smStraight}
              setScoreCard={props.setScoreCard}
              version={9}
              dice={props.dice}
              disabled={props.scoreCard.lowerSection[3].marked}
              name="smStraight"
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[1]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={6}
              scores={props.scoreCard.lowerSection[1].fourOfAKind}
              setScoreCard={props.setScoreCard}
              version={7}
              dice={props.dice}
              disabled={props.scoreCard.lowerSection[1].marked}
              name="fourOfAKind"
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[4]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={9}
              scores={props.scoreCard.lowerSection[4].lgStraight}
              setScoreCard={props.setScoreCard}
              version={10}
              dice={props.dice}
              disabled={props.scoreCard.lowerSection[4].marked}
              name="lgStraight"
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[2]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={7}
              scores={props.scoreCard.lowerSection[2].fullHouse}
              setScoreCard={props.setScoreCard}
              version={8}
              dice={props.dice}
              disabled={props.scoreCard.lowerSection[2].marked}
              name="fullHouse"
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[5]} <span id="dice-icon-yahtzee">&#x2685;</span>
              <span id="dice-icon-yahtzee">&#x2685;</span>
              <span id="dice-icon-yahtzee">&#x2685;</span>
              <span id="dice-icon-yahtzee">&#x2685;</span>
              <span id="dice-icon-yahtzee">&#x2685;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={10}
              scores={props.scoreCard.lowerSection[5].yahtzee}
              setScoreCard={props.setScoreCard}
              version={11}
              dice={props.dice}
              disabled={props.scoreCard.lowerSection[5].marked}
              name="yahtzee"
            />
          </tr>
        </tbody>
      </table>

      <table id="yahtzee-bonus-table">
        <thead>
          <tr>
            {/* <th colSpan="5"></th> */}
            <th colSpan="12" id="yahtzee-bonus-header">
              Yahtzee Bonus
            </th>
          </tr>
        </thead>
        <tbody>
          <tr id="chance-row">
            <div id="chance-row-left-side">
              <td
                colSpan="2"
                id="chance"
                className="upper-scores-category-title"
              >
                {lowerScores[6]}
              </td>
              <td id="spacer"></td>
              <ScoreLine
                description={6}
                scores={props.scoreCard.lowerSection[6].score}
                setScoreCard={props.setScoreCard}
                version={12}
                dice={props.dice}
                disabled={props.scoreCard.lowerSection[6].marked}
                name="chance"
              />
            </div>
            {/* <td colSpan="2"></td> */}
            <div id="chance-row-right-side">
              <td colSpan="4" id="yahtzee-bonus-desc">
                Each check mark for a Yahtzee after <br /> the first scores 100
                points
              </td>

              {/* <td colSpan="6"></td> */}
              <div id="checkboxes">
                <td colSpan="1" id="bonus-yahtzee-checkbox">
                  <input id="bonus-checkbox" type="checkbox" disabled />
                </td>
                <td colSpan="1" id="bonus-yahtzee-checkbox">
                  <input id="bonus-checkbox" type="checkbox" disabled />
                </td>
                <td colSpan="1" id="bonus-yahtzee-checkbox">
                  <input id="bonus-checkbox" type="checkbox" disabled />
                </td>
              </div>
            </div>
            {/* <td id="bonus-spacer"></td> */}
          </tr>
        </tbody>
      </table>

      <table id="totals-table">
        <thead>
          <tr>
            <th colSpan="12" id="upper-totals-table-header">
              Score Totals
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td id="big-spacer"></td> */}
            <td id="upper-total-desc">Upper Scores Total</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.upperSectionTotal}
              setScoreCard={props.setScoreCard}
              version={15}
              dice={props.dice}
              disabled
              name="upperSectionTotal"
            />
            <td colSpan="1" id="spacer"></td>
            <td id="upper-total-desc">Lower Scores Total</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.lowerSectionTotal}
              setScoreCard={props.setScoreCard}
              version={16}
              dice={props.dice}
              disabled
              name="lowerSectionTotal"
            />
            <td colSpan="1" id="spacer"></td>
            <td id="upper-total-desc">Grand Total</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.grandTotal}
              setScoreCard={props.setScoreCard}
              version={17}
              dice={props.dice}
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
