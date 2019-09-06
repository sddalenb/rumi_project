import DS from 'ember-data';
import Ember from 'ember';
import { singularize, pluralize } from 'ember-inflector';

export default DS.RESTSerializer.extend({
  primaryKey: '_id',

  keyForAttribute: function (key) {
    return Ember.String.underscore (key);
  },

  serializeAttribute (snapshot, json, key, attributes) {
    // Do not serialize any attributes that are null.
    const attrs = snapshot.changedAttributes();
    const changed = attrs[key] || key === 'supervisionPrograms' || key === 'treatment';

    if (changed) {
      this._super (snapshot, json, key, attributes);
    }
  },

  serializeBelongsTo (snapshot, json, relationship) {
    let key = relationship.key;
    let belongsTo = snapshot.belongsTo (key);

    key = this.keyForRelationship ? this.keyForRelationship (key, "belongsTo", "serialize") : key;

    if (Ember.isPresent (belongsTo)) {
      json[key] = belongsTo.id;
    }
  },

  normalizeQueryRecordResponse (store, primaryModelClass, payload, id, requestType) {
    let plural = pluralize (primaryModelClass.modelName);
    let singular = singularize (primaryModelClass.modelName);

    payload[singular] = payload[plural][0];

    delete payload[plural];

    return this._super (store, primaryModelClass, payload, id, requestType);
  }
});
