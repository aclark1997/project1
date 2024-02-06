# Project 1 -- Poker

Let's revisit [Lab 1]("../../labs/lab1) and try to make one of the
solutions we discussed in class work. You'll be working with a
partner, but you'll each get a separate grade.

There are several goals with this lab.

1. Practice with your new development environment
2. Practice with Git & Github
3. Practice implementing a high-level idea
4. Practice collaboration
5. Gain more exposure to the client-server model
6. Gain more exposure to Python and/or JavaScript

## Basic Design

In its original form, we had a single server-side API called `deal`
which would return a randomly generated card object represented as
JSON. This API was problematic in that it could potentially return
duplicate cards, even in the same hand. Most of Lab 1 was based around
trying to find a solution for the problem and discovering that there
wasn't a simple one.

After some discussion, we decided that we would need to have a Deck
abstraction from which we could deal. The Deck would consist of all of
exactly one of all possible cards, and it would be shuffled. We would
track the "top" of the deck and only deal from it, meaning we would
never deal a duplicate card (at least until we got to the end of the
deck and had to reshuffle).

The main problem with this approach is that it doesn't handle multiple
clients very well. In other words, multiple browser instances can't
connect to the game at once, or they'd all be using the same deck!

So we landed on the following idea. When a client first connects, a
new deck is created explicitly for that client. The server returns an
ID associated with the deck to the client, and when the client calls
the `deal` API, it also sends the ID along with the request.

Furthermore, we decided that when dealing we would accept an
additional parameter representing the number of cards to be
dealt. This solves a couple problems: (1) it makes it so we don't have
to do 5 http requests to request 5 cards, and (2) since we know how
many cards the client is requesting, we know wheter we have enough
cards left in the deck to fulfill the request, or whether we need to
reshuffle.

As we discussed in class, this solution still has the "server
affinity" problem in the sense that the client is tightly coupled to a
single instance of a server (since the server stores the state of the
deck). Later this semester, we'll learn how to make it so that /any/
server can know the state of the deck by using an external cache like
Redis to store the Deck state.

## Setup

I'll pair you up. Then you'll decide who is going to be the
"front-end" engineer (JavaScript/React) and who is going to be the
"back-end" engineer (Python). Your role will change in future
projects, so eventually everyone will get to be both.

I think the JavaScript work in this project might be a little more
"alien" than the Python work, mainly because React and React Hooks
follow the functional programming paradigm. Because of this, I've
included a lot more starter code relating to React & JavaScript.

Keep in mind that it will be hard to successfully complete this
independently. You and your partner are a team. And just because one
of you is front-end and one of you is back-end doesn't mean that you
won't have to work together to solve problems. Yes, the back-end
engineer may have to dive into some JavaScript code and
vice-versa. Similarly, you'll be reviewing each others code.

Once you make a decision, do the following:

1) The front-end engineer creates a new git repository. They will then
copy the contents of this directory over to the new repository. This
content will be your initial commit.

2) The back-end engineer creates a new Github project. They will add
the front-end engineer, Sarah, and Semmy as collaborators and make
sure they have access.

3) The front-end engineer pushes the new repository to the Github
project.

4) The back-end engineer clones the project so both folks have a clone
of the repository that tracks the github project.

## Process

**We will never commit directly to the main branch!**

If we do that, you run the risk of having to reclone the repository
and copy files around, which is a big pain.

Instead, We'll work incrementally on local branches. When we have some
commits we're ready to push, the local branch should be pushed to the
remote and a pull request should be created from it. You should add
Semmy, Sarah, and your partner as reviewers on the code, and they should
be reviewed within 24 hours.

You'll have two weeks to complete this project, and we are expecting
at least 3-4 pull requests **from each person** equally spaced out
over that time. This means it's a good idea to scaffold things out and
do commits that may not be fully working. It's okay to have more than
3-4 pull requests, but not less.

Every pull requests should answer the following questions, with the
questions listed as Markdown headers.

1) What is included in this change?
2) Describe at least one problem you solved
3) How did you test this change?
4) If things are not currently working, explain.
5) Pull requests that impact the UI should include screenshots.

