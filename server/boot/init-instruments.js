///**
// * Created by giladba on 4/27/2016.
// */
//
var GetInst = require('../js/services/get-instruments.js');
module.exports =  function(app) {

  /**
   * Author : Gilad Baruchian.
   * Description - This is an auto migration boot script function to read the data about
   * instruments from OANDA and then update the MongoDB database.
   *
   * **/
  GetInst(function(instruments) {
    app.dataSources.mongoDB.automigrate('Instrument', function(err) {
      if (err) throw err;
      app.models.Instrument.create(instruments, function (err) {
        if (err) throw err;
      });
    });
  });

//
//  //app.dataSources.mongoDB.automigrate('Instrument', function(err) {
//  //  if (err) throw err;
//  //  GetInst(function(instruments) {
//  //    //console.log("instruments = " + instruments);
//  //    app.models.Instrument.create(instruments), function(err) {
//  //      if (err) throw err
//  //      console.log('Models created');
//  //    };
//  //  });
//  //});
}
