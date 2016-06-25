angular.module('app')
		.controller('SetSenseCtrl', ['$rootScope', '$scope', 'Instrument', 'Client', 'User','InstrumentTracking','$location','$stateParams', function($rootScope, $scope, Instrument, Client, User, InstrumentTracking, $location,$stateParams) {
			$scope.sense = 0.5;

			Instrument.getPrice({instrument:$stateParams.instrumentToTrack.name}).$promise.then(
					function(response) {
						$scope.ask =  response.price.ask;
						$scope.bid =  response.price.bid;
					});

			$scope.submit = function(instrument, newSense) {
				InstrumentTracking.create({sense:newSense, instID:instrument.name, userID:$rootScope.currentUser.id, startPrice:$scope.ask});
				if(angular.isUndefined($rootScope.instrumentTracking))
					$rootScope.instrumentTracking=[];
				$scope.instrumentTracking.push(instrument);
				$location.path('instrument-list');
			}
		}]);