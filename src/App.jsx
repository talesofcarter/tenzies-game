import { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [rolls, setRolls] = useState(0);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTime) => {
          let seconds = prevTime.seconds + 1;
          let minutes = prevTime.minutes;
          let hours = prevTime.hours;

          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }

          if (minutes === 60) {
            minutes = 0;
            hours += 1;
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  }, [gameWon]);

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
    if (gameWon) {
      setDice(generateAllNewDice);
      setRolls(0);
      setTimer({ hours: 0, minutes: 0, seconds: 0 });
      setIsRunning(true);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
      setRolls((prevRolls) => prevRolls + 1);
      if (!isRunning) {
        setIsRunning(true);
      }
    }
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
        Roll untill all dice are the same. Click each die to rotate it at its
        current value between rolls
      </p>
      <div className="die-container">{diceElements}</div>

      <div className="rolls-time">
        <p>
          Timer: {timer.hours.toString().padStart(2, "0")}:{" "}
          {timer.minutes.toString().padStart(2, "0")}:{" "}
          {timer.seconds.toString().padStart(2, "0")}
        </p>
        <p>Rolls: {rolls}</p>
      </div>

      <button onClick={rollDice} className="roll-dice">
        {gameWon ? "New Game" : "Roll"}
      </button>

      <p>
        coded by{" "}
        <a className="github-profile" href="https://github.com/talesofcarter">
          talesofcarter
        </a>
      </p>
    </main>
  );
}

export default App;
