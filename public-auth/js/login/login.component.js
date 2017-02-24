(function() {
  'use strict';

  class controller {
    constructor(loginService) {
      this.loginService = loginService
    }

    login(event) {
      event.preventDefault()
      this.loginService.login(this.user)
    }
  }

  angular.module('app').component('login', { controller, templateUrl: 'js/login/login.template.html'})
})();
