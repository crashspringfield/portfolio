(function(window, angular, undefined) {

  angular.module('appRoutes', ['ui.router'])

    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
      // ================ Interactive states =========================
      // For users
        .state('home', {
          url: '/',
          templateUrl: 'app/index.html',
        })
        .state('register', {
          url: '/register',
          templateUrl: 'app/user/register/register.html',
          controller: 'registerCtrl'
        })
        .state('checkEmail', {
          url: '/check-email',
          templateUrl: 'app/user/register/check-email.html',
          controller: 'registerCtrl'
        })
        .state('verify', {
          url: '/verify/:username',
          templateUrl: 'app/user/register/verify.html',
          controller: 'registerCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'app/user/auth/login.html',
          controller: 'authCtrl'
        })

    }])

})(window, window.angular);
