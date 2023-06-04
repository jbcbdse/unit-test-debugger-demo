# Debugging unit tests

This repo is a demo of using VSCode's debugger with unit tests.

## Install

`npm install`

## Run

`npm start` to start the application

## Test

* `npm run test:jest` to run the unit tests written for Jest
* `npm run test:mocha` to run the unit tests written for Mocha
* `npm run test:jest:debug` to run the unit tests written for Jest, but with a longer timeout and no parallel jobs
* `npm run test:mocha:debug` to run the unit tests written for Mocha, but with a longer timeout and no parallel jobs

There is a failing test and a line that is not covered by unit tests. Can you find this test and fix it using VSCode's debug tools?
