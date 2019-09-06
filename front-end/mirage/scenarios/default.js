export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  let group = server.create('group');
  let users = server.createList('user', 4, {group}); // create 10 users
  //let tasks = server.createList('task', 10)
  users.forEach(function(user){
    let numTasks = Math.floor(Math.random() * 15);

    for(var i = 0; i<numTasks;i++){
      let task = server.create('task',{assignedTo: user, assignedBy: user, group: group});
    }
  });
}
