import { React, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Api from "./Api.js";
import App from "./App.js";

async function main() {
  const newDeck = await Api.deck();
  console.log(newDeck);

  const fetchedDeck = await Api.deck("1234");
  console.log(fetchedDeck);

  // let the server deal the hand
  const initialCards = await Promise.all([
    // note: this is still calling the v1 APIs
    Api.deal(),
    Api.deal(),
    Api.deal(),
    Api.deal(),
    Api.deal(),
  ]);
  console.log(initialCards);

  // create React elements
  const root = createRoot(document.getElementById("app"));
  root.render(<App initialCards={initialCards} />);
}

window.onload = main;
