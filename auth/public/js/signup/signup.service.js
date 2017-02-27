(function() {
  'use strict';

  angular.module('app').service('signupService', signupService)
  signupService.$inject = ['$http']
  function signupService($http) {
    this.signup = function(data) {
      return $http.post('/api/user/', data)
    }
  }
})();
