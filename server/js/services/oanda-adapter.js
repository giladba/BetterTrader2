var OANDAAdapter = require('oanda-adapter');

//var app = require('loopback');
//var Rate = app.models.Rate;

var client = new OANDAAdapter({
	// 'live', 'practice' or 'sandbox'
	environment: 'practice',
	// Generate your API access in the 'Manage API Access' section of 'My Account' on OANDA's website
	accessToken: '44dc24c0bb8c25c8bbb97ed99452d10b-8006ae778caa4cfa5c43f566e8910ec6',
	// Optional. Required only if evironment is 'sandbox'
	// username: 'a837f0927f0b0cd630a0934059c87003-7eb890aff42eb9c985305b309a94e421'
});

var ACCOUNT_ID = "1149784";

module.exports.getPrice = function(instrument, callback) {
	client.getPrice(instrument, function(err, price){
		if(err){
			console.log(err);
			return callback(err, price);
		}
		return callback(err, price);
	});
}

function random (low, high) {
	return Math.random() * (high - low) + low;
}

function randomIntInc (low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low);
}

function randomSign() {
	var rand = randomIntInc(0,1);
	if(rand==0)
		return 1;
	else
		return -1;
}
function randomChange (low, high) {
	return random(low,high)*randomSign();
}

module.exports.subscribePrice = function(instrument, listener, app) {
	/**
	 * Trading days are monday until friday only.
	 * Example of a tick from the streaming service :
	 * {"tick":{"instrument":"AUD_CAD","time":"2014-01-30T20:47:08.066398Z","bid":0.98114,"ask":0.98139}}
	 */
	client.subscribePrice(ACCOUNT_ID, instrument.instID, listener);
	var Rate = app.models.Rate;
	var randomDelay = randomIntInc(5000,12000);
	setInterval(function() {
		Rate.getLatestRate(instrument, function(error, latestRate) {
			if(error){
				console.log(error);
				return;
			}
			var tick = {};
			tick.instrument = instrument.instID;
			tick.time = new Date().toISOString();
			if(latestRate.bid!=null)
				tick.bid = latestRate.bid;
			else
				tick.bid = 0;
			tick.bid += randomChange(0, 1);
			if(latestRate.ask!=null)
				tick.ask = latestRate.ask;
			else
				tick.ask = 0;
			tick.ask += randomChange(0, 1);
			if(tick.bid <= 0)
				tick.bid = random(0.1,200)
			if(tick.ask <= 0)
				tick.ask = random(0.1,200)
			listener(tick);
		})
	},randomDelay);

}





//client.getInstruments("1149784", function(error, array) {
//	if(error){
//		console.log(error);
//		return;
//	}
//	module.exports.getPrice(array[0].instrument, function(err, price){
//		if(err) {
//			console.log(err);
//			return;
//		}
//		console.log("returned price = " + JSON.stringify(price));
//	});
//});