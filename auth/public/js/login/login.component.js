(function() {
  'use strict';

  class controller {
    constructor(loginService) {
      this.loginService = loginService
    }

    login(event) {
      event.preventDefault()
      this.loginService.login(this.user).then(() => window.location = '/')
    }
  }

  angular.module('app').component('login', { controller, templateUrl: 'public/js/login/login.template.html'})
})();
