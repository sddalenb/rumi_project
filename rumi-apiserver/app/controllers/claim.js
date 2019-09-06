const { ResourceController } = require ('@onehilltech/blueprint-mongodb');
const { model, Action } = require ('@onehilltech/blueprint');

module.exports = ResourceController.extend ({
  model: model ('claim'),
  name: 'claim',

  update() {
    return this._super.call (this, ...arguments).extend ({
      postUpdateModel (req, doc) {

        // do the queries and counting of stuff here...
        return doc;
      }
    });
  },
});
