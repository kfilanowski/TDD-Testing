/**
 * makePoem.js creates a poem based on input parameters and a file containing
 * lots of words.
 * @author Kevin Filanowski, Caleb Tupone
 * @version 04/15/2018
**/

//Import file reading and the data_structure algorithms
var data_structure = require("./data_structures.js");
var fs = require("fs");

var exports = module.exports = {};
exports.displayDiagnostics = displayDiagnostics;
exports.findCondProbability = findCondProbability;
exports.findProbability = findProbability;
exports.makePoem = makePoem;
exports.pickFirstWord = pickFirstWord;
exports.pickNextWord = pickNextWord;
exports.removeDelimiters = removeDelimiters;

/**
 * Main function. Calls all of the methods.
 * @param {String} file - The name of the textfile in the local directory.
 * @param {Number} stanzas - How many stanzas in the poem.
 * @param {Number} lines - How many lines per stanza in the poem.
 * @param {Number} words - How many words per line.
 * @param {Object} array_prob - Array of probabilities. The number of elements
 * in this array is equal to the number of words expected to be printed.
 * @param {Boolean} display - Whether or not to display extra diagnostic data.
**/
function main(file, stanzas, lines, words, array_prob, display) {
  //Read the file
  var data = fs.readFileSync(file, "utf-8").trim();

    //Display data
    if (display)
      displayDiagnostics(data);

    console.log(makePoem(data, array_prob, stanzas, lines, words));
}

/**
 * A function that displays diagnostic and verbose information about the
 * methods used to create makePoem.
 * @param {String} data - String containing all of the words in a file.
 **/
 function displayDiagnostics(data) {
   console.log("The word count is: ");
   var _wordCount = data_structure.wordCount(data);
   console.log(_wordCount);

   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   console.log("The word frequency is: ");
   var _wordFreq = data_structure.wordFreq(data);
   console.log(_wordFreq);

   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   console.log("The conditional word count is: ");
   var _condWordCount = data_structure.condWordCount(data);
   console.log(_condWordCount);

   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   console.log("The conditional word frequency is: ");
   var _condWordFreq = data_structure.condWordFreq(data);
   console.log(_condWordFreq);

   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   console.log("Testing probability");
   var probability = findProbability(data);
   console.log(probability);

   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   console.log("Testing pick first word");
   var firstWord = pickFirstWord(data, 0.6);
   console.log("probability 0.6 is: " + firstWord);

   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   console.log("Testing findCondProbability");
   var condProbability = findCondProbability(data);
   console.log(condProbability);

   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   console.log("Testing pickNextWord");
   var nextWord = pickNextWord(data, 0.4, "green");
   console.log("probability 0.4 and last word is green gives: " + nextWord);
   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
 }

/**
* Helper method to find the range of probabilities for each condition word.
* @requires data_structures.js - condWordFreq and condWordCount function needed.
* @param {String} data - String containing all of the words in a file.
* @return {Object} - Sorted object containing the probability
* range for each word in condWordFrequency.
**/
function findCondProbability(data) {
  var _key;
  var ordered      = {};
  var value_object = {};
  var key_array    = [];
  var condWordFrequency = data_structure.condWordFreq(data);
  var sum = 0;

  Object.keys(condWordFrequency).sort().forEach(function(key) {
    //Sort all the keys (not values), and assign it to a new object.
    ordered[key] = condWordFrequency[key];

    //Store the value's keys and sort the keys alphabetically.
    key_array = Object.keys(condWordFrequency[key]).sort();

    //Create a new sorted value-key object.
    for (var i in key_array) {
      value_object[key_array[i]] = ordered[key][key_array[i]];
    }

    //Assign the ordered values to the proper location.
    ordered[key] = value_object;

    //Assign all of the probabilities for the current value.
    for (var i in key_array) {
      sum += ordered[key][key_array[i]];
      ordered[key][key_array[i]] = sum;
    }

    //Reset for the next iteration.
    key_array = [];
    value_object = {};
    sum = 0;
  });
  return ordered;
}

/**
 * Helper method to find the range of probabilities for each word.
 * @requires data_structures.js - Functions wordFreq and wordCount required.
 * @param {String} data - String containing all of the words in a file.
 * @return {Object} - Sorted object containing the probability
 * range for each word in wordFrequency.
 **/
function findProbability(data) {
  var _key;
  var wordFrequency
  var ordered = {};
  var sum = 0;

  //Sort the object
  wordFrequency = data_structure.wordFreq(data);
  Object.keys(wordFrequency).sort().forEach(function(key) {
    ordered[key] = wordFrequency[key];
  });

  //Create a probability array for the words.
  for (_key in ordered) {
    sum += ordered[_key];
    ordered[_key] = sum;
  }
  return ordered;
}

/**
 * Takes information from main, such as amounts of stanzas, lines, words
 * and probabilities to build a 'poem' out of a provided text file.
 * @param {String} data - String containing all fo the words in a file.
 * @param {Object} array_prob - Array of probabilities. The number of elements
 * in this array is equal to the number of words expected to be printed.
 * @param {Number} stanza - The number of stanzas in a poem.
 * @param {Number} lines - The number of lines in a stanza.
 * @param {Number} words - The number of words in a line.
 * @return {String} - The complete formatted poem.
**/
function makePoem(data, array_prob, stanzas, lines, words) {
  var nextWord;
  var lastWord = pickFirstWord(data, array_prob[0]);
  var poem = lastWord + " ";
  var wordCount = 0;
  var tmp_len = 1;

  for (var i = 0; i < stanzas; i++) {
    for (var j = 0; j < lines; j++) {
      for (var k = tmp_len; k < words; k++) {
        wordCount++;
        nextWord = pickNextWord(data, array_prob[wordCount], lastWord);
        poem += nextWord + " ";
        lastWord = nextWord;
      }
      tmp_len = 0; // Sets length of array back to 0 for the next line.
      //Add spaces if there are additional lines.
      if (j < lines-1)
        poem += "\n";
    }
    //Add spaces if there are additional lines.
    if (i < stanzas-1)
      poem += "\n\n";
  }
  return poem;
}

/**
 * Returns the first word of the poem depending on the probability of
 * all words in the input file and the first probability in the
 * probability array given by the user.
 * @param {String} data - String containing all of the words in a file.
 * @param {Number} prob - The next probability in the probability array.
 * @return {String} - The word that was picked.
 **/
function pickFirstWord(data, prob) {
  var key;
  var probability = findProbability(data);

  for (key in probability) {
    if (prob <= probability[key]) {
      return key;
    }
  }
}

/**
 * Returns the next word of the poem depending on the probability of
 * all words in the input file and the next probability in the
 * probability array given by the user.
 * @param {String} data - String containing all of the words in a file.
 * @param {Number} prob - The next probability in the probability array.
 * @param {String} previousWord - The previous word in the sequence.
 * @return {String} - The word that was picked.
 **/
function pickNextWord(data, prob, previousWord) {
  var key;
	var probability = findCondProbability(data);

  for (key in probability[previousWord]) {
    if (prob <= probability[previousWord][key]) {
      return key;
    }
  }
}

if (require.main === module) {
  main('rbrbb_input_text.txt',1,2,3,[0.6,0.2,0.8,0.9,0.4,0.4],false);
}
