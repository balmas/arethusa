"use strict";

angular.module('arethusa.confEditor').directive('confHeader', function() {
  return {
    restrict: 'AE',
    scope: {
      name: '=',
      remover: '&'
    },
    templateUrl: 'templates/conf_header.html'
  };

});
