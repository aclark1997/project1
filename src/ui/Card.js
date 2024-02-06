export default function Card({ rank, suit, selected, onClick }) {
  return (
    <img
      className="card"
      onClick={onClick}
      src={
        selected
          ? "https://deckofcardsapi.com/static/img/back.png"
          : `https://deckofcardsapi.com/static/img/${rank}${suit}.png`
      }
    ></img>
  );
}
