(function() {
  'use strict';

  class controller {
    constructor(loginService) {
      this.loginService = loginService
      this.regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }

    login(event) {
      event.preventDefault()
      this.loginService.login(this.user).then(() => window.location = '/')
    }
  }

  angular.module('app').component('login', { controller, templateUrl: 'public/js/login/login.template.html'})
})();
