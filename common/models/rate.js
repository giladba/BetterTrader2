// Any rates new function will go here.

module.exports = function(Rate) {
	Rate.getLatestRate = function(instrument, cb) {
		Rate.find({
			where: {instrument: instrument.instID},
			order: 'date DESC',
				limit:1
		}, function(err, found) {
			return cb(err, found[0]);
		});
	}

	Rate.remoteMethod(
			'getLatestRate',
			{
				http: {verb: 'get'},
				accepts: {arg: 'instrument', type: 'string'},
				returns: {arg: 'price', type: 'object'}
			}
	);

};
