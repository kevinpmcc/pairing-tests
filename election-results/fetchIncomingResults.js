const formatResults = require('./handleIncomingResults').formatResults
const createAndOutputFormattedResults = require('./handleIncomingResults').createAndOutputFormattedResults
const fs = require('fs')

const file = './sampleResults.csv';
const overrideFile = './overrideResults.csv';

var originalText;
var overrideText;
fs.readFile(file, 'utf8', (err, textResults) => {
  if (err) return console.log(err);
  fs.readFile(overrideFile, 'utf8', (err, overrideResults) => {
    if (err) return console.log(err);
    console.log(createAndOutputFormattedResults(textResults, overrideResults))  
  })
  
  })


