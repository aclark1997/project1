import { useState, useCallback } from "react";

export default function DrawButton({ onClick }) {
  const [HasDrawn, setHasDrawn] = useState(false);

  const checkClick = async () => {
    setHasDrawn(!HasDrawn);
    await onClick();
  };

  return (
    <button onClick={checkClick}>{HasDrawn ? "New Game?" : "Draw!"}</button>
  );
}
