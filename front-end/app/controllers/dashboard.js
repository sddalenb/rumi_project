import Controller   from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty }  from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { setDiff }  from '@ember/object/computed'

export default Controller.extend({
  completedTasks: computed('tasks.[]',function(){
    if(!isEmpty(this.get('tasks')))
      return this.get('tasks').filterBy('taskCompleted',true);
  }),

  upcomingTasks: computed('tasks.[]', function(){
    if(!isEmpty(this.get('tasks')))
      return this.get('tasks').filterBy('taskCompleted',false);
  }),

  progress: computed('completedTasks.[]','tasks.[]', function(){
    if(!isEmpty(this.get('tasks')))
      return htmlSafe(`width: ${this.get('completedTasks').length / this.get('tasks').length * 100}%`);
  }),

  houseTasks: setDiff('groupTasks','tasks'),

  completedHouseTasks: computed('houseTasks.[]',function(){
    if(!isEmpty(this.get('houseTasks')))
      return this.get('houseTasks').filterBy('taskCompleted',true);
  }),

  upcomingHouseTasks: computed('houseTasks.[]', function(){
    if(!isEmpty(this.get('houseTasks')))
      return this.get('houseTasks').filterBy('taskCompleted',false).filter((task)=> task.belongsTo('assignee').id() !== null);
  }),

  yourTasksOpen: true,

  groupTasksOpen: false
});
