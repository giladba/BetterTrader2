angular.module('app.track-new', ['lbServices', 'ionic'])
		.controller('TrackNewCtrl', function ($scope, Instrument) {
			Instrument.find({})
					.$promise
					.then(function(allInstruments){
						$scope.allInstruments=[];
						angular.forEach(allInstruments, function(value) {
							$scope.allInstruments.push(value);
							//Instrument.getPrice({instrument:value.name}).$promise.then(
							//		function(response) {
							//			value.ask = response.price.ask;
							//			value.bid = response.price.bid;
							//			$scope.allInstruments.push(value);
							//		}
							//);
						});
					});


		});