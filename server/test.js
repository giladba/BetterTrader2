var loopback = require('loopback');
var boot     = require('loopback-boot');

/**
 * Created by giladba on 6/5/2016.
 */
var myFunc  = function(app) {
  var Rate = app.models.Rate;
  var Insts = app.models.InstrumentTracking;

  //Rate.find({ }, function(err, rates) {
  //    console.log(rates)
  // });


  Insts.create({"userID":"111","InstID":333},function(err){
    if(err)
      console.log(err)
  });
  Insts.find({}, function(err, answer){
    console.log("start inst tracking log");
    console.log(answer);
    console.log("end inst tracking log");
  });

  Insts.sayHi(function(err, answer){
    console.log("start inst ans log");
    console.log(answer);
    console.log("end inst ans log");
  });

}

var app = loopback();

boot(app, __dirname, function (err) {
  if (err) throw err;

});

myFunc(app);
