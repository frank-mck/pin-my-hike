function Button({ getPosition }) {
  return (
    <div>
      <button className="button" onClick={getPosition}>
        Pin my hike
      </button>
    </div>
  );
}

export default Button;
