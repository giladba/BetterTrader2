/**
 * Created by giladba on 4/27/2016.
 */

var express = require('express');
var app2 = express();
var bodyParser = require('body-parser');

app2.use(express.static(__dirname + '/www'));
app2.use(bodyParser.json());


//  --------- Code for OANDA (will move to seperate module later) ------------

var instruments  = require('../../instruments')
var https = require('https');



var options = {
  hostname: 'api-fxpractice.oanda.com',
  path: '/v1/instruments?accountId=1149784',
  headers: {
    Authorization: 'Bearer ' + '44dc24c0bb8c25c8bbb97ed99452d10b-8006ae778caa4cfa5c43f566e8910ec6'
  }
};

module.exports = function(resCallback) {
  var details = [];
  var callback = function (response) {
    var str = '';
    //console.log("1")
    //another chunk of data has been received, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });
    //console.log("2")
    //the whole response has been received, so we just print it out here
    response.on('end', function () {
      // console.log(str)
      var myObject = JSON.parse(str);

      for (var i in myObject.instruments) {

        var instrument = myObject.instruments[i].instrument;
        var displayName = myObject.instruments[i].displayName;
        var pip = myObject.instruments[i].pip;
        var maxTradeUnits = myObject.instruments[i].maxTradeUnits;
        var newInst = instruments(instrument, displayName, pip, maxTradeUnits);
        details.push(newInst)
       //  console.log(details)
      }
      return resCallback(details);
    });
  };

  https.request(options, callback).end();
};
