"use strict";

angular.module('arethusa.core').service('pointer', [
  'state',
  function(state) {
    var self = this;
    var modeClass = 'crosshair-cursor';
    var listener;

    function tokens() {
      return angular.element('[token]');
    }

    function enterSelectMode(onSelection) {
      self.active = true;
      state.deselectAll();
      tokens().addClass(modeClass);
      listener = state.on('tokenClicked', function(ev, id) {
        onSelection(id, state.getToken(id));
        state.deselectAll();
        leaveSelectMode();
      });
    }

    function leaveSelectMode() {
      self.active = false;
      tokens().removeClass(modeClass);
      listener(); // to deregister
    }

    this.findTarget = enterSelectMode;
  }
]);
