"use strict";

angular.module('arethusa.relation').service('relation', function(state, configurator) {
  var self = this;

  this.conf = configurator.configurationFor('relation');
  this.template = this.conf.template;
  this.name = this.conf.name;
  this.relationValues = this.conf.relations;
  this.relations = {};

  // Currently selected labels

  this.currentLabels = function() {
    return arethusaUtil.inject({}, state.selectedTokens, function(memo, id, event) {
      memo[id] = self.relations[id];
    });
  };

  // Label handling

  function splitLabel(relation) {
    var split = relation.label.split('_');
    relation.prefix = split[0];
    relation.suffix = split[1];
  }

  this.buildLabel = function(relation) {
    var elements = [relation.prefix, relation.suffix];
    var clean = arethusaUtil.inject([], elements, function(memo, el) {
      if (el) {
        memo.push(el);
      }
    });
    relation.label = clean.join('_');
  };

  this.expandRelation = function(relation) {
    splitLabel(relation);
    return relation;
  };


  // Empty template for relation objects

  this.relationTemplate = function() {
    return {
      prefix: '',
      suffix: '',
      label: ''
    };
  };


  // Search/Selector

  this.resetSearchedLabel = function() {
    self.searchedLabel = self.relationTemplate;
  };

  this.selectByLabel = function(label) {
    var ids = arethusaUtil.inject([], self.relations, function(memo, id, rel) {
      if (rel.relation.label === label) {
        memo.push(id);
      }
    });
    state.multiSelect(ids);
  };

  this.buildLabelAndSearch = function(rel) {
    self.buildLabel(rel);
    self.selectByLabel(rel.label);
  };


  // Init

  this.createInternalState = function() {
    return arethusaUtil.inject({}, state.tokens, function(memo, id, token) {
      memo[id] = {
        string: token.string,
        relation: self.expandRelation(token.relation)
      };
    });
  };

  this.init = function() {
    self.relations = self.createInternalState();
    self.resetSearchedLabel();
  };
});
