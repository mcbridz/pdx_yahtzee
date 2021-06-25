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

  const { scoreCard, dice, markScore, gameState, ourTurn, rollsRemaining } =
    props;
  const version = ["", "-mini"];

  const sendOrder = (task) => {
    const taskObj = {
      game: gameState._id,
      scoreCard: scoreCard.id,
      tasks: task,
    };
    markScore(taskObj);
  };

  const scoreAces = () => {
    return () => {
      let acesAmount = count(dice, 1);
      const acesTask = [{ task: "markAces", data: acesAmount }];
      sendOrder(acesTask);
    };
  };

  const scoreTwos = () => {
    return () => {
      let twosAmount = count(dice, 2);
      const twosTask = [{ task: "markTwos", data: twosAmount }];
      sendOrder(twosTask);
    };
  };

  const scoreThrees = () => {
    return () => {
      let threesAmount = count(dice, 3);
      const threesTask = [{ task: "markThrees", data: threesAmount }];
      sendOrder(threesTask);
    };
  };

  const scoreFours = () => {
    return () => {
      let foursAmount = count(dice, 4);
      const foursTask = [{ task: "markFours", data: foursAmount }];
      sendOrder(foursTask);
    };
  };

  const scoreFives = () => {
    return () => {
      let fivesAmount = count(dice, 5);
      const fivesTask = [{ task: "markFives", data: fivesAmount }];
      sendOrder(fivesTask);
    };
  };

  const scoreSixes = () => {
    return () => {
      let sixesAmount = count(dice, 6);
      const sixesTask = [{ task: "markSixes", data: sixesAmount }];
      sendOrder(sixesTask);
    };
  };

  const scoreFullHouse = () => {
    return () => {
      let fullHouseScore = fullHouse(dice);
      const fullHouseTask = [{ task: "markFullHouse", data: fullHouseScore }];
      sendOrder(fullHouseTask);
    };
  };

  const scoreSmStraight = () => {
    return () => {
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
      let lgStraightScore = lgStraight(dice);
      const lgStraightTask = [
        { task: "markLgStraight", data: lgStraightScore },
      ];
      sendOrder(lgStraightTask);
    };
  };

  const scoreYahtzee = () => {
    return () => {
      let yahtzeeScore = yahtzee(dice);
      const yahtzeeTask = [{ task: "markYahtzee", data: yahtzeeScore }];
      sendOrder(yahtzeeTask);
    };
  };

  const scoreThreeOfAKind = () => {
    return () => {
      let threeOfAKindScore = threeOfAKind(dice);
      const threeOfAKindTask = [
        { task: "markThreeOfAKind", data: threeOfAKindScore },
      ];
      sendOrder(threeOfAKindTask);
    };
  };

  const scoreFourOfAKind = () => {
    return () => {
      let fourOfAKindScore = fourOfAKind(dice);
      const fourOfAKindTask = [
        { task: "markFourOfAKind", data: fourOfAKindScore },
      ];
      sendOrder(fourOfAKindTask);
    };
  };

  const scoreChance = () => {
    return () => {
      let chanceScore = sum(dice);
      console.log(chanceScore);
      const chanceTask = [{ task: "markChance", data: chanceScore }];
      sendOrder(chanceTask);
    };
  };

  const doNothing = () => {
    return;
  };

  const disabled = dice[0] === undefined || !ourTurn;

  return (
    <div className={"score-card" + version[props.version]}>
      <table className={"upper-scores-table" + version[props.version]}>
        <thead>
          <tr>
            <th
              colSpan="12"
              className={"section-header" + version[props.version]}
            >
              Upper Scores
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={"aces-row" + version[props.version]}>
            <td
              colSpan="2"
              className={
                ourTurn &&
                dice[0] !== undefined &&
                props.version === 0 &&
                !scoreCard.upperSection[0].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              // disabled={!ourTurn}
              // onClick={scoreAces()}
              onClick={
                !(disabled || scoreCard.upperSection[0].marked)
                  ? scoreAces()
                  : doNothing
              }
              // disabled={disabled}
            >
              <div className={"gold-overlay" + version[props.version]}>
                {upperScores[0]}{" "}
                <span className={"dice-icon" + version[props.version]}>
                  &#x2680;
                </span>
              </div>
            </td>
            <td className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={0}
              disabled={scoreCard.upperSection[0].marked}
              marked={scoreCard.upperSection[0].marked}
              name="aces"
              scores={scoreCard.upperSection[0].aces}
              version={props.version}
            />
            <td className={"spacer" + version[props.version]}> </td>
            <td
              colSpan="2"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.upperSection[3].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.upperSection[3].marked)
                  ? scoreFours()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {upperScores[3]}
                <span className={"dice-icon" + version[props.version]}>
                  {" "}
                  &#x2683;
                </span>
              </div>
            </td>
            <td className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={3}
              disabled={scoreCard.upperSection[3].marked}
              name="fours"
              scores={scoreCard.upperSection[3].fours}
              marked={scoreCard.upperSection[3].marked}
              version={props.version}
            />
          </tr>

          <tr>
            <td
              colSpan="2"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.upperSection[1].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.upperSection[1].marked)
                  ? scoreTwos()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {upperScores[1]}{" "}
                <span className={"dice-icon" + version[props.version]}>
                  &#x2681;
                </span>
              </div>
            </td>
            <td className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={1}
              scores={scoreCard.upperSection[1].twos}
              disabled={scoreCard.upperSection[1].marked}
              name="twos"
              marked={scoreCard.upperSection[1].marked}
              version={props.version}
            />
            <td className={"spacer" + version[props.version]}></td>
            <td
              colSpan="2"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.upperSection[4].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.upperSection[4].marked)
                  ? scoreFives()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {upperScores[4]}{" "}
                <span className={"dice-icon" + version[props.version]}>
                  &#x2684;
                </span>
              </div>
            </td>
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={4}
              scores={scoreCard.upperSection[4].fives}
              disabled={scoreCard.upperSection[4].marked}
              name="fives"
              marked={scoreCard.upperSection[4].marked}
              version={props.version}
            />
          </tr>

          <tr>
            <td
              colSpan="2"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.upperSection[2].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.upperSection[2].marked)
                  ? scoreThrees()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {upperScores[2]}{" "}
                <span className={"dice-icon" + version[props.version]}>
                  &#x2682;
                </span>
              </div>
            </td>
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={2}
              scores={scoreCard.upperSection[2].threes}
              disabled={scoreCard.upperSection[2].marked}
              name="threes"
              marked={scoreCard.upperSection[2].marked}
              version={props.version}
            />
            <td colSpan="1" className={"spacer" + version[props.version]}>
              {/* {" "} */}
            </td>
            <td
              colSpan="2"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.upperSection[5].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.upperSection[5].marked)
                  ? scoreSixes()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {upperScores[5]}{" "}
                <span className={"dice-icon" + version[props.version]}>
                  &#x2685;
                </span>
              </div>
            </td>
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={5}
              scores={scoreCard.upperSection[5].sixes}
              disabled={scoreCard.upperSection[5].marked}
              name="sixes"
              marked={scoreCard.upperSection[5].marked}
              version={props.version}
            />
          </tr>
        </tbody>
      </table>

      <table className={"upper-totals-table" + version[props.version]}>
        <thead>
          <tr>
            <th
              colSpan="12"
              className={"upper-totals-table-header" + version[props.version]}
            >
              Upper Scores Totals
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={"upper-total-desc" + version[props.version]}>
              Upper Scores Total
            </td>
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <LittleScoreLine
              scores={scoreCard.upperSectionTotal}
              name="upperSectionTotalBonus"
              version={props.version}
            />
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <td className={"upper-total-desc" + version[props.version]}>
              Bonus
            </td>
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <LittleScoreLine
              scores={scoreCard.bonus}
              name="upperBonus"
              version={props.version}
            />
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <td className="upper-total-desc">Upper Scores w/ Bonus</td>
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <LittleScoreLine
              scores={scoreCard.upperSectionTotal}
              name="upperSectionTotalBonus"
              version={props.version}
            />
          </tr>
        </tbody>
      </table>

      <table className={"lower-scores-table" + version[props.version]}>
        <thead>
          <tr>
            <th colSpan="12">Lower Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan="2"
              className={
                ourTurn &&
                dice[0] !== undefined &&
                props.version === 0 &&
                !scoreCard.lowerSection[0].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.lowerSection[0].marked)
                  ? scoreThreeOfAKind()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {lowerScores[0]}
              </div>
            </td>
            <td className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={6}
              scores={scoreCard.lowerSection[0].threeOfAKind}
              disabled={scoreCard.lowerSection[0].marked}
              name="threeOfAKind"
              marked={scoreCard.lowerSection[0].marked}
              version={props.version}
            />
            <td className={"spacer" + version[props.version]}> </td>
            <td
              colSpan="2"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.lowerSection[3].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.lowerSection[3].marked)
                  ? scoreSmStraight()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {lowerScores[3]}
              </div>
            </td>
            <td className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={8}
              scores={scoreCard.lowerSection[3].smStraight}
              disabled={scoreCard.lowerSection[3].marked}
              name="smStraight"
              marked={scoreCard.lowerSection[3].marked}
              version={props.version}
            />
          </tr>

          <tr>
            <td
              colSpan="2"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.lowerSection[1].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.lowerSection[1].marked)
                  ? scoreFourOfAKind()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {lowerScores[1]}
              </div>
            </td>
            <td className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={6}
              scores={scoreCard.lowerSection[1].fourOfAKind}
              disabled={scoreCard.lowerSection[1].marked}
              name="fourOfAKind"
              marked={scoreCard.lowerSection[1].marked}
              version={props.version}
            />
            <td className={"spacer" + version[props.version]}> </td>
            <td
              colSpan="2"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.lowerSection[4].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.lowerSection[4].marked)
                  ? scoreLgStraight()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {lowerScores[4]}
              </div>
            </td>
            <td className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={9}
              scores={scoreCard.lowerSection[4].lgStraight}
              disabled={scoreCard.lowerSection[4].marked}
              name="lgStraight"
              marked={scoreCard.lowerSection[4].marked}
              version={props.version}
            />
          </tr>

          <tr>
            <td
              colSpan="2"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.lowerSection[2].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={
                !(disabled || scoreCard.lowerSection[2].marked)
                  ? scoreFullHouse()
                  : doNothing
              }
            >
              <div className={"gold-overlay" + version[props.version]}>
                {lowerScores[2]}
              </div>
            </td>
            <td className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={7}
              scores={scoreCard.lowerSection[2].fullHouse}
              disabled={scoreCard.lowerSection[2].marked}
              name="fullHouse"
              marked={scoreCard.lowerSection[2].marked}
              version={props.version}
            />
            <td className={"spacer" + version[props.version]}> </td>
            <td
              colSpan="2"
              id="yahtzee2big"
              className={
                ourTurn &&
                props.version === 0 &&
                dice[0] !== undefined &&
                !scoreCard.lowerSection[5].marked
                  ? "upper-scores-category-title gold"
                  : "upper-scores-category-title" + version[props.version]
              }
              onClick={!disabled ? scoreYahtzee() : doNothing}
            >
              <div className={"gold-overlay" + version[props.version]}>
                <div className="yahtzee2big">
                  {lowerScores[5]}
                  <div className="yahtzee-dice">
                    <span
                      className={"dice-icon-yahtzee" + version[props.version]}
                    >
                      &#x2685;
                    </span>
                    <span
                      className={"dice-icon-yahtzee" + version[props.version]}
                    >
                      &#x2685;
                    </span>
                    <span
                      className={"dice-icon-yahtzee" + version[props.version]}
                    >
                      &#x2685;
                    </span>
                    <span
                      className={"dice-icon-yahtzee" + version[props.version]}
                    >
                      &#x2685;
                    </span>
                    <span
                      className={"dice-icon-yahtzee" + version[props.version]}
                    >
                      &#x2685;
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className={"spacer" + version[props.version]}></td>
            <ScoreLine
              description={10}
              scores={scoreCard.lowerSection[5].yahtzee}
              disabled={
                scoreCard.lowerSection[5].marked || dice[0] === undefined
              }
              marked={scoreCard.lowerSection[5].marked}
              name="yahtzee"
              version={props.version}
            />
          </tr>
        </tbody>
      </table>

      <table className={"yahtzee-bonus-table" + version[props.version]}>
        <thead>
          <tr>
            <th
              colSpan="12"
              className={"yahtzee-bonus-header" + version[props.version]}
            >
              Yahtzee Bonus
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={"chance-row" + version[props.version]}>
            <div className={"chance-row-left-side" + version[props.version]}>
              <td
                colSpan="2"
                id="chance"
                className={
                  ourTurn &&
                  props.version === 0 &&
                  dice[0] !== undefined &&
                  !scoreCard.lowerSection[6].marked
                    ? "upper-scores-category-title gold"
                    : "upper-scores-category-title" + version[props.version]
                }
                onClick={!disabled ? scoreChance() : doNothing}
              >
                <div className={"gold-overlay" + version[props.version]}>
                  {lowerScores[6]}
                </div>
              </td>
              <td className={"spacer" + version[props.version]}></td>
              <ScoreLine
                description={6}
                scores={scoreCard.lowerSection[6].chance}
                marked={scoreCard.lowerSection[6].marked}
                disabled={scoreCard.lowerSection[6].marked}
                name="chance"
                version={props.version}
              />
            </div>
            {/* <td colSpan="2"></td> */}
            <div className={"chance-row-right-side" + version[props.version]}>
              <td
                colSpan="4"
                className={"yahtzee-bonus-desc" + version[props.version]}
              >
                Each check mark for a Yahtzee after the first scores 100 points
              </td>

              {/* <td colSpan="6"></td> */}
              <div className={"checkboxes" + version[props.version]}>
                <td
                  colSpan="1"
                  className={"bonus-yahtzee-checkbox" + version[props.version]}
                >
                  <input
                    className={"bonus-checkbox" + version[props.version]}
                    type="checkbox"
                    checked={scoreCard.yahtzeeBonus.numYahtzees >= 1}
                  />
                </td>
                <td
                  colSpan="1"
                  className={"bonus-yahtzee-checkbox" + version[props.version]}
                >
                  <input
                    className={"bonus-checkbox" + version[props.version]}
                    type="checkbox"
                    checked={scoreCard.yahtzeeBonus.numYahtzees >= 2}
                  />
                </td>
                <td
                  colSpan="1"
                  className={"bonus-yahtzee-checkbox" + version[props.version]}
                >
                  <input
                    className={"bonus-checkbox" + version[props.version]}
                    type="checkbox"
                    checked={scoreCard.yahtzeeBonus.numYahtzees >= 3}
                    // disabled
                  />
                </td>
              </div>
            </div>
          </tr>
        </tbody>
      </table>

      <table className={"totals-table" + version[props.version]}>
        <thead>
          <tr>
            <th
              colSpan="12"
              className={"upper-totals-table-header" + version[props.version]}
            >
              Score Totals
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={"upper-total-desc" + version[props.version]}>
              Upper Scores Total
            </td>
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <LittleScoreLine
              scores={scoreCard.upperSectionTotal}
              disabled
              name="upperSectionTotal"
              version={props.version}
            />
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <td className={"upper-total-desc" + version[props.version]}>
              Lower Scores Total
            </td>
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <LittleScoreLine
              scores={scoreCard.lowerSectionTotal}
              disabled
              name="lowerSectionTotal"
              version={props.version}
            />
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <td className={"upper-total-desc" + version[props.version]}>
              Grand Total
            </td>
            <td colSpan="1" className={"spacer" + version[props.version]}></td>
            <LittleScoreLine
              scores={scoreCard.grandTotal}
              disabled
              name="grandTotal"
              version={props.version}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
