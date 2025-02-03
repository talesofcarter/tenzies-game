function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#0CF574" : "white",
  };
  return (
    <button style={styles} onClick={props.hold}>
      {props.value}
    </button>
  );
}
export default Die;
