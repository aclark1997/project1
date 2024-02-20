# Project 1
simple card game that allows the user to draw 3 cards or 4 with an ace

## endpoints
post:**api/v2/deck/new** generates a new deck with a unique string id

get:**api/v2/deck/${id}** fetches a deck based on a unique *id*, 

get:**api/v2/deck/\${id}/deal/\${count}** deals *count* from deck at *id*

