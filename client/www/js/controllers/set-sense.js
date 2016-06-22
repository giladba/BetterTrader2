angular.module('app')
//angular.module('app.set-sense', ['lbServices', 'ionic'])
	.controller('SetSenseCtrl', ['$rootScope', '$scope', 'Instrument', 'Client', 'User','InstrumentTracking','$location', function($rootScope, $scope, Instrument, Client, User, InstrumentTracking, $location) {
		$scope.sense = 0.5;
		$scope.submit = function(instrument, newSense) {
			console.log("submit " + JSON.stringify(instrument));
			console.log("sense " + newSense);
			console.log("instID " + instrument.id);
			console.log("userID " + $rootScope.currentUser.id);

			InstrumentTracking.create({sense:newSense, instID:instrument.id, userID:$rootScope.currentUser.id})
		}
	}]);