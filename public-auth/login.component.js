(function() {
  'use strict';

  angular.module('app').component('login', { controller, templateUrl: '/login.template.html'})

  function controller() {
    const vm = this

    vm.$onInit = () => {
      console.log('ready');
    }
  }
})();
