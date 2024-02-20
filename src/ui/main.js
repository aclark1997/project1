import { React, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Api from "./Api.js";
import App from "./App.js";

async function main() {
  const newDeck = await Api.deck();
  console.log(newDeck);

  const fetchedDeck = await Api.deck(newDeck.id);
  console.log(fetchedDeck);

  // let the server deal the hand
  const initialCards = await Api.dealV2(newDeck.id, 5);
  console.log(initialCards);
	
  // create React elements
  const root = createRoot(document.getElementById("app"));
  root.render(<App deckid={newDeck.id} initialCards={initialCards} />);
}

window.onload = main;
