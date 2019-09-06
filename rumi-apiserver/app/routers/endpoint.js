const blueprint = require ('@onehilltech/blueprint');
const {cors} = require('@onehilltech/blueprint-gatekeeper');
const {Router, env} = blueprint;
const gatekeeper = require ('@onehilltech/blueprint-gatekeeper');

module.exports = Router.extend ({
  specification: {
    '/': {
      use: [ cors ({origin: true}) ]
    },

    '/v1': {
      policy: 'gatekeeper.auth.bearer'
    },

    '/gatekeeper': blueprint.mount ('@onehilltech/blueprint-gatekeeper:v1'),
  }
});
