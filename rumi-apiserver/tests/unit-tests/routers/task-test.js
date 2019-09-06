const {request} = require('@onehilltech/blueprint-testing');
const {seed} = require('@onehilltech/blueprint-mongodb');

describe('app | routers | task', function () {
  context('GET', function () {
    it('should get all tasks', function () {
      return request()
        .get('/v1/tasks')
        .withUserToken(0)
        .expect(200);
    });

    it('should get a single task', function () {
      const {tasks: [task]} = seed();
      return request()
        .get(`/v1/tasks/${task._id}`)
        .withUserToken(0)
        .expect(200)
    });

    it('should get all tasks assigned to a user', function () {
      const {users: [,user]} = seed();
      return request()
        .get(`/v1/tasks?assignee=${user.id}`)
        .withUserToken(0)
        .expect(200);
    });
  });

  context('POST', function () {
    it('should create a task', function () {
      const {users: [user]} = seed();
      const task = {
        title: 'test-title',
        description: 'test-desc',
        date_assigned: Date(),
        date_due: Date(),
        creator: user._id,
        assignee: user._id,
        status: 'not-started'
      };
      return request()
        .post('/v1/tasks')
        .send({task})
        .withUserToken(0)
        .expect(200);
    });

    it('should create a task with a default due date', function () {
      const {users: [user]} = seed();
      const task = {
        title: 'test-title',
        description: 'test-desc',
        date_assigned: Date(),
        creator: user._id,
        assignee: user._id,
        status: 'not-started'
      };
      return request()
        .post('/v1/tasks')
        .send({task})
        .withUserToken(0)
        .expect(200);
    });

    it('should not create a task without a creator',  function () {
      const {users: [user]} = seed();
      const task = {
        title: 'test-title',
        description: 'test-desc',
        date_assigned: Date(),
        date_due: Date(), assignee: user._id,
        status: 'not-started'
      };
      return request()
        .post('/v1/tasks')
        .send({task})
        .withUserToken(0)
        .expect(400);
    });
  });

  context('UPDATE', function () {
    it('should update a task title', function () {
      const {tasks: [task]} = seed();
      return request()
        .put(`/v1/tasks/${task.id}`)
        .send({description: 'this is a new description'})
        .withUserToken(0)
        .expect(200);
    });

    it('should update a task assignee', function () {
      const {users: [,,user]} = seed();
      const {tasks: [task]} = seed();
      return request()
        .put(`/v1/tasks/${task.id}`)
        .send({assignee: user._id})
        .withUserToken(0)
        .expect(200);
    });

    it('should update a task date due', function () {
      const {tasks: [task]} = seed();
      const new_date = {date_due: Date('December 21, 2018 12:00:00')};
      return request()
        .put(`/v1/tasks/${task.id}`)
        .send({new_date})
        .withUserToken(0)
        .expect(200);
    });
  });

  context('DELETE', function () {
    it('should delete a task', function () {
      const {tasks: [task]} = seed();
      return request()
        .delete(`/v1/tasks/${task._id}`)
        .withUserToken(0)
        .expect(200)
    });
  });
});