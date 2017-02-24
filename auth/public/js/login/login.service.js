(function() {
  'use strict';

  angular.module('app').service('loginService', loginService)
  loginService.$inject = ['$http']
  function loginService($http) {
    this.login = function(data) {
      return $http.post('/api/token/', data).catch(err => console.error('error in service', err))
    }
  }
})();
