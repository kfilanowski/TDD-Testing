/**
 * tests_data_structures.js Is TDD testing for the data_structures.js file.
 * @author Kevin Filanowski
 * @version 04/15/2018
**/

var assert = require('chai').assert;
var data_structures = require("../data_structures.js");
var fs = require("fs");

/** A test suite for testing the wordCount function. **/
suite("Test data_structures.js file", function() {
  /** Test fixtures, created for the entire suite. **/
  var dataA = null;
  var dataB = null;
  var dataC = null;
  var dataD = null;

  /** Called as the test suite begins, useful for setting up things**/
  suiteSetup( function() {
    //BEFORE
    dataA = fs.readFileSync("./qa/textSamples/rbbrrg_input_text.txt", "utf-8").trim();
    dataB = fs.readFileSync("./qa/textSamples/rbrbb_input_text.txt", "utf-8").trim();
    dataC = fs.readFileSync("./qa/textSamples/empty_input_text.txt", "utf-8").trim();
    dataD = fs.readFileSync("./qa/textSamples/newline_input_text.txt", "utf-8").trim();
    dataE = fs.readFileSync("./qa/textSamples/Beowulf.txt", "utf-8").trim();
    console.log(data_structures.wordCount(dataE));
  });

  /**Called before each unit test to set up fixtures for testing purposes **/
  //setup( function() {
    //BEFORE EACH
    //What do i put in here?..
  //});

  /**Called after each function to reset objects, or tear down things after **/
  //teardown( function() {
    //AFTER EACH
    //what do i put in here?..
  //});

  /**Called as the test suite ends. Useful for tearing down any objects or other things needed **/
  suiteTeardown( function() {
    //AFTER
    dataA = null;
    dataB = null;
    dataC = null;
    dataD = null;
  });

  /**BELOW HERE ARE THE UNIT TESTS**/
  /**Testing the WordCount function**/
  suite("Unit tests for wordCount function", function() {
    test("Test if rbbrrg_input_text is {red: 3, blue: 2, green: 1}.", function() {
      assert.deepEqual(data_structures.wordCount(dataA),
      {red: 3, blue: 2, green: 1});
    });

    test("Test if rbrbb_input_text is {red: 2, blue: 3}.", function() {
      assert.deepEqual(data_structures.wordCount(dataB), {red: 2, blue: 3});
    });

    test("Test if empty_input_text is empty.", function() {
      assert.strictEqual(data_structures.wordCount(dataC), "Input is empty");
    });

    test("Test if newline_input_text is {red: 3, blue: 2, green: 1}.", function() {
      assert.deepEqual(data_structures.wordCount(dataD), {red: 3, blue: 2, green: 1});
    });
  }); //END WORDCOUNT TESTS

  /** Testing the WordFreq Function **/
  suite("Unit tests for wordFreq function", function() {
    test("Test if rbbrrg_input_text is {red: 0.5, blue: 1/3, green: 1/6}", function() {
      assert.deepEqual(data_structures.wordFreq(dataA), {red: 0.5, blue: 1/3, green: 1/6});
    });

    test("Test if rbrbb_input_text is {red: 2/5, blue: 3/5", function() {
      assert.deepEqual(data_structures.wordFreq(dataB), {red: 2/5, blue: 3/5});
    });

    test("Test if empty_input_text is empty", function() {
      assert.strictEqual(data_structures.wordFreq(dataC), "Input is empty");
    });

    test("Test if newline_input_text is {red: 1/2, blue: 1/3, green: 1/6}", function() {
      assert.deepEqual(data_structures.wordFreq(dataD), {red: 0.5, blue: 1/3, green: 1/6});
    });
  }); //END WORDFREQ tests

  /** Testing the condWordCount function **/
  suite("Unit tests for CondWordCount function", function() {
    test("Test if rbbrrg_input_text is {red: {blue: 1, green: 1, red: 1}, blue: {blue: 1, red: 1}, green: {red: 1}}.", function() {
      assert.deepEqual(data_structures.condWordCount(dataA), {red: {blue: 1, green: 1, red: 1}, blue: {blue: 1, red: 1}, green: {red: 1}});
    });

    test("Test if rbrbb_input_text is {red: {blue: 2}, blue: {blue: 1, red: 2}}.", function() {
      assert.deepEqual(data_structures.condWordCount(dataB), {red: {blue: 2}, blue: {blue: 1, red: 2}});
    });

    test("Test if empty_input_text is empty.", function() {
      assert.strictEqual(data_structures.condWordCount(dataC), "Input is empty");
    });

    test("Test if newline_input_text is {red: {blue: 1, green: 1, red: 1}, blue: {blue: 1, red: 1}, green: {red: 1}}.", function() {
      assert.deepEqual(data_structures.condWordCount(dataD), {red: {blue: 1, green: 1, red: 1}, blue: {blue: 1, red: 1}, green: {red: 1}});
    });
  }); //END CONDWORDCOUNT TESTS

  /** Testing condWordFreq function**/
  suite("Unit tests for condWordFreq function", function() {
    test("Test if rbbrrg_input_text is {red: {blue: 1/3, green: 1/3, red: 1/3}, blue: {blue: 0.5, red: 0.5}, green: {red: 1}}.", function() {
      assert.deepEqual(data_structures.condWordFreq(dataA), {red: {blue: 1/3, green: 1/3, red: 1/3}, blue: {blue: 0.5, red: 0.5}, green: {red: 1}});
    });

    test("Test if rbrbb_input_text is {red: {blue: 1}, blue: {blue: 1/3, red: 2/3}}.", function() {
      assert.deepEqual(data_structures.condWordFreq(dataB), {red: {blue: 1}, blue: {blue: 1/3, red: 2/3}});
    });

    test("Test if empty_input_text is empty.", function() {
      assert.strictEqual(data_structures.condWordFreq(dataC), "Input is empty");
    });

    test("Test if newline_input_text is {red: {blue: 1/3, green: 1/3, red: 1/3}, blue: {blue: 0.5, red: 0.5}, green: {red: 1}}.", function() {
      assert.deepEqual(data_structures.condWordFreq(dataD), {red: {blue: 1/3, green: 1/3, red: 1/3}, blue: {blue: 0.5, red: 0.5}, green: {red: 1}});
    });
  }); //END CONDWORDFREQ TESTS

  /** Testing REMOVENONALPHA function**/
  suite("Unit tests for removeNonAlpha function", function() {
    test("Testing ", function() {
      //assert
    });

    test("Testing ", function() {
      //assert
    });

    test("Testing ", function() {
      //assert
    });

    test("Testing ", function() {
      //assert
    });
  }); //END REMOVENONALPHA TESTS
}); //END DATA_STRUCTURES TEST SUITE
