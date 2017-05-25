'use strict';

/*================================================
Module - Main App Module
================================================ */
angular.module('postgreDbApp', ['ngRoute', 'postgreDbApp.controllers', 'postgreDbApp.services'])


.config(function ($routeProvider, $locationProvider) {

  /*================================================
  Define all the Routes
  Ref.
  https://docs.angularjs.org/api/ng/provider/$locationProvider
  ================================================ */
	$routeProvider
    
    .when('/login', {
        templateUrl: 'views/login.tpl.html',
        controller: 'LoginCtrl',
        reloadOnSearch: false
    })

    .when('/todo', {
        templateUrl: 'views/main.tpl.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
    })
    
    .otherwise({
        redirectTo: '/login'
    });
      

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

  });