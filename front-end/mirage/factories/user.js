import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  firstName(i){ return faker.name.firstName(); },
  lastName(i){ return faker.name.lastName() },
  group: association()
});
