'use strict';

const express = require('express');
const router = express.Router();

const request = require('request');
const cardSuits = [{suit: "club", order:1},{ suit: "spade", order:2}, { suit: "heart", order:3}, { suit: "diamond", order:4}]
const cardValues = [{value:2, order:13}, {value:3, order:12}, {value:4, order:11}, {value:5, order:10}, {value:6, order:9}, {value:7, order:8}, {value:8, order:7}, {value:9, order:6}, {value:10, order:5}, {value:"jack", order:4}, {value:"queen", order:3}, {value:"king", order:2}, {value:"ace", order:1}];

// GET request to initialise the card deck and return a shuffled deck.
router.get('/deck', function (req, res, next) {
    let deck = [];
    for (var i = 0, len = cardSuits.length; i < len; i++) {
        for (var j = 0, l = cardValues.length; j < l; j++) {
            deck.push({ "suit": cardSuits[i], "value": cardValues[j] });
        }
    }
    res.json(deck);
});

//POST - receives a deck in the body and responds with the shuffled deck
router.post('/shuffle', function (req, res, next) {
    //incoming deck
    let deck = req.body;
    let j, temp;
    for (var i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
    res.json(deck);
});

//POST - receives a deck in the body and picks the first #number of cards. 
router.post('/pickCards/:number', function (req, res, next) {
    //incoming deck
    let deck = req.body;
    let number = req.params.number;
    if (!number || number < 1 || number > 52) {
        res.json({ "error": "The number of cards you want to pick is not valid!" })

    }
    else {
        let pickedCards = [];
        for (var i = 0; i < number; i++) {
            pickedCards.push(deck[i]);
        }
        //removing #number of cards from index 0 of deck 
        deck.splice(0, number);
        res.json({"pickedCards": pickedCards, "deck":deck});
    }
});

router.post('/pickCards/Sort/:number', function (req, res, next) {
    //incoming deck
    let deck = req.body;
    let number = req.params.number;
    if (!number || number < 1 || number > 52) {
        res.json({ "error": "The number of cards you want to pick is not valid!" })
    }
    else {
        let pickedCards = [];
        for (var i = 0; i < number; i++) {
            pickedCards.push(deck[i]);
        }
        deck.splice(0, number);
        const sortedDrawns = pickedCards.sort(function(a, b) {
            return a.suit.order - b.suit.order || a.value.order - b.value.order
        });
        res.json({"pickedCards":sortedDrawns, "deck":deck});
    }
});

module.exports = router;