## Guidance

### Back-End

1. Use Python Classes for our abstractions. At minimum, we'll want a
Card class and a Deck class.

2. If you implement your Deck as a list of cards, you can use Python's
shuffle to guarantee a random permutation.

3. When a Deck is constructed, let's associate a randomly generated
string as an ID that is sent to the client. Why use a string? Because
it should probably be long enough that it goes out of bounds of a
typical Integer. It can still be an Integer, you'll just need to
convert it to a string for use. Ideally, it would be a long enough ID
so that it would be improbable for someone to guess an existing Deck
ID (a 'secure' ID). Maybe Chat GPT can help with this? By the way, why
is this important?

4. Use a Python dictionary to store the various decks, where the key
will be the id and the value will be the Deck instance associated with
the ID. When a request comes in for a Deck with that ID, you'll look
up the associated Deck in the map and deal from it.

5. Write a simple bash script to test the behavior of your API as
you're working. There's an example provided to get you started.

6. Collaborate on the API design with the front-end engineer. They may
want some additional information to share in their UI.

### Front-End

1. Use functional React Components for your abstractions. At minimum,
we'll want a Card Component, a Hand Component, and a DrawButton
Component.

2. Remember the business-logic requirements: a user may discard/draw
up to three cards unless they also have an Ace, in which case they may
discard all 4 non-Ace cards. You'll want to replace the "Draw" button
with a "Play Again?" button after the draw happens.

3. Typically, you'd want to create a client-side Deck class that
represents the server-side deck. In other words, it would encapsulate
management of the ids, and have async methods like `deal` which makes
the API call under the hood. This is a little tricky and not
absolutely necessary, but I encourage you to spend some time giving it
a shot.

4. Add some basic styling overall, along with some basic
call-to-actions/instructions to the page. We're not covering CSS in
any sort of detail in this class, but feel free to discuss ideas with
Chat GPT on how to make the game and the page look more modern using
CSS.

5. You don't need to wait for the back-end engineer to have a fully
working API. You can mock responses from the API as you're building
your UI. I call out the places in the comments in `Api.js` where you
can override the server-side responses with whatever you want.

6. Collaborate on the API design with the back-end engineer. You can
ask for any additional information that makes sense so that your UI is
nice and the overall solution is robust.

## Grading

You'll submit a peer evaluation of your partner at the end of the
project. More details on that to come.

**Meets Expectations**
1. Minimum number of pull requests (3-4) spaced out over the two weeks.
2. (BE) Working Deck & Card classes
3. (BE) Working test script
4. (FE) Working Card, Hand and Deck Components
5. (FE) Business-logic requirements are met
6. (FE) Components and app work with mock data
7. API is documented in Markdown

**Exceeds Expectations**
1. Everything is wired up and and working end-to-end
2. (BE) Secure ID generated
3. (FE) Client-side Deck Class created and working
4. (FE) Additional styling and call-to-actions on the page

**Greatly Exceeds Expectations**
1. Includes an API and Front-End for identifying the rank of the hand
(e.g. Two-of-a-Kind, Royal Flush, etc) after the draw round.

**Redefines Expectations**
1. I can't really tell you what this looks like because, well, if I
could then I would expect it, wouldn't I? :)


## Pro Tips

1. For front-end engineers, you can see your `console.log` statements
in the Chrome Developer Tools window. For back-end engineers, you can
your `print` statements in the docker compose logs. We will demo both
of these in class.

2. Nearly every concept that you need to solve these problems is
demonstrated in the starter code, with the exception of the two things
above that I recommended you talk with Chat GPT about. There are a few
things you might want to read (or talk with Chat GPT) more about:

    * Writing a class in Python
    * The `curl` CLI interface, and `jq` if you'd like to use that
    * Python dictionaries (this is fairly trivial)
    * React props and how they are passed to components (this is fairly trivial)
    * React hooks -- specifically `useState` and `useCallback`
    * Functional array methods in JavaScript, like `map` and `Array.from`

3. Sometimes your server or ui will get into a bad state and start
acting wonky. You can restart them with the following commands.

```
$ docker compose restart server
$ docker compose restart ui
```