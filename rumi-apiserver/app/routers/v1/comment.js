const blueprint = require ('@onehilltech/blueprint');
const {cors} = require('@onehilltech/blueprint-gatekeeper');
const {Router, env} = blueprint;

module.exports = Router.extend ({
  specification: {
    '/comments': {
      resource: {
        controller: 'comment'
      }
    }
  }
});
