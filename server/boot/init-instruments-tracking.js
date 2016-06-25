/**
 * Created by giladba on 6/24/2016.
 */

module.exports =  function(app) {
	Oanda = require("../js/services/oanda-adapter.js");
	var Rate = app.models.Rate;
	var InstrumentTracking = app.models.InstrumentTracking;
	var Instrument = app.models.Instrument;

	InstrumentTracking.find({}
			,function(err, array) {
				array.forEach(function(instTracking){
					Oanda.subscribePrice(instTracking, function(tick){
						Rate.getLatestRate(instTracking, function(err,latestRate){
							if(err) {
								console.log(err);
								return;
							}
							console.log("tick = " + JSON.stringify(tick));
							console.log("latestRate = " + JSON.stringify(latestRate));
							if (latestRate != undefined) {
								var b = tick.ask;
								var a = latestRate.ask;
								var askDiff = tick.ask - latestRate.ask;
								var absDiff = Math.abs(askDiff);
								console.log("askDiff = " + Math.abs(askDiff));
								console.log("instTracking.sense = " + instTracking.sense);
								if (absDiff >= instTracking.sense) {
									console.log(instTracking.instID + " has changed in " + askDiff);
								}
							}
							Rate.create(tick, function(err, created){
								if(err) {
									console.log(err);
									return;
								}
								console.log("New rate = " + JSON.stringify(created));
							});

						});

					},app)
				})
			});
}