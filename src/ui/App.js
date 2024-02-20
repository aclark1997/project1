import Api from "./Api.js";
import Hand from "./Hand.js";
import Msg from "./Msg.js";
import { useEffect, useState, useCallback } from "react";

// brought to you by gg=G.........

/**
Note: For each game, we'll only allow the "Draw" to happen once.
This means we should hide the "Draw" button after it is clicked.
Better yet, let's change it to a different "Play Again" button that
resets everything and plays another hand (with a new Deck).
 **/
export default function App({ deckid, initialCards }) {
	const [cards, setCards] = useState(initialCards);
	const [selected, setSelected] = useState([]);
	var [hasDrawn, setDrawn] = useState(hasDrawn);
	var [msgpos, setmsgpos] = useState(msgpos);
	var [msgtext, setmsgtext] = useState(msgtext);
	msgpos = 0;

	if(!hasDrawn){
		msgtext = "Click 3 cards or 4 if you have an ace and press draw!";
	} else {
		msgtext = "Press play again for a new game!";
	}


	var minmsgpos = -200;

	useEffect(() => {
  		const interval = setInterval(() => {

			if(msgpos > minmsgpos){
				msgpos -= 1.5;
				document.getElementById("msg").style.top = msgpos + "px";
				document.getElementById("msg").style.opacity = 1 - -1 * msgpos / Math.abs(minmsgpos);
				console.log("a: " + document.getElementById("msg").style.opacity);
			} else {
				document.getElementById("msg").style.opacity = 1;
			}
  		}, 30);
		return () => clearInterval(interval);
	}, [hasDrawn]);

function toggleSelected(index) {
	if (!selected.includes(index)) {
		setSelected(selected.concat([index]));
	} else {
		setSelected(selected.filter((elt) => elt !== index));
	}
}

// This function will be called when the Draw button is clicked
const fetchNewCards = useCallback(async () => {

		//console.log(`need to fetch ${selected.length} cards`);
		// fetch the new cards
		//const fetchedCards = await Promise.all(
		/**
		  This is some wacky functional programming magic. It's bad
		  code, but you should practice understanding it.  Essentially,
		  we're creating a new array of the appropriate length, then
		  mapping over it to create an array of Promises, which we then
		  await.

		  Once API v2 is created, we can delete this and change it to a
		  much simpler single API call that specifies the number of
		  cards we want dealt.
		 **/
		//Array.from(Array(selected.length).keys()).map((arg, index) => {
		//return Api.deal();
		//}),
		let hasAce = false;


		if(hasDrawn == false){
			for(let i = 0; i < cards.length; i++){
				if(cards[i].rank == "A"){
					hasAce = true;
				}
			}

			if(hasAce == false){
				while(selected.length > 3){
					selected.pop();
				}

			} else {
				const hand = cards.map((card, index) => {
						return cards[index];
						});

				for(let i = 0; i < selected.length; i++){
					if(hand[selected[i]].rank == "A"){
						selected.splice(i, 1);
						break;
					}
				}
			}
			fetchedCards = await Api.dealV2(deckid, selected.length);
		} else {
			selected.splice(0, selected.length);
			cards.map((card, index) => {
					selected.push(index);
					});
			console.log(selected);
			fetchedCards = await Api.dealV2(deckid, selected.length);
		}
		// let's print out the fetched cards
		console.log(fetchedCards);

		// create the new hand with the fetched cards replacing the
		// selected cards
		let fetchedCardsIndex = 0;
		const newCards = cards.map((card, index) => {
				if (selected.includes(index)) {
				// we map this card to the new card, and increment
				// our fetchedCardsIndex counter
				return fetchedCards[fetchedCardsIndex++];
				} else {
				return card;
				}
				});

		// update state, causing a re-render

		setCards(newCards);
		setSelected([]);
		if(!hasDrawn){
			setmsgpos(0);
			setDrawn(true);
			document.getElementById("msg").style.top = msgpos + "px";
		} else {
			setmsgpos(0);
			console.log("!");
			setDrawn(false);
			document.getElementById("msg").style.top = msgpos + "px";
		}
}, [msgpos, msgtext, hasDrawn, selected, cards]);

return (
		<div>
		<Msg text={hasDrawn, msgtext} id="msg" />
		<Hand
		cards={cards}
		selected={selected}
		onSelect={(index) => toggleSelected(index)}
		/>
		<button id="drawbtn" onClick={async () => fetchNewCards(selected)}>{hasDrawn ? "Play again" : "Draw"}</button>
		</div>
       );
}
