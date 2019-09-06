const {request} = require('@onehilltech/blueprint-testing');
const {seed} = require('@onehilltech/blueprint-mongodb');

describe('app | routers | poll', function () {
  context('GET', function () {
    it('should get all polls', function () {
      return request()
        .get('/v1/polls')
        .withUserToken(0)
        .expect(200)
    });

    it('should get a single poll', function () {
      const {polls: [poll]} = seed();
      return request()
        .get(`/v1/polls/${poll.id}`)
        .withUserToken(0)
        .expect(200)
    });

    it('should get poll results for a user', function () {
      const {polls: [poll], users: [,user]} = seed();
      return request()
        .get(`/v1/polls?vote=${user.id}`)
        .withUserToken(0)
        .expect(200)
    });
  });
});
