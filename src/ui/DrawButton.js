import { useState, useCallback } from "react";

export default function DrawButton({ onClick }) {
  const [HasDrawn, setHasDrawn] = useState(false);

  const checkClick = async () => {
    setHasDrawn(true);
    await onClick();
  };

  return (
    <button onClick={onClick} disabled={HasDrawn}>
      {HasDrawn ? "New Game?" : "Draw!"}
    </button>
  );
}
