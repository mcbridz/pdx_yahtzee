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
  }

  const scoreAces = () => {
    return () => {
      const dice = props.dice
      let acesAmount = count(dice, 1);
      const acesTask = [{ task: "markAces", data: acesAmount }];
      sendOrder(acesTask)
    }
  };

  const scoreTwos = () => {
    return () => {
      const dice = props.dice
      let twosAmount = count(dice, 2);
      const twosTask = [{ task: "markTwos", data: twosAmount }];
      sendOrder(twosTask)
    };
  }

  const scoreThrees = () => {
    return () => {
      const dice = props.dice
      let threesAmount = count(dice, 3);
      const threesTask = [{ task: "markThrees", data: threesAmount }];
      sendOrder(threesTask)
    };
  }

  const scoreFours = () => {
    return () => {
      const dice = props.dice
      let foursAmount = count(dice, 4);
      const foursTask = [{ task: "markFours", data: foursAmount }];
      sendOrder(foursTask)
    };
  }

  const scoreFives = () => {
    return () => {
      const dice = props.dice
      let fivesAmount = count(dice, 5);
      const fivesTask = [{ task: "markFives", data: fivesAmount }];
      sendOrder(fivesTask)
    };
  }

  const scoreSixes = () => {
    return () => {
      const dice = props.dice
      let sixesAmount = count(dice, 6);
      const sixesTask = [{ task: "markSixes", data: sixesAmount }];
      sendOrder(sixesTask)
    };
  }

  const scoreThreeOfAKind = () => {
    return () => {
      const dice = props.dice
      let threeOfAKindScore = threeOfAKind(dice);
      const threeOfAKindTask = [
        { task: "markThreeOfAKind", data: threeOfAKindScore },
      ];
      sendOrder(threeOfAKindTask)
    };
  }

  const scoreFourOfAKind = () => {
    return () => {
      const dice = props.dice
      let fourOfAKindScore = fourOfAKind(dice);
      const fourOfAKindTask = [
        { task: "markFourOfAKind", data: fourOfAKindScore },
      ];
      sendOrder(fourOfAKindTask)
    };
  }

  const scoreFullHouse = () => {
    return () => {
      const dice = props.dice
      let fullHouseScore = fullHouse(dice);
      const fullHouseTask = [{ task: "markFullHouse", data: fullHouseScore }];
      sendOrder(fullHouseTask)
    };
  }

  const scoreSmStraight = () => {
    return () => {
      const dice = props.dice
      let smStraightScore = smStraight(dice);
      const smStraightTask = [{ task: "markSmStraight", data: smStraightScore }];
      sendOrder(smStraightTask)
    };
  }

  const scoreLgStraight = () => {
    return () => {
      const dice = props.dice
      let lgStraightScore = lgStraight(dice);
      const lgStraightTask = [{ task: "markLgStraight", data: lgStraightScore }];
      sendOrder(lgStraightTask)
    };
  }

  const scoreYahtzee = () => {
    return () => {
      const dice = props.dice
      let yahtzeeScore = yahtzee(dice);
      const yahtzeeTask = [{ task: "markYahtzee", data: yahtzeeScore }];
      sendOrder(yahtzeeTask)
    };
  }

  const scoreChance = () => {
    return () => {
      const dice = props.dice
      let chanceScore = sum(dice);
      const chanceTask = [{ task: "markChance", data: chanceScore }];
      sendOrder(chanceTask)
    };
  }

  return (
    <div className="score-card">
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
            <td colSpan="2" className="upper-scores-category-title rounded-top" onClick={scoreAces()}>
              {upperScores[0]} <span id="dice-icon">&#x2680;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={0}
              dice={props.dice}
              disabled={props.scoreCard.upperSection[0].marked}
              marked={props.scoreCard.upperSection[0].marked}
              name="aces"
              scores={props.scoreCard.upperSection[0].aces}
              setScoreCard={props.setScoreCard}
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreFours()}>
              {upperScores[3]}
              <span id="dice-icon"> &#x2683;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={3}
              dice={props.dice}
              disabled={props.scoreCard.upperSection[3].marked}
              name="fours"
              scores={props.scoreCard.upperSection[3].fours}
              setScoreCard={props.setScoreCard}
              marked={props.scoreCard.upperSection[3].marked}
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreTwos()}>
              {upperScores[1]} <span id="dice-icon">&#x2681;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              description={1}
              scores={props.scoreCard.upperSection[1].twos}
              setScoreCard={props.setScoreCard}              
              dice={props.dice}
              disabled={props.scoreCard.upperSection[1].marked}
              name="twos"
              marked={props.scoreCard.upperSection[2].marked}
            />
            <td id="spacer">{/* {" "} */}</td>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreFives()}>
              {upperScores[4]} <span id="dice-icon">&#x2684;</span>
            </td>
            <td colSpan="1" id="spacer"></td>
            <ScoreLine
              description={4}
              scores={props.scoreCard.upperSection[4].fives}
              setScoreCard={props.setScoreCard}              
              dice={props.dice}
              disabled={props.scoreCard.upperSection[4].marked}
              name="fives"
              marked={props.scoreCard.upperSection[4].marked}
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreThrees()}>
              {upperScores[2]} <span id="dice-icon">&#x2682;</span>
            </td>
            <td colSpan="1" id="spacer"></td>
            <ScoreLine
              description={2}
              scores={props.scoreCard.upperSection[2].threes}
              setScoreCard={props.setScoreCard}              
              dice={props.dice}
              disabled={props.scoreCard.upperSection[2].marked}
              name="threes"
              marked={props.scoreCard.upperSection[2].marked}
            />
            <td colSpan="1" id="spacer">
              {/* {" "} */}
            </td>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreSixes()}>
              {upperScores[5]} <span id="dice-icon">&#x2685;</span>
            </td>
            <td colSpan="1" id="spacer"></td>
            <ScoreLine
              description={5}
              scores={props.scoreCard.upperSection[5].sixes}
              setScoreCard={props.setScoreCard}              
              dice={props.dice}
              disabled={props.scoreCard.upperSection[5].marked}
              name="sixes"
              marked={props.scoreCard.upperSection[5].marked}
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
              dice={props.dice}
              name="upperSectionTotalBonus"
            />
            <td colSpan="1" id="spacer"></td>
            <td id="upper-total-desc">Bonus</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scoreCard.bonus}
              name="upperBonus"
              setScoreCard={props.setScoreCard}              
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
              dice={props.dice}
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
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreThreeOfAKind()}>
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
              marked={props.scoreCard.lowerSection[0].marked}
              // scoreMove={() =>
              //   props.scoreMove(
              //     props.scoreCard.lowerSection[0].score,
              //     threeOfAKind
              //   )
              // }
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreSmStraight()}>
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
              marked={props.scoreCard.lowerSection[3].marked}
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreFourOfAKind()}>
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
              marked={props.scoreCard.lowerSection[1].marked}
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreLgStraight()}>
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
              marked={props.scoreCard.lowerSection[4].marked}
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreFullHouse()}>
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
              marked={props.scoreCard.lowerSection[2].marked}
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title" onClick={scoreYahtzee()}>
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
              name="yahtzee"
            />
          </tr>
        </tbody>
      </table>

      <table id="yahtzee-bonus-table">
        <thead>
          <tr>
            {/* <th colSpan="5"></th> */}
            <th colSpan="12" id="yahtzee-bonus-header" onClick={scoreYahtzee()}>
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
                onClick={scoreChance()}
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
