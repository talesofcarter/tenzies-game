import dice1 from "/dice 1.png";
import dice2 from "/dice 2.png";
import dice3 from "/dice 3.png";
import dice4 from "/dice 4.png";
import dice5 from "/dice 5.png";
import dice6 from "/dice 6.png";
import "./Die.css";
function Die(props) {
  const diceImages = {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6,
  };

  return (
    <button
      className={`die ${props.isHeld ? "held" : ""}`}
      style={{
        backgroundImage: `url(${diceImages[props.value]})`,
        backgroundSize: "cover",
      }}
      onClick={props.hold}
    ></button>
  );
}
export default Die;
