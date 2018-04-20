/**
 * tests_make_poem.js Is TDD testing for the makePoem.js file.
 * @author Kevin Filanowski, Caleb Tupone
 * @version 04/17/2018
**/

var assert = require('chai').assert;
var make_poem = require("../make_poem.js");
var fs = require("fs");

/** A test suite for testing the wordCount function. **/
suite("Test make_poem.js file", function() {
  /** Test fixtures, created for the entire suite. **/
  var dataA = null;
  var dataB = null;
  var dataC = null;
  var dataD = null;

  /** Called as the test suite begins, useful for setting up things**/
  suiteSetup( function() {
    //BEFORE
    dataA = fs.readFileSync("./qa/textSamples/rbbrrg_input_text.txt",
                            "utf-8").trim();

    dataB = fs.readFileSync("./qa/textSamples/rbrbb_input_text.txt",
                            "utf-8").trim();

    dataC = fs.readFileSync("./qa/textSamples/empty_input_text.txt",
                            "utf-8").trim();

    dataD = fs.readFileSync("./qa/textSamples/newline_input_text.txt",
                            "utf-8").trim();
  });

  /**
   * Called as the test suite ends. Useful for tearing down any objects or
   * other things needed
   **/
   suiteTeardown( function() {
     //AFTER
     dataA = null;
     dataB = null;
     dataC = null;
     dataD = null;
   });

   /** TESTING displayDiagnostics method **/
   suite("Calling displayDiagnostics", function() {
     test("Displaying diagnostic data:", function() {
         make_poem.displayDiagnostics(dataA);
         make_poem.displayDiagnostics(dataB);
         make_poem.displayDiagnostics(dataC);
         make_poem.displayDiagnostics(dataD);
      });
   });//END DISPLAYDIAGNOSTICS

  /** TESTING findCondProbability method **/
  suite("Unit tests for findCondProbability funtion", function() {
    test("Testing if rbbrrg_input_text is {red: {blue: 1/3, green: 2/3, red: 1}"
    + ",blue: {blue: 0.5, red: 1}, green: {red: 1}});", function() {
      assert.deepEqual(make_poem.findCondProbability(dataA),
                      {red: {blue: 1/3, green: 2/3, red: 1},
                       blue: {blue: 0.5, red: 1},
                       green: {red: 1}});
    });

    test("Testing if rbrbb_input_text is {red: {blue: 1}, "+
         "blue: {blue: 1/3, red: 1}}", function() {
      assert.deepEqual(make_poem.findCondProbability(dataB),
                      {red: {blue: 1},
                       blue: {blue: 1/3, red: 1}});
    });

    test("Testing if empty_input_text is empty", function() {
      assert.strictEqual(make_poem.findCondProbability(dataC),
                        "Input is empty");
    });

    test("Testing if newline_input_text is "
         + "{red: {blue: 1/3, green: 2/3, red: 1},"
         + "blue: {blue: 0.5, red: 1},"
         + "green: {red: 1}}", function() {
      assert.deepEqual(make_poem.findCondProbability(dataD),
                      {red: {blue: 1/3, green: 2/3, red: 1},
                      blue: {blue: 0.5, red: 1},
                      green: {red: 1}});
    });
  }); //END FINDCONDPROBABILITY

  /** TESTING findProbability method **/
  suite("Unit tests for findProbability function", function() {
    test("Testing if rbbrrg_input_text is {blue: 1/3, green: 1/2, red: 1}",
    function() {
      assert.deepEqual(make_poem.findProbability(dataA),
                      {blue: 1/3, green: 1/2, red: 1});
    });

    test("Testing if rbrbb_input_text is {red: 2/5, blue: 1}", function() {
      assert.deepEqual(make_poem.findProbability(dataB),
                      {blue: 3/5, red: 1});
    });

    test("Testing if empty_input_text is empty", function() {
      assert.strictEqual(make_poem.findProbability(dataC),
                        "Input is empty");
    });

    test("Testing if newline_input_text is {blue: 1/3, green: 1/2, red: 1}",
    function() {
      assert.deepEqual(make_poem.findProbability(dataD),
                      {blue: 1/3, green: 1/2, red: 1});
    });
  });// END FINDPROBABILITY

  /** TESTING makePoem method **/
  suite("Unit tests for makePoem function", function() {
    test("Testing if rbbrrg_input_text outputs a poem with one stanza,"
         + " two lines, and three words. Probability = [.6,.2,.8,.9,.4,.4]",
         function() {
      assert.strictEqual(make_poem.makePoem(dataA, [.6,.2,.8,.9,.4,.4],1,2,3),
                         "red blue red \nred green red ");
    });

    test("Testing if rbrbb_input_text outputs a poem with three stanzas,"
         + " two lines, and one word. Probability = [.3,.2,.7,1,0,.5]",
         function() {
      assert.strictEqual(make_poem.makePoem(dataB, [.3,.2,.7,1,0,.5],3,2,1),
                         "blue \nblue \n\nred \nblue \n\nblue \nred ");
    });

    test("Testing if empty_input_text is empty", function() {
      assert.strictEqual(make_poem.makePoem(dataC, [.6,.2,.8,.9,.4,.4],1,2,3),
                         "Input is empty");
    });

    test("Testing if newline_input_text outputs a poem with one stanza,"
         + " two lines, and there words. Probability = [.6,.2,.8,.9,.4,.4]",
          function() {
      assert.strictEqual(make_poem.makePoem(dataD, [.6,.2,.8,.9,.4,.4],1,2,3),
                         "red blue red \nred green red ");
    });
  });// END MAKEPOEM

//do make_poem test

  /** TESTING pickFirstWord method **/
  suite("Unit tests for pickFirstWord function", function() {
    //**DataA Test**//
    test("Testing if pickFirstWord with rbbrrg_input_text and probability 0.4"
         + " is green",
    function() {
      assert.strictEqual(make_poem.pickFirstWord(dataA, 0.4), "green");
    });

    test("Testing if pickFirstWord with rbbrrg_input_text and probability 0.2"
         + " is blue",
    function() {
      assert.strictEqual(make_poem.pickFirstWord(dataA, 0.2), "blue");
    });

    test("Testing if pickFirstWord with rbbrrg_input_text and probability 0.6"
         + " is red",
    function() {
      assert.strictEqual(make_poem.pickFirstWord(dataA, 0.6), "red");
    });
    //**END DataA Test**//

    //**DataB Test**//
    test("Testing if pickFirstWord rbrbb_input_text and probability 0.1 "
         + "is red", function() {
      assert.strictEqual(make_poem.pickFirstWord(dataB, 0.1), "blue");
    });

    test("Testing if pickFirstWord with rbrbb_input_text and probability 0.8"
         + " is blue", function() {
      assert.strictEqual(make_poem.pickFirstWord(dataB, 0.8), "red");
    });
    //**END DataB Test**//

    //**DataC Test**//
    test("Testing if pickFirstWord with empty_input_text is empty with "
         + "probability 0.5", function() {
      assert.strictEqual(make_poem.pickFirstWord(dataC, 0.5), "Input is empty");
    });
    //**END DataC Test**//

    //**DataD Test**//
    test("Testing if pickFirstWord with newline_input_text and probability 0.4"
         + " is green",
    function() {
      assert.strictEqual(make_poem.pickFirstWord(dataD, 0.4), "green");
    });

    test("Testing if pickFirstWord with newline_input_text and probability 0.2"
         + " is blue",
    function() {
      assert.strictEqual(make_poem.pickFirstWord(dataD, 0.2), "blue");
    });

    test("Testing if pickFirstWord with newline_input_text and probability 0.6"
         + " is red",
    function() {
      assert.strictEqual(make_poem.pickFirstWord(dataD, 0.6), "red");
    });
    //**END DataD Test**//
  });// END PICKFIRSTWORD

  /** TESTING pickNextWord method **/
  suite("Unit tests for pickNextWord function", function() {
    //**DataA Test**//
    test("Testing if pickNextWord with rbbrrg_input_text and probability 0.4"
         + " with previous word 'red' is green",
    function() {
      assert.strictEqual(make_poem.pickNextWord(dataA, 0.4, "red"), "green");
    });

    test("Testing if pickNextWord with rbbrrg_input_text and probability 0.2"
         + " with previous word 'green' is blue",
    function() {
      assert.strictEqual(make_poem.pickNextWord(dataA, 0.2, "green"), "red");
    });

    test("Testing if pickNextWord with rbbrrg_input_text and probability 0.6"
         + " with previous word 'blue' is red",
    function() {
      assert.strictEqual(make_poem.pickNextWord(dataA, 0.6, "blue"), "red");
    });
    //**END DataA Test**//

    //**DataB Test**//
    test("Testing if pickNextWord rbrbb_input_text and probability 0.1 "
         + "with previous word 'red' is blue", function() {
      assert.strictEqual(make_poem.pickNextWord(dataB, 0.1, "red"), "blue");
    });

    test("Testing if pickNextWord with rbrbb_input_text and probability 0.8"
         + " with previous word 'blue' is red", function() {
      assert.strictEqual(make_poem.pickNextWord(dataB, 0.8, "blue"), "red");
    });
    //**END DataB Test**//

    //**DataC Test**//
    test("Testing if pickNextWord with empty_input_text is empty with"
         + " with previous word 'red' and probability 0.5", function() {
      assert.strictEqual(make_poem.pickNextWord(dataC, 0.5, "red"),
                        "Input is empty");
    });
    //**END DataC Test**//

    //**DataD Test**//
    test("Testing if pickNextWord with newline_input_text and probability 0.4"
         + " with previous word 'red' is green",
    function() {
      assert.strictEqual(make_poem.pickNextWord(dataD, 0.4, "red"), "green");
    });

    test("Testing if pickNextWord with newline_input_text and probability 0.2"
         + " with previous word 'green' is blue",
    function() {
      assert.strictEqual(make_poem.pickNextWord(dataD, 0.2, "green"), "red");
    });

    test("Testing if pickNextWord with newline_input_text and probability 0.6"
         + " with previous word 'blue' is red",
    function() {
      assert.strictEqual(make_poem.pickNextWord(dataD, 0.6, "blue"), "red");
    });
    //**END DataD Test**//
  });// END PICKNEXTWORD
}); //END MAKE_POEM TEST SUITE
