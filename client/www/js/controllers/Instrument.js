angular.module('app')
    .controller('AllInstrumentsController', ['$rootScope', '$scope', 'Instrument', 'Client', 'User','InstrumentTracking','$location', function($rootScope, $scope, Instrument, Client, User, InstrumentTracking, $location) {

        InstrumentTracking.find({  filter: { where: {userID:$rootScope.currentUser.id}, include:['instrument'] }})
            .$promise
            .then(function(userTrackedInstruments) {
                    if(angular.isUndefined($rootScope.instrumentTracking))
                        $rootScope.instrumentTracking=[];
                    angular.forEach(userTrackedInstruments, function(value) {
                        $scope.instrumentTracking.push(value.instrument);
                        console.log("value="+JSON.stringify(value.instrument));
                    });
                    console.log("Inst="+JSON.stringify($scope.instrumentTracking));
                }

            );

        $scope.gotoTrackNew = function() {
            console.log("clicked");
            $location.path('track-new');
        }

        //Client
        //    .find({  filter: { where: {id: $rootScope.currentUser.id}}})
        //    .$promise
        //    .then(function(foundUsers) {
        //        console.log("foundUsers="+JSON.stringify(foundUsers));
        //        console.log("found == " +JSON.stringify(foundUsers[0]));
        //        console.log(" foundUser.instruments = " +  foundUsers[0].instruments.find({}).$promise
        //                .then(function(foundInst) {
        //                    console.log("foundInst == " +JSON.stringify(foundInst));
        //                }));
        //    });

    }]);
