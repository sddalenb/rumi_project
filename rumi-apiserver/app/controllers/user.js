const { model } = require ('@onehilltech/blueprint');
const { ResourceController } = require ('@onehilltech/blueprint-mongodb');

module.exports = ResourceController.extend ({
  Model: model ('user'),

  create () {
    return this._super.call (this, ...arguments).extend ({
      prepareDocument (req, doc) {
        // Make the authorized user the owner of the created resource.
        doc.user = req.user._id;
        return doc;
      }
    });
  }
});
