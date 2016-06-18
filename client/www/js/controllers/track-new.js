angular.module('app.track-new', ['lbServices', 'ionic'])
	.controller('TrackNewCtrl', function ($scope, Instrument) {
		Instrument.find({})
			.$promise
			.then(function(allInstruments){
				$scope.allInstruments=[];
				angular.forEach(allInstruments, function(value) {
					$scope.allInstruments.push(value);
					console.log("instrument="+JSON.stringify(value));
				});
				console.log("instruments="+JSON.stringify($scope.instrumentTracking));
			});
		

	});
