const {Seed} = require('@onehilltech/blueprint-mongodb');
const dab = require('@onehilltech/dab');
const moment = require ('moment');
const faker  = require ('faker');

function soonAfter(date){
  let dates = [];

  for(let x = 0; x<10; x++){
    let neg = Math.pow(-1,Math.floor(Math.random()*100)); // Decide wether to add or take days away

    date.setDate(date.getDate()+x*neg);
    dates.push(date);
  }

  return dates[Math.floor(Math.random()*dates.length)];
};

function computeTask (user_num) {
  return function __computeTask (user_num,i) {
    let dueDate = soonAfter(new Date());
    let completed = faker.random.boolean();
    let completionDate = null;

    if(completed){
      completionDate = soonAfter(dueDate);
    }

    const user_ref = dab.ref (`users.${user_num}`);
    const task = {
      title: `Do important task!`,
      description: faker.lorem.sentence(),
      date_assigned: faker.date.past(10),
      date_due: dueDate,
      creator: dab.ref('users.0'),
      assignee: user_ref,
      group: dab.ref('groups.0'),
      status: 'not-started',
      task_completed: faker.random.boolean()
    };

    return task;
  }
}

module.exports = Seed.extend({
  model() {
    return {
      native: [
        {
          _id: dab.id ("59ee923e1fd71c2ae68ade62"),
          name: 'client0',
          client_secret: 'client0',
          email: 'client0@no-reply.com',
        }
      ],

      accounts: dab.times(3, (i) => {
        return {
          username: `user${i}`,
          password: `user${i}`,
          email: `user${i}@no-reply.com`,
        }
      }),

      user_tokens: [
        {
          client: dab.ref('native.0'),
          account: dab.ref('accounts.0'),
          scope: ['gatekeeper.account.*'],
          refresh_token: dab.id(),
        }
      ],

      client_tokens: [
        {
          client: dab.ref('native.0'),
          scope: ['gatekeeper.account.create']
        }
      ],

      users: dab.map (dab.get ('accounts'), (account,i) => {
        return {
          _id: account._id,
          first_name: faker.name.firstName (),
          last_name: faker.name.lastName (),
           role: `admin`,
           group: [dab.ref('groups.0')]
        }
      }),

      tasks: dab.concat(
        //dab.times(4, computeTask(10)),
        dab.times(0, computeTask(10)),
        dab.times(1, computeTask(8)),
        dab.times(2, computeTask(12)),
        //dab.times(3, computeTask(7)),
      ),


      polls: dab.times(0, (i) => {
        return {
          task: dab.ref('tasks.0'),
          user: dab.ref(`users.${i}`),
          vote: dab.ref('users.1')
        }
      }),

      groups: dab.times(3, (i) => {
        return {group_name: `group-${i}`}
      }),

      comments: dab.times(30, (i) => {
        return {
          task: dab.ref(`tasks.${i % 2}`),
          post_date: Date(),
          message: `comment-${i}`,
          user: dab.ref(`users.${i % 2}`)
        }
      }),

    };
  }
});
