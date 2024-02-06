import { useState } from "react";
import Card from "./Card.js";

export default function Hand({ cards, selected, onSelect }) {
  return (
    <div>
      {cards.map((c, index) => (
        <Card
          key={index}
          rank={c.rank}
          suit={c.suit}
          selected={selected.includes(index)}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
