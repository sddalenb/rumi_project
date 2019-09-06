import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({

  task: "Do important task!",

  taskDescription(){ return faker.lorem.sentence(); },

  assignmentDate(){ return faker.date.past(10) },

  dueDate(){
    let dates = [];

    for(let x = 0; x<10; x++){
      let date = new Date()
      let neg = Math.pow(-1,Math.floor(Math.random()*100)); // Decide wether to add or take days away

      date.setDate(date.getDate()+x*neg);
      dates.push(date);
    }

    return dates[Math.floor(Math.random()*dates.length)];
  },

  taskCompleted(){ return faker.random.boolean()},

  completionDate: null,

  assignedBy: association(),

  assignedTo: association(),

  afterCreate(task, server){
    if(task.taskCompleted){
      task.completionDate = faker.date.future(2);
    }
  }




});
