const { Router } = require ('@onehilltech/blueprint');

module.exports = Router.extend ({
  specification: {
    '/groups': {
      resource: {
        controller: 'group'
      }
    }
  }
});
