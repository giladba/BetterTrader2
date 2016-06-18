angular.module('app.set-sense', ['lbServices', 'ionic'])
	.controller('SetSenseCtrl', function ($scope, Instrument) {
		$scope.sense = 0.5;
		$scope.submit = function() {
			console.log("submit");
		}
	});