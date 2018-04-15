/**
 * Determines some information about a string of words, or words input from a
 * file. This information includes the number of occurences of each word in
 * the file, the frequency at which those words appear, as well as which
 * words exactly follow each word and their amount and frequencies.
 * There is a possible use for deciphering secret texts by analyzing which
 * words appear often and after what other word,which in turn can be compared
 * to traditional language to determine text.
 * @author Kevin Filanowski
 * @version 03/16/18
 **/

 var exports = module.exports = {};
 exports.wordCount = wordCount;
 exports.wordFreq = wordFreq;
 exports.condWordCount = condWordCount;
 exports.condWordFreq = condWordFreq;

/**
 * This function counts the number of occurences of a word in a given string.
 * An object is formed containing key value pairs, with the keys being the word
 * and the value being the amount of times the word appears in the string.
 * @param {String} data - The contents of the file.
 * @return {Object} - Object containing all of the word occurences in the
 * string.
 **/
function wordCount(data) {
  /** wordCount object will count how many words appear in the data.**/
  var _wordCount = {};

  /** Create an array with all of the words split by escape characters. **/
  var wordArray = data.split(" ");

  for (var index in wordArray) {
    //Does the word exist in the array? Create a property and set to 1,
    //else increment the value by 1.
    if (_wordCount[wordArray[index]] == undefined)
      _wordCount[wordArray[index]] = 1;
    else
      _wordCount[wordArray[index]]++;
  }
  return _wordCount;
} //END WORDCOUNT

/**
 * This function determines the frequency in which a word occurs in a given
 * object containing all of the words and their occurences.
 * @param {String} data - The contents of the file.
 * @return {Object} - object containing the words and the frequency in which
 * they occur.
 **/
function wordFreq(data) {
  /** The wordFreq object, to store all of the frequency information. **/
  var _wordFreq = {};

  /** The total amount of words in the variable data. **/
  var totalWordCount = data.split(" ").length;

  /** Object containing all of the word occurences in the string. **/
  var _wordCount = wordCount(data);

  /** Retrieve all of the keys from the object. **/
  var keys = Object.keys(_wordCount);

  //Computation for word frequencies.
  for (var index = 0; index < keys.length; index++)
    _wordFreq[keys[index]] = _wordCount[keys[index]] / totalWordCount;

  return _wordFreq;
} //END WORDFREQ

/**
 * This function determines both how many and what words occur after each word
 * and stores that information in an object with objects as values.
 * @param {String} data - The contents of the file.
 * @return {Object} - Object containing keys with unique words, and values
 * consisting of one object with key-value pairs that determine what word
 * and how many words are after the original word (key).
 * I.E: {Blue : {Red: 1, Green: 2}, Red: {Green: 1, Red: 2, Blue: 1}, etc: {}}
 **/
function condWordCount(data) {
  /** The wordFreq object, to store all of the word count information. **/
  var _condWordCount = {};

  /** Create an array with all of the words split by escape characters. **/
  var wordArray = data.split(' ');

  /** The last element's index in the wordArray. This is used in Case 2. **/
  var lastIndex = wordArray.length-1;

  //Begin by traversing through every word in wordArray (data).
  for (var index = 0; index < wordArray.length; index++) {
    //If the word is not in the array, initialize the key word with
    //an empty object.
    if (_condWordCount[wordArray[index]] == undefined) {
      _condWordCount[wordArray[index]] = {};
    }

    //CASE 1: Neighboring Elements
    //Traverse through the array and add the current element to the previous
    //entry, initializing it as needed.
    if (index > 0) {
      if (_condWordCount[wordArray[index-1]][wordArray[index]] == undefined)
        _condWordCount[wordArray[index-1]][wordArray[index]] = 1;
      else
        _condWordCount[wordArray[index-1]][wordArray[index]]++;
    }
  }

  //CASE 2: First-and-Last
  //Consider the case where the first element follows the last element.
    if (_condWordCount[wordArray[lastIndex]][wordArray[0]] == undefined)
      _condWordCount[wordArray[lastIndex]][wordArray[0]] = 1;
    else
      _condWordCount[wordArray[lastIndex]][wordArray[0]]++;

  return _condWordCount;
} //END CONDWORDCOUNT

/**
 * This function determines the specific frequency of a word that follows
 * another word and returns an object with objects as values containing that
 * information. I.E {Blue: {Red: 0.5, Tan: 0.5}, Red: {Green: 1.0}, etc: {}}
 * @param {String} data - The contents of the file.
 * @return {Object} - Object containing both the unique words and their
 * proceeding words frequency by storing another object in the value pairs.
 **/
function condWordFreq(data) {
  /** Keeps temporary track of the number of words in the inner object **/
  var wordCounter = 0.0;

  /** An array of all of the unique words in data. **/
  var keys = Object.keys(wordCount(data));

  /** This object contains keys with unique words, and values consisting of
  * an object with key-value pairs that determine what word and how many words
  * are after the original key word **/
  var _condWordFreq = condWordCount(data);

  /** An array of all of the unique words in _condWordCount's values. **/
  var tempKeys;

  //Run through each KEY in _condWordCount to get a VALUE.
  for (var i = 0; i < keys.length; i++) {
    tempKeys = Object.keys(_condWordFreq[keys[i]]);
    //Traverse through keys of the value object and get inner values.
    for (var j = 0; j < tempKeys.length; j++) {
      //Add up the total words in this one key.
      wordCounter += _condWordFreq[keys[i]][tempKeys[j]];
    }

    //Repeat the iteration, this time modifying the frequency.
    for (var k = 0; k < tempKeys.length; k++) {
      _condWordFreq[keys[i]][tempKeys[k]] = _condWordFreq[keys[i]][tempKeys[k]]
      / wordCounter;
    }
    //Reset the word counter to count a new pair of values.
    wordCounter = 0.0;
  }
  return _condWordFreq;
}
