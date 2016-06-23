angular.module('app')
		.controller('SetSenseCtrl', ['$rootScope', '$scope', 'Instrument', 'Client', 'User','InstrumentTracking','$location', function($rootScope, $scope, Instrument, Client, User, InstrumentTracking, $location) {
			$scope.sense = 0.5;



			$scope.submit = function(instrument, newSense) {
				console.log("submit " + JSON.stringify(instrument));
				console.log("sense " + newSense);
				console.log("instID " + instrument.name);
				console.log("userID " + $rootScope.currentUser.id);

				InstrumentTracking.create({sense:newSense, instID:instrument.name, userID:$rootScope.currentUser.id});
				if(angular.isUndefined($rootScope.instrumentTracking))
					$rootScope.instrumentTracking=[];
				$scope.instrumentTracking.push(instrument);
			}
		}]);