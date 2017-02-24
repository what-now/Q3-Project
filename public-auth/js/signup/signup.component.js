(function() {
  'use strict';

  angular.module('app')
    .component('signup', {
      controller: controller,
      templateUrl: '/js/signup/signup.template.html'
    });

    function controller () {
      const vm = this;

      vm.$onInit = function() {
        vm.user =
          {
            name: 'Hiromi',
            email: 'hiromi@galvanize.com'
          }
      }

      vm.signup = function (event) {
        event.preventDefault();
        console.log('you are in signup');
      }
    }

})();
