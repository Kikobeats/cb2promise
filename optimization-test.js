'use strict'

const cb2promise = require('./')

function fn(a, b, c, d, e, f, g, h, i, j, k, cb) {
  cb(null, a, b, c, d, e, f, g, h, i, j, k)
}

//Function that contains the pattern to be inspected (using an `eval` statement)
function exampleFunction() {
  return cb2promise(fn, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10)
}

function printStatus(fn) {
  var status = %GetOptimizationStatus(fn)
  switch (status) {
    case 1:
      console.log("Function is optimized");
      break;
    case 2:
      console.log("Function is not optimized");
      break;
    case 3:
      console.log("Function is always optimized");
      break;
    case 4:
      console.log("Function is never optimized");
      break;
    case 6:
      console.log("Function is maybe deoptimized");
      break;
    case 7:
      console.log("Function is optimized by TurboFan");
      break;
    default:
      console.log("Unknown optimization status");
      break;
  }

  return status
}

function handleError(err) {
  console.error(err.stack);
  process.exit(1);
}

//Fill type-info
exampleFunction().then(function() {
  // 2 calls are needed to
  // go from uninitialized -> pre-monomorphic -> monomorphic
  exampleFunction().then(function() { %
    OptimizeFunctionOnNextCall(exampleFunction);
    //The next call
    exampleFunction().then(function() {
      //Check
      var status = printStatus(exampleFunction);
      if (status === 2 || status === 4) process.exit(1)
    }).catch(handleError);
  }).catch(handleError);
}).catch(handleError);
