// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic','app.login','app.register','app.track-new',
        'ui.router',
        'lbServices'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                data : { pageTitle: 'Login' }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })
            .state('instrument-list', {
                url: '/instrument-list',
                templateUrl: 'views/instrument-list.html',
                controller: 'AllInstrumentsController'
            })
            .state('track-new', {
                url: '/track-new',
                templateUrl: 'views/track-new.html',
                controller: 'TrackNewCtrl'
            })
            .state('set-sense', {
                url: '/set-sense',
                templateUrl: 'views/set-sense.html',
                params : { instrumentToTrack: null},
                controller: 'SetSenseCtrl'
            })
            .state('add-instrument', {
                url: '/add-instrument',
                templateUrl: 'views/all-instruments.html',
                data : { pageTitle: 'add-instrument' }
            })
        ;
        $urlRouterProvider.otherwise('login');
    }])
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart', function(event, next) {
            // redirect to login page if not logged in
            if (next.authenticate && !$rootScope.currentUser) {
                event.preventDefault(); //prevent current page from loading
                $state.go('forbidden');
            }
        });
    }])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
