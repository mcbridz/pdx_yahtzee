import React, { useState } from "react";
import ScoreLine from "./ScoreLine";
import "../styles/ScoreCard.css";
import LittleScoreLine from "./LittleScoreLine";

const ScoreCard = (props) => {
  const [numOfChecks, setNumOfChecks] = useState(0);
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

  const sameDice = (dice) => {
    const freqs = new Map();
    for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
    return Array.from(freqs.values());
  };

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
            <td colSpan="2" className="upper-scores-category-title rounded-top">
              {upperScores[0]} <span id="dice-icon">&#x2680;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={0}
              score={props.scoreCard.upperSection[0].aces}
              setScoreCard={props.setScoreCard}
              version={0}
              dice={props.dice}
              disabled={props.scoreCard.upperSection[0].marked}
              name="aces"
            />
            <td id="spacer"> </td>
            <td
              colSpan="2"
              className="upper-scores-category-title"
              onClick={() => sameDice(props.dice)}
            >
              {upperScores[3]}
              <span id="dice-icon"> &#x2683;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={3}
              scores={props.scoreCard.upperSection[3].fours}
              setScoreCard={props.setScoreCard}
              version={3}
              className="score-line-comp"
              dice={props.dice}
              disabled={props.scoreCard.upperSection[3].marked}
              name="fours"
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[1]} <span id="dice-icon">&#x2681;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={1}
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
              value={4}
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
              value={2}
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
              value={5}
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
              value={6}
              scores={props.scoreCard.lowerSection[0].threeOfAKind}
              setScoreCard={props.setScoreCard}
              version={6}
              dice={props.dice}
              disabled={props.scoreCard.lowerSection[0].marked}
              name="threeOfAKind"
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[3]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={8}
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
              value={6}
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
              value={9}
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
              value={7}
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
              value={10}
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
                value={6}
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
