import Controller from '@ember/controller';
import $ from "jquery"

export default Controller.extend({
  actions:{
    saveTask() {
      let user = this.get('model');

      user.get('group').then((group)=>{
        this.get('store').createRecord('task',{
          title: this.get('taskName'),
          description: this.get('taskDescription'),
          dateDue: new Date(this.get('dueDate')),
          dateAssigned: new Date(),
          taskCompleted: false,
          creator: user,
          status: 'not-started',
          group: group
        }).save().then((task)=>{
          this.get('store').query('user',{group: user.belongsTo('group').id()}).then((users)=>{
            users.forEach((user)=>{
              let claim = this.get('store').createRecord('claim',{
                user: user,
                task: task,
                reason: 'No reason given',
                accepted: null
              });
              claim.save(); // make four claims to this task
            });
          });
        });
        this.set('taskName','');
        this.set('taskDescription','');
        this.set('dueDate','');

        this.transitionToRoute('new-task.h-success');
      });
    },

    promptAnswer(prompt,answer){
      prompt = `.${prompt}`;
      if(answer === 'yes'){
        $(prompt).removeClass('no');
        $(prompt).addClass('yes');
      }else{
        $(prompt).removeClass('yes');
        $(prompt).addClass('no');
      }
    }
  }
});
