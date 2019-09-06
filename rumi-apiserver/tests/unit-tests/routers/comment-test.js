const {request} = require('@onehilltech/blueprint-testing');
const {seed} = require('@onehilltech/blueprint-mongodb');

describe('app | routers | comment', function () {
  context('GET', function () {
    it('should get all comments', function () {
      return request()
        .get('/v1/comments')
        .withUserToken(0)
        .expect(200);
    });

    it('should get one comment', function () {
      const {comments: [comment]} = seed();
      return request()
        .get(`/v1/comments/${comment._id}`)
        .withUserToken(0)
        .expect(200)
    });

    it('should get all comments made by a user', function () {
      const {users: [user]} = seed();
      return request()
        .get(`/v1/comments?user=${user._id}`)
        .withUserToken(0)
        .expect(200)
    });

    it('should get all comments made on a task', function () {
      const {tasks: [task]} = seed();
      return request()
        .get(`/v1/comments?task=${task._id}`)
        .withUserToken(0)
        .expect(200)
    });

    it('should get all comments based on date', function () {
      const {comments: [comment]} = seed();
      const date = comment.post_date;
      return request()
        .get(`/v1/comments?post_date=${date}`)
        .withUserToken(0)
        .expect(200)
    });
  });

  context('POST', function () {
    it('should create a comment on a task', function () {
      const {tasks: [task], users: [user]} = seed();
      const comment = {
        task: task._id,
        post_date: Date(),
        message: 'test-comment',
        user: user._id
      };
      return request()
        .post('/v1/comments')
        .send({comment})
        .withUserToken(0)
        .expect(200)
    });

    it('should not create a comment without a task', function () {
      const {users: [user]} = seed();
      const comment = {
        post_date: Date(),
        message: 'test-comment-fail',
        user: user._id
      };
      return request()
        .post('/v1/comments')
        .send({comment})
        .withUserToken(0)
        .expect(400)
    });

    it('should not create a comment without a user', function () {
      const {tasks: [task]} = seed();
      const comment = {
        task: task._id,
        post_date: Date(),
        message: 'test-comment-fail',
      };
      return request()
        .post('/v1/comments')
        .send({comment})
        .withUserToken(0)
        .expect(400)
    });

    it('should create a comment with a default post date', function () {
      const {tasks: [task], users: [user]} = seed();
      const comment = {
        task: task._id,
        message: 'test-comment',
        user: user._id
      };
      return request()
        .post('/v1/comments')
        .send({comment})
        .withUserToken(0)
        .expect(200)
    });
  });

  context('UPDATE', function () {
    it('should update the message of a comment', function () {
      const {comments: [comment]} = seed();
      return request()
        .put(`/v1/comments/${comment._id}`)
        .send({message: 'this is an updated message'})
        .withUserToken(0)
        .expect(200)
    });
  });

  context('DELETE', function () {
    it('should delete a comment', function () {
      const {comments: [comment]} = seed();
      return request()
        .delete(`/v1/comments/${comment._id}`)
        .withUserToken(0)
        .expect(200)
    });
  });
});
