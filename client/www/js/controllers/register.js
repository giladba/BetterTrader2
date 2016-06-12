angular.module('app.register', ['lbServices', 'ionic'])
  .controller('RegisterCtrl', function ($scope, Client, $ionicPopup, $location) {
    /**
     * Currently you need to initialiate the variables
     * if you want to use them in the controller. This seems to be a bug with
     * ionic creating a child scope for the ion-content directive
     */
    $scope.registration = {};
    console.log("Client="+Client)
    /**
     * Redirect user to the app if already logged in
     */
    if (Client.getCachedCurrent()!==null) {
      $location.path('empty-list');
    }

    /**
     * @name register()
     * @desctiption
     * register a new user and login
     */
    $scope.register = function () {
      console.log("Register Client");
      $scope.registration.created = new Date().toJSON();
      $scope.user = Client.create($scope.registration)
        .$promise
        .then(function (res) {
          console.log("Created Client");
          $location.path('empty-list')
        }, function (err) {
          $scope.registerError = err;
          $scope.showAlert(err.statusText, err.data.error.message);
        });
    };

    /**
     * @name showAlert()
     * @param {string} title
     * @param  {string} errorMsg
     * @desctiption
     * Show a popup with the given parameters
     */
    $scope.showAlert = function (title, errorMsg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: errorMsg
      });
      alertPopup.then(function () {
        console.log($scope.loginError);
      });
    };
  });
