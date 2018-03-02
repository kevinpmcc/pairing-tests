module.exports = function (wallaby) {
  return {
  
    files: [
      'snackShack.js', 'package.json'
    ],
    tests: [
      'snackShack.test.js', '!snackShack.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  };
};