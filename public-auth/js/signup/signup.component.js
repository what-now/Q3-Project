(function() {
  'use strict';

  class controller {
    constructor(signupService) {
      this.signupService = signupService
    }

    signup(event) {
      event.preventDefault();
      this.signupService.signup(this.user)
    }
  }

  angular.module('app')
    .component('signup', {
      controller,
      templateUrl: '/js/signup/signup.template.html'
    });
})();
