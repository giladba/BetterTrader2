angular.module('app')
  .controller('AllInstrumentsController', ['$scope', 'Instrument', function($scope, Instrument) {
    $scope.instruments = Instrument.find({});
  }]);
