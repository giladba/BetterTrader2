module.exports = function(InstrumentTracking) {
  InstrumentTracking.sayHi = function(cb) {
    var myAns = "Hi";
    var err=false;
    cb(err, myAns);
  }
};
