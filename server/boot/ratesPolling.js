/**
 * Created by giladba on 4/29/2016.
 */
var oanda = require('../js/oanda-gateway.js')
module.exports = function(app) {
  var Rate = app.models.Rate;

  /** Create new Rate record in the model (persists to the database)*/
  var createRecord = function(name, rate, callback) {
    console.log("creating record");
    Rate.create({"instrument":name,"rate":rate,"date":new Date()},callback);
  }

    /** Main polling function - runs every 10 seconds and writes
     * new rates into the rates collection in MongoDB**/
  setInterval(function(){
    console.log("TICK");
    oanda.getRates(["XPT_USD","USD_JPY","EUR_CAD"], function(rates){
      for (var i = 0; i < rates.length; i++) {
        var rate = rates[i];
        createRecord(rate.id,rate.ask,function(err,object){
          if(err)
            console.log("err = " + err);
          else
            console.log("created record" + object);
        });

      }
    });
  }, 10000);
}
