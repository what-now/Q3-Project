(function() {
  'use strict';

  class controller {
    constructor(signupService) {
      this.signupService = signupService
      this.regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }

    signup(event) {
      event.preventDefault();
      this.signupService.signup(this.user).then(() => window.location = '/').catch((err) => {
        if (err.data === 'Email already exists') {
          this.emailExists = true;
        }
        console.log('in signup:', err);
      });
    }
  }

  angular.module('app')
    .component('signup', {
      controller,
      templateUrl: 'public/js/signup/signup.template.html'
    });
})();
