#!/bin/sh
./node_modules/.bin/istanbul cover -x "data_structures.js" ./node_modules/.bin/_mocha -- -R spec qa/tests_make_poem.js 