import logo from './logo.svg';
import io from '../../node_modules/socket.io/client-dist/socket.io.js'
import './App.css';
import { useState, useEffect } from 'react'

////////////Instructions///////////////////
//Prior to testing this application, the local server
//needs to be started up, and three users created as follows
// {
//   "username": "test1",
//   "password": "abcDEFghi123"
// }
// {
//   "username": "test2",
//   "password": "abcDEFghi123"
// }
// {
//   "username": "test3",
//   "password": "abcDEFghi123"
// }
//This must be done locally, as the tokens to be sent as part
//of the createGame test, tokens are needed



const socket = io("http://localhost:8000")
function App() {
  const [game, setGame] = useState({
    users: [],
    scoreCards: [],
    public: true,
    started: false,
    currentPlayer: { id: '', username: ''}
  })
  const [scoreCard, setScoreCard] = useState({
    id: '',
    game: '',
    gameNum: '',
    player: '',
    upperSection: [
      { aces: 0, marked: false, value: 1 },
      { twos: 0, marked: false, value: 2 },
      { threes: 0, marked: false, value: 3 },
      { fours: 0, marked: false, value: 4 },
      { fives: 0, marked: false, value: 5 },
      { sixes: 0, marked: false, value: 6 }
    ],
    bonus: 0,
    upperSectionTotal: 0,
    lowerSection: [
      { threeOfAKind: 0, marked: false },
      { fourOfAKind: 0, marked: false },
      { fullHouse: 0, value: 25, marked: false },
      { smStraight: 0, value: 30, marked: false },
      { lgStraight: 0, value: 40, marked: false },
      { yahtzee: 0, value: 50, marked: false }
    ],
    yahtzeeBonus: { score: 0, numYahtzees: 0 },
    chance: { score: 0, marked: false },
    lowerSectionTotal: 0,
    grandTotal: 0
  })
  const [gamesList, setGamesList] = useState([])
  const [dice, setDice] = useState([1, 1, 1, 1, 1])
  const diceRef = [1,2,3,4,5,6]
  useEffect(() => {
    socket.on('createGame', (game) => {
      console.log(JSON.parse(game))
      setGame(JSON.parse(game))
    })
    socket.on('getUnstartedGames', (list) => {
      setGamesList(JSON.parse(list))
    })
    socket.on('markScore', (gameObj) => {
      let gameJSON = JSON.parse(gameObj)
      console.log(gameJSON)
      console.log(game.currentPlayer.username)
      const currentPlayerScoreCard = gameJSON.scoreCards.filter((scoreCard) => gameJSON.currentPlayer.username.trim() == scoreCard.player.trim())[0]
      console.log(currentPlayerScoreCard)
      setGame(gameJSON)
      setScoreCard(currentPlayerScoreCard)
    })
    socket.on('diceRoll', (dice) => {
      setDice(JSON.parse(dice))
    })
    socket.on('startGame', (game) => {
      // console.log(JSON.parse(game))
      setGame(JSON.parse(game))
    })
    socket.on('endGame', (game) => {
      setGame(JSON.parse(game))
    })
    socket.on('addPlayer', (game) => {
      // console.log('new player added')
      // console.log(JSON.parse(game))
      setGame(JSON.parse(game))
    })
    socket.on('removePlayer', (game) => {
      console.log('player removed on database')
      console.log(JSON.parse(game))
      setGame(JSON.parse(game))
    })
  }, [])


  ///////////hardcoded tests of socket////////////////
  const testCreateGame = () => {
    socket.emit('createGame', {public: true, playerList: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJlZDhlMWIyNjUzOTVkYjAwNjY3ZjUiLCJpYXQiOjE2MjMyOTI4MDl9.I8SWHgeMHPjATaQqGgZnmXxmkDZ343blVBk-U_wuysc", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJlZDkwNzcwNGUxZDZiYTBjMjJjZTEiLCJpYXQiOjE2MjMyOTI4MzV9.Jr88pvQi9iAm365QXAD_HoBayuOas-QXlkrB7mC7zHQ", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMxNzljZjY3YmY5NjZkNTQ2MjcyMDgiLCJpYXQiOjE2MjMyOTI4NjZ9.rULhPWRWsS-jnRFxNFX88Rq7ncLGN5RQ-p4H4oCMiF0"]})
  }
  const testStartGame = () => {
    return () => {
      // console.log(game.scoreCards[0])
      setScoreCard(game.scoreCards[0])
      // console.log(scoreCard)
      socket.emit('startGame', game._id)
    }
  }
  const testEndGame = () => {
    return () => socket.emit('endGame', game._id)
  }
  const player5 = { player : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMyYzU1MDBkZjE0NjRjNjQyZDFmZjUiLCJpYXQiOjE2MjMzNzcyNDJ9.0lUfCmaEdB8MfFXStH0UOirOHeq_qo9zy7-w6M_1O2A" }
  
  //testAddPlayer, this function is unsuitable for copying, due to
  //the order needing the gameID inserted (shouldn't be a problem to re-factor)
  const testAddPlayer = (order) => {
    return () => {
      order.game = game._id
      order.player = player5.player
      socket.emit('addPlayer', order)
    }
  }
  const testRemovePlayer = (order) => {
    return () => {
      order.game = game._id
      order.player = player5.player
      socket.emit('removePlayer', order)
    }
  }

  //hardcoded turn events
  const order1 = {
    tasks: [
      { task: 'markAces', data: 5 }, { task: 'markFourOfAKind', data: null }
    ]
  }
  const order2 = {
    tasks: [
      { task: 'markTwos', data: 3 }, { task: 'markThreeOfAKind', data: null }
    ]
  }
  const order3 = {
    tasks: [
      { task: 'markThrees', data: 2 }, { task: 'markFullHouse', data: null }
    ]
  }
  const order4 = {
    tasks: [
      { task: 'markFours', data: 5 }, { task: 'markYahtzee', data: null }
    ]
  }
  const order5 = {
    tasks: [
      { task: 'markFives', data: 1 }
    ]
  }
  const order6 = {
    tasks: [
      { task: 'markSixes', data: 3 }
    ]
  }
  const order7 = {
    tasks: [
      { task: 'markYahtzee', data: null }
    ]
  }
  const order8 = {
    tasks: [
      { task: 'markSmStraight', data: null }
    ]
  }
  const order9 = {
    tasks: [
      { task: 'markLgStraight', data: null }
    ]
  }

  //hardcoded scoremarking functions
  const scoreTest = (order) => {
    return () => {
      order.scoreCard = scoreCard.id
      order.game = game._id
      socket.emit('markScore', order)
    }
  }

  return (
    <div className="App">
      <h2>Dice</h2>
      {dice.map((die, index) => {
        return <div key={index}>
          <label htmlFor={`${diceRef[index]}Die`}>{`#${diceRef[index]} Die`} </label>
          <input type="text" disabled name={`${diceRef[index]}Die`} value={die} />
        </div>
      })}
      <h2>Current Game Info: </h2>
      <label htmlFor="gameID" >GameID </label>
      <input value={game._id} disabled name="gameID" />
      <label htmlFor="players">Players </label>
      <ul name="players">
        {game.users.map((playerObj, key) => {
          return <li key={key}>id: {playerObj.id} username: {playerObj.username}</li>
        })}
      </ul>
      <label htmlFor="public" >Public? </label>
      <input type="checkbox" checked={game.public} disabled name="public" />
      <label htmlFor="started" >Started? </label>
      <input type="checkbox" checked={game.started} disabled name="started" />
      <label htmlFor="currentPlayer" >Current Player </label>
      <input value={(!game.started)?'':game.currentPlayer.username} disabled name="currentPlayer" />

      <h2>Current Player Scorecard</h2>
      <label htmlFor="gameNum" >Game Number </label>
      <input value={scoreCard.gameNum} disabled name="gameNum" />
      <label htmlFor="player" >Player Name </label>
      <input value={scoreCard.player} disabled name="player" />
      <h3>Upper Section</h3>
      <label htmlFor="aces" >Aces </label>
      <input value={scoreCard.upperSection[0].aces} disabled={scoreCard.upperSection[0].marked} name="aces" />
      <label htmlFor="twos" >Twos </label>
      <input value={scoreCard.upperSection[1].twos} disabled={scoreCard.upperSection[1].marked} name="twos" />
      <label htmlFor="threes" >Threes </label>
      <input value={scoreCard.upperSection[2].threes} disabled={scoreCard.upperSection[2].marked} name="threes" />
      <label htmlFor="fours" >Fours </label>
      <input value={scoreCard.upperSection[3].fours} disabled={scoreCard.upperSection[3].marked} name="fours" />
      <label htmlFor="fives" >Fives </label>
      <input value={scoreCard.upperSection[4].fives} disabled={scoreCard.upperSection[4].marked} name="fives" />
      <label htmlFor="sixes" >Sixes </label>
      <input value={scoreCard.upperSection[5].sixes} disabled={scoreCard.upperSection[5].marked} name="sixes" />
      <label htmlFor="upperBonus" >Upper Section Bonus </label>
      <input value={scoreCard.bonus} disabled name="upperBonus" />
      <label htmlFor="upperSectionTotal" >Upper Section Total </label>
      <input value={scoreCard.upperSectionTotal} disabled name="upperSectionTotal" />
      <label htmlFor="upperSectionTotalBonus" >Upper Section Total + Bonus </label>
      <input value={scoreCard.bonus + scoreCard.upperSectionTotal} disabled name="upperSectionTotalBonus" />
      <h3>Lower Section</h3>
      <label htmlFor="threeOfAKind" >Three of a Kind </label>
      <input value={scoreCard.lowerSection[0].threeOfAKind} disabled={scoreCard.lowerSection[0].marked} name="threeOfAKind" />
      <label htmlFor="fourOfAKind" >Four of a Kind </label>
      <input value={scoreCard.lowerSection[1].fourOfAKind} disabled={scoreCard.lowerSection[1].marked} name="fourOfAKind" />
      <label htmlFor="fullHouse" >Full House </label>
      <input value={scoreCard.lowerSection[2].fullHouse} disabled={scoreCard.lowerSection[2].marked} name="fullHouse" />
      <label htmlFor="smStraight" >Small Straight </label>
      <input value={scoreCard.lowerSection[3].smStraight} disabled={scoreCard.lowerSection[3].marked} name="smStraight" />
      <label htmlFor="lgStraight" >Large Straight </label>
      <input value={scoreCard.lowerSection[4].lgStraight} disabled={scoreCard.lowerSection[4].marked} name="lgStraight" />
      <label htmlFor="yahtzee" >Yahtzee </label>
      <input value={scoreCard.lowerSection[5].yahtzee} disabled={scoreCard.lowerSection[5].marked} name="yahtzee" />
      <label htmlFor="yahtzeeBonus" >Yahtzee Bonus </label>
      <input value={scoreCard.yahtzeeBonus.score} disabled name="yahtzeeBonus" />
      <label htmlFor="numYahtzeeBonus" >Number of Bonus Yahtzees </label>
      <input value={scoreCard.yahtzeeBonus.numYahtzees} disabled name="numYahtzeeBonus" />
      <label htmlFor="chance" >Chance</label>
      <input value={scoreCard.chance.score} disabled={scoreCard.chance.marked} name="chance" />
      <label htmlFor="lowerSectionTotal" >Lower Section Total </label>
      <input value={scoreCard.lowerSectionTotal} disabled name="lowerSectionTotal" />
      <label htmlFor="grandTotal" >Grand Total </label>
      <input value={scoreCard.grandTotal} disabled name="grandTotal" />
      <hr />
      <h2>Start Testing Here!</h2>
      <div>
        <button onClick={testCreateGame} > 1. Create Game </button>
        <button onClick={testAddPlayer(player5)} > 2. Add 'player5' </button>
        <button onClick={testRemovePlayer(player5)} > 3. Remove 'player5' </button>
        <button onClick={testStartGame()} > 4. Start Game </button>
      </div>
      <h2>Test Buttons</h2>
      <div>
        <button onClick={scoreTest(order1)}> 5 #1's, Four of A Kind </button>
        <button onClick={scoreTest(order2)}> 3 #2's, Three of A Kind </button>
        <button onClick={scoreTest(order3)}> 2 #3's, Full House </button>
        <button onClick={scoreTest(order4)}> 5 #4's, Yahtzee</button>
        <button onClick={scoreTest(order5)}> 1 #5 </button>
        <button onClick={scoreTest(order6)}> 3 #6's </button>
        <button onClick={scoreTest(order7)}> Yahtzee </button>
        <button onClick={scoreTest(order8)}> Small Straight </button>
        <button onClick={scoreTest(order9)}> Large Straight </button>
      </div>
      <hr />
      <button onClick={testEndGame()}> 5. End Game </button>
    </div>
  );
}

export default App;
