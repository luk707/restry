# Restry

## Motivation

- build a no hastle framework for building rest api's
- Encorage composition
- Zero config

## Block architecture

A block is a request handler, it recieves all requests and it's job is to return a promise that will resolve when a response has been made.

```js
const myBlock = context => Promise<void>
```

The context of a block is just an object that specifies what context the block should run in.
