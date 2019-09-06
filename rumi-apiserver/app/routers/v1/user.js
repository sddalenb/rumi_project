const {Router} = require('@onehilltech/blueprint');
const {cors} = require('@onehilltech/blueprint-gatekeeper');

module.exports = Router.extend({
  specification: {
    '/users': {
      resource: {
        controller: 'user'
      }
    }
  }
});
