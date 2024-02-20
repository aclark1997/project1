from card import Card
import random

SUITS = ["C", "D", "H", "S"]
RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A"]


class Deck:
    def __init__(self):
        print("Deck constructor")
        self.id = ""
        self.cards = []
        self.cardct = 0

        while(len(self.cards) < 52):
            card = {
                "rank": random.choice(RANKS),
                "suit": random.choice(SUITS)
                }
            duplicate = 0
            for c in self.cards:
                if c.rank == card["rank"] and c.suit == card["suit"]:
                    duplicate = 1

            if duplicate == 0:
                self.cards.append(Card(card["rank"], card["suit"]))

        print(self.cards)

    def deal(self, ct):
        dealt = []

        while len(dealt) < ct:
            card = {
                "rank": random.choice(RANKS),
                "suit": random.choice(SUITS)
            }
            for c in self.cards:
                if c.rank == card["rank"] and c.suit == card["suit"]:
                    dealt.append(c)
                    self.cards.remove(c)
                    break
        return dealt
