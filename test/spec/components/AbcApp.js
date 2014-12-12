'use strict';

describe('Main', function () {
  var AbcApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    AbcApp = require('../../../src/scripts/components/TodoApp.jsx');
    component = AbcApp();
  });

  it('should create a new instance of AbcApp', function () {
    expect(component).toBeDefined();
  });
});
