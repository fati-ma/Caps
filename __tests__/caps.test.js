'use strict';

const caps = require('../caps.js');

jest.spyOn(global.console, 'log');

describe('Testing Event Handlers', () => {

  it('pickup : Respond with the correct event name', () => {
    caps.emit('pickup', 'test pickup');
    expect(console.log).toHaveBeenCalled();
  });
  it('in-transit : Respond with the correct event name', () => {
    caps.emit('in-transit', 'test in-transit');
    expect(console.log).toHaveBeenCalled();
  });
  it('delivered : Respond with the correct event name', () => {
    caps.emit('delivered', 'test delivered');
    expect(console.log).toHaveBeenCalled();
  });
  
});