import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });
  }

  function rollDice() {
    gameWon
      ? setDice(generateAllNewDice)
      : setDice((oldDice) =>
          oldDice.map((die) =>
            die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
          )
        );
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      hold={() => hold(dieObj.id)}
      isHeld={dieObj.isHeld}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll untill all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>
      <div className="die-container">{diceElements}</div>
      <button onClick={rollDice} className="roll-dice">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
