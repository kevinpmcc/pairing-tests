const formatResults = require('./handleIncomingResults').formatResults

const fs = require('fs')

const file = './sampleResults.csv';
fs.readFile(file, 'utf8', (err, textResults) => {
  if (err) return console.log(err);
  console.log(formatResults(textResults))
});


