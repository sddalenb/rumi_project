import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    saveTask() {
      let user = this.get('model');

      user.get('group').then((group)=>{
        let task = this.get('store').createRecord('task',{
          title: this.get('taskName'),
          description: this.get('taskDescription'),
          dateDue: new Date(this.get('dueDate')),
          dateAssigned: new Date(),
          taskCompleted: false,
          creator: user,
          assignee: user,
          status: 'not-started',
          group: group
        });

        this.set('taskName','');
        this.set('taskDescription','');
        this.set('dueDate','');

        task.save().then(this.transitionToRoute('new-task.p-success'));
      });

    }
  }
});
