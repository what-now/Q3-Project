(function() {
  'use strict';

  class controller {
    constructor(signupService) {
      this.signupService = signupService
    }

    signup(event) {
      event.preventDefault();
      this.signupService.signup(this.user).then(() => window.location = '/')
    }
  }

  angular.module('app')
    .component('signup', {
      controller,
      templateUrl: 'public/js/signup/signup.template.html'
    });
})();
