(function() {
  'use strict';

  class controller {
    constructor() {
      // services go here
    }

    $onInit() {
      console.log('ready');
    }
    login(event) {
      event.preventDefault()
      console.log(this.user);
    }
  }

  angular.module('app', []).component('login', { controller, templateUrl: '/login.template.html'})

})();
