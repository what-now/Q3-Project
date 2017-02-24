(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
  function config(sp, urp, lp) {
    lp.html5Mode(true)
    sp.state({
      name: 'signup',
      url:'/signup',
      component: 'signup'
    }).state({
      name: 'login',
      url:'/',
      component: 'login'
    })
  }
})();
