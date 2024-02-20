import asyncio
import asyncpg
import random
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from deck import Deck

SUITS = ["C", "D", "H", "S"]
RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A"]

app = FastAPI()

decks = {}

@app.get("/api/v1/hello")
async def api_v1():
    return {"message": "Hello World!"}


@app.get("/api/v1/deal")
async def api_v1_deal():
    return {"rank": random.choice(RANKS), "suit": random.choice(SUITS)}


@app.post("/api/v2/deck/new")
async def api_v2_deck_new():
    d = Deck()
    d.id = str(hash(d))
    decks[d.id] = d
    return {"message": "deck created!", "id": d.id}


@app.get("/api/v2/deck/{deck_id}")
async def api_v2_deck(deck_id: str):
    if deck_id in decks:
        #print(decks[deck_id])
        return decks[deck_id]

    print(f"need to fetch Deck {deck_id}")
    raise HTTPException(status_code=404, detail=f"Deck {deck_id} not found")


@app.get("/api/v2/deck/{deck_id}/deal/{count}")
async def api_v2_deck(deck_id: str, count: int):
    return decks[deck_id].deal(count)
    print(f"need to deal {count} cards from {deck_id}")
    raise HTTPException(status_code=404, detail=f"Deck {deck_id} not found")


app.mount("/", StaticFiles(directory="ui/dist", html=True), name="ui")
