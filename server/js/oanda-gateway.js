/**
 * Created by giladba on 4/29/2016.
 */
var https = require('https');
var prices  = require('../prices');

var options = {
  hostname: 'api-fxpractice.oanda.com',
  path: '',
  headers: {
    Authorization: 'Bearer ' + '44dc24c0bb8c25c8bbb97ed99452d10b-8006ae778caa4cfa5c43f566e8910ec6'
  }
};

var pricesDetails = [];

function addInstrumentsParams(instNamesArr){
  options.path = "/v1/prices?instruments=";
  for (var i = 0; i < instNamesArr.length; i++) {
    options.path += ((i!=0)?"%2C":"") + instNamesArr[i];
  }
}

function buildRatesResponse(str, response) {
  var finalObject = JSON.parse(str);
  var etag = response.headers.etag.replace(/\"/g, "");
  console.log("push prices start");
  for (var i in finalObject.prices) {
    var id     = finalObject.prices[i].instrument;
    var time   = finalObject.prices[i].time;
    var bid     = finalObject.prices[i].bid;
    var ask = finalObject.prices[i].ask;
    var newInst = prices(id, time, bid, ask);

    pricesDetails.push(newInst)
    console.log("push price");
  }
}
module.exports.getRates = function(instNamesArr, callback) {
  addInstrumentsParams(instNamesArr);

  https.request(options, function(response) {
    var str = '';
    //another chunk of data has been received, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });
    //the whole response has been received, so we just print it out here
    response.on('end', function () {
      buildRatesResponse(str, response);
      callback(pricesDetails);
    });
  }).end();
}


//  --------- End Code for OANDA  ------------
