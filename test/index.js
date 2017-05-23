// Requires all files that ends in .spec.js in the same folder and subfolders
var testsContext = require.context('.', true, /\.spec$/);
testsContext.keys().forEach(testsContext)