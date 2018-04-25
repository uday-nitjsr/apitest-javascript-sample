# apitest-javascript-sample
This is a sample project for api testing in javascript using supetest and mocha-cakes-2
The overall target is to achieve BDD structure of test cases which is easy to read and understand from the report files

## Setup
Make sure you have node installed in your system
Once you have code install all of the dependencies by using

`
npm install
`

## Test cases
You can add test data in "data" folder and create its getter at "getData" folder

`
./node_modules/mocha/bin/mocha --ui mocha-cakes-2 ./bddTest/ --timeout 15000 --reporter mocha-simple-html-reporter --reporter-options output=report.html
`
