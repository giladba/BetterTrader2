

module.exports = function(Instrument) {
	var adapter = require('../../server/js/services/oanda-adapter.js');

	Instrument.getPrice = function(instrument, cb) {
		console.log("getPrice " + JSON.stringify(instrument));
		adapter.getPrice(instrument,cb);
	}

	Instrument.remoteMethod(
			'getPrice',
			{
				http: {verb: 'get'},
				accepts: {arg: 'instrument', type: 'string'},
				returns: {arg: 'price', type: 'object'}
			}
	);
};