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
              scores={props.scores}
              setScores={props.setScores}
              version={0}
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[3]}
              <span id="dice-icon"> &#x2683;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={3}
              scores={props.scores}
              setScores={props.setScores}
              version={3}
              className="score-line-comp"
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[1]} <span id="dice-icon">&#x2681;</span>
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={1}
              scores={props.scores}
              setScores={props.setScores}
              version={1}
            />
            <td id="spacer">{/* {" "} */}</td>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[4]} <span id="dice-icon">&#x2684;</span>
            </td>
            <td colSpan="1" id="spacer"></td>
            <ScoreLine
              value={4}
              scores={props.scores}
              setScores={props.setScores}
              version={4}
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {upperScores[2]} <span id="dice-icon">&#x2682;</span>
            </td>
            <td colSpan="1" id="spacer"></td>
            <ScoreLine
              value={2}
              scores={props.scores}
              setScores={props.setScores}
              version={2}
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
              scores={props.scores}
              setScores={props.setScores}
              version={5}
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
              scores={props.scores}
              setScores={props.setScores}
              version={13}
            />
            <td colSpan="1" id="spacer"></td>
            <td id="upper-total-desc">Bonus</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scores}
              setScores={props.setScores}
              version={14}
            />
            <td colSpan="1" id="spacer"></td>
            <td id="upper-total-desc">Upper Scores w/ Bonus</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scores}
              setScores={props.setScores}
              version={15}
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
              scores={props.scores}
              setScores={props.setScores}
              version={6}
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[3]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={8}
              scores={props.scores}
              setScores={props.setScores}
              version={9}
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[1]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={6}
              scores={props.scores}
              setScores={props.setScores}
              version={7}
            />
            <td id="spacer"> </td>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[4]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={9}
              scores={props.scores}
              setScores={props.setScores}
              version={10}
            />
          </tr>

          <tr>
            <td colSpan="2" className="upper-scores-category-title">
              {lowerScores[2]}
            </td>
            <td id="spacer"></td>
            <ScoreLine
              value={7}
              scores={props.scores}
              setScores={props.setScores}
              version={8}
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
              scores={props.scores}
              setScores={props.setScores}
              version={11}
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
                scores={props.scores}
                setScores={props.setScores}
                version={12}
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
              scores={props.scores}
              setScores={props.setScores}
              version={15}
            />
            <td colSpan="1" id="spacer"></td>
            <td id="upper-total-desc">Lower Scores Total</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scores}
              setScores={props.setScores}
              version={16}
            />
            <td colSpan="1" id="spacer"></td>
            <td id="upper-total-desc">Grand Total</td>
            <td colSpan="1" id="spacer"></td>
            <LittleScoreLine
              scores={props.scores}
              setScores={props.setScores}
              version={17}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
