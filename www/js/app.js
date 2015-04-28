// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($cordovaFacebookProvider) {
  var appID = 877299752320329;
  ionic.Platform.ready(function(){
    console.log("Ionic ready")
    $cordovaFacebookProvider.browserInit(appID);
  });
})
.controller('HomeController', function ($scope, $cordovaFacebook) {
  $scope.data = "Waiting to login";
  $scope.login = function () {
    $cordovaFacebook.getLoginStatus()
    .then(function(success) {
      /*
      { authResponse: {
          userID: "12345678912345",
          accessToken: "kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn",
          session_Key: true,
          expiresIn: "5183738",
          sig: "..."
        },
        status: "connected"
      }
      */
      if (success.status != "connected") {
        $cordovaFacebook.login(["public_profile", "email", "user_friends"])
        .then(function(success) {
          $scope.data = success;
        }, function (error) {
          $scope.data = error;
        });
      } else {
        $scope.data = success;
      }
    }, function (error) {
      $scope.data = error;
    });
  };
});