const assert = require('assert');
const app = require('../../src/app');

describe('\'sellers\' service', () => {
  it('registered the service', () => {
    const service = app.service('sellers');

    assert.ok(service, 'Registered the service');
  });
});
