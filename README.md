# L-Systems and Formal Grammar to Procedurally Generate Organic Systems

## About

This repository explores what L-systems are (in as laughably little detail as a project lasting a few days does), and fields my attempt to write an L-system from scratch using `p5.js`.

## What are L-Systems?

*L-Systems* are models governed by an algorithm developed by Hungarian botanist Aristid Lindenmayer to model cellular growth. The way the algorithm is structured is as a formal grammar with an initial set of symbols (an alphabet), and production rules governed by axiom(s).

L-Systems are all text based, meaning they apply to characters as any grammar would, this repository and project explores L-systems in the world of graphics with the aim to understand how formal grammars can be represented not just as characters but as cool procedurally generated organic-looking graphics (and art!).

## Algorithms

### 1. Basic Character Replacement

```
1. Init axiom and sentence
2. Init ruleset
3. Create generate() function
    a. Create empty new string
    b. Loop over sentence
    c. Match character in sentence to input character of rules in ruleset
        i. In case of a match, newSentence += rule.outputCharacter
        ii. For no match, nextSentence += currentCharacter
    d. Update sentence = newSentence
    e. createP(sentence)
```

## References
- [L-Systems Wikipedia](https://en.wikipedia.org/wiki/L-system)
- [TheCodingTrain's Video on L-Systems](https://youtu.be/E1B4UoSQMFw?si=WHHvXbic7hPP-Hhd)