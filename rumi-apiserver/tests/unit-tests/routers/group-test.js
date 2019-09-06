const {request} = require('@onehilltech/blueprint-testing');
const {seed} = require('@onehilltech/blueprint-mongodb');

describe('app | routers | group', function () {
  context('GET', function () {
    it('should get all groups', function () {
      return request()
        .get('/v1/groups')
        .withUserToken(0)
        .expect(200)
    });

    it('should get one group', function () {
      const {groups: [group]} = seed();
      return request()
        .get(`/v1/groups/${group._id}`)
        .withUserToken(0)
        .expect(200)
    });

    it('should get all users in a group', function () {
      const {groups: [group]} = seed();
      return request()
        .get(`/v1/users?group=${group._id}`)
        .withUserToken(0)
        .expect(200)
    });
  });

  context('POST', function () {
    it('should create a group', function () {
      const group = {group_name: 'test-group'};
      return request()
        .post('/v1/groups')
        .send({group})
        .withUserToken(0)
        .expect(200)
    });

    it('should create a group without a group name', function () {
      const group = {};
      return request()
        .post('/v1/groups')
        .send({group})
        .withUserToken(0)
        .expect(200)
    });
  });

  context('UPDATE', function () {
    it('should update the name of the group', function () {
      const {groups: [group]} = seed();
      const new_name = {group_name: 'new name'};
      return request()
        .put(`/v1/groups/${group._id}`)
        .send({new_name})
        .withUserToken(0)
        .expect(200)
    });
  });
});
