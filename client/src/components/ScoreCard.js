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
  return (
    <div className="score-card">
      <table id="upper-scores-table">
        <thead>
          <tr>
            <th colspan="12">Upper Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr id="aces-row">
            <td
              colspan="2"
              className="upper-scores-category-title"
              id="curved-border"
            >
              {upperScores[0]} <span id="dice-icon">&#x2680;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine value={0} />
            <td id="spacer"> </td>
            <td colspan="2" className="upper-scores-category-title">
              {upperScores[3]}
              <span id="dice-icon"> &#x2683;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine value={3} />
          </tr>

          <tr>
            <td colspan="2" className="upper-scores-category-title">
              {upperScores[1]} <span id="dice-icon">&#x2681;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine value={1} />
            <td id="spacer">{/* {" "} */}</td>
            <td colspan="2" className="upper-scores-category-title">
              {upperScores[4]} <span id="dice-icon">&#x2684;</span>
            </td>
            <td colspan="1" id="spacer"></td>
            <ScoreLine value={4} />
          </tr>

          <tr>
            <td colspan="2" className="upper-scores-category-title">
              {upperScores[2]} <span id="dice-icon">&#x2682;</span>
            </td>
            <td colspan="1" id="spacer"></td>
            <ScoreLine value={2} />
            <td colspan="1" id="spacer">
              {/* {" "} */}
            </td>
            <td colspan="2" className="upper-scores-category-title">
              {upperScores[5]} <span id="dice-icon">&#x2685;</span>
            </td>
            <td colspan="1" id="spacer"></td>
            <ScoreLine value={5} />
          </tr>
          <br />
        </tbody>
      </table>

      <table id="upper-totals-table">
        <thead>
          <tr>
            <th colspan="12" id="upper-totals-table-header">
              Upper Scores Totals
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td id="big-spacer"></td> */}
            <td id="upper-total-desc">Upper Scores Total</td>
            <td colspan="1" id="spacer"></td>
            <LittleScoreLine />
            <td colspan="1" id="spacer"></td>
            <td id="upper-total-desc">Bonus</td>
            <td colspan="1" id="spacer"></td>
            <LittleScoreLine />
            <td colspan="1" id="spacer"></td>
            <td id="upper-total-desc">Upper Scores w/ Bonus</td>
            <td colspan="1" id="spacer"></td>
            <LittleScoreLine />
          </tr>
        </tbody>
      </table>

      <br />
      <table id="lower-scores-table">
        <thead>
          <tr>
            <th colspan="12">Lower Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2" className="upper-scores-category-title">
              {lowerScores[0]}
            </td>
            <td id="spacer"></td>
            <ScoreLine value={6} />
            <td id="spacer"> </td>
            <td colspan="2" className="upper-scores-category-title">
              {lowerScores[3]}
            </td>
            <td id="spacer"></td>
            <ScoreLine value={8} />
          </tr>

          <tr>
            <td colspan="2" className="upper-scores-category-title">
              {lowerScores[1]}
            </td>
            <td id="spacer"></td>
            <ScoreLine value={6} />
            <td id="spacer"> </td>
            <td colspan="2" className="upper-scores-category-title">
              {lowerScores[4]}
            </td>
            <td id="spacer"></td>
            <ScoreLine value={9} />
          </tr>

          <tr>
            <td colspan="2" className="upper-scores-category-title">
              {lowerScores[2]}
            </td>
            <td id="spacer"></td>
            <ScoreLine value={7} />
            <td id="spacer"> </td>
            <td colspan="2" className="upper-scores-category-title">
              {lowerScores[5]}
            </td>
            <td id="spacer"></td>
            <ScoreLine value={10} />
          </tr>
        </tbody>
      </table>

      <table id="yahtzee-bonus-table">
        <thead>
          <tr>
            <th colspan="12">Yahtzee Bonus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="12">
              Each check mark for a Yahtzee after the first scores 100 points
            </td>
          </tr>
          <tr id="bonus-yahtzee-row">
            <td id="bonus-spacer"></td>
            <td colspan="1" id="bonus-yahtzee-checkbox">
              <input id="bonus-checkbox" type="checkbox" />
            </td>
            <td colspan="1" id="bonus-yahtzee-checkbox">
              <input id="bonus-checkbox" type="checkbox" />
            </td>
            <td colspan="1" id="bonus-yahtzee-checkbox">
              <input id="bonus-checkbox" type="checkbox" />
            </td>
            <td id="bonus-spacer"></td>
          </tr>
        </tbody>
      </table>

      <table id="totals-table">
        <thead>
          <tr>
            <th colspan="12" id="upper-totals-table-header">
              Score Totals
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td id="big-spacer"></td> */}
            <td id="upper-total-desc">Upper Scores Total</td>
            <td colspan="1" id="spacer"></td>
            <LittleScoreLine />
            <td colspan="1" id="spacer"></td>
            <td id="upper-total-desc">Lower Scores Total</td>
            <td colspan="1" id="spacer"></td>
            <LittleScoreLine />
            <td colspan="1" id="spacer"></td>
            <td id="upper-total-desc">Grand Total</td>
            <td colspan="1" id="spacer"></td>
            <LittleScoreLine />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;