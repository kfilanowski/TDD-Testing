#!/bin/sh
./node_modules/.bin/istanbul cover -x "make_poem.js" ./node_modules/.bin/_mocha -- -R spec qa/tests_data_structures.js
