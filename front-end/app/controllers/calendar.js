import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty }  from '@ember/utils';
import moment from 'moment';
import $ from "jquery"

export default Controller.extend({
  months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    years: Array(...Array(80)).map((_, i) => `${i + 1940}`),

    selected: new Date(),

    selectedMonth: new Date(),

    selectedRumi: 0,

    monthTasks: computed('groupTasks.[]','selectedMonth',function(){
      if(!isEmpty(this.get('groupTasks'))){
        let tasks = this.get('groupTasks').sortBy('dateDue').filter(item => item.get('dateDue').getMonth() == this.get('selectedMonth').getMonth() &&
                                            item.get('dateDue').getFullYear() == this.get('selectedMonth').getFullYear());
        return tasks;
        }
    }),

    visibleTasks: computed('selectedRumi','monthTasks.[]',function(){
      let selected = (this.get('selectedRumi') !== null) ? this.get('selectedRumi'):this.get('rumiList').objectAt(0);
      let currentUser = this.get('rumiList').objectAt(selected);

      if(!isEmpty(this.get('monthTasks')))
        if(currentUser === 'All')
          return this.get('monthTasks');
        else
          return this.get('monthTasks').filterBy('assignee.id',currentUser.id);
    }),

    collection: computed('tasks.[]',function(){
      let arr = []
      if(!isEmpty(this.get('tasks')))
        this.get('tasks').forEach((task)=>arr.push(task.get('dateDue')));

      return arr;
    }) ,

    rumiList: computed('group.[]','model',function(){
      let rumiGroup = [];
      rumiGroup.push(this.get('model'));
      if(!isEmpty(this.get('group'))){
        let rumis = this.get('group').sortBy('firstName').filter((item)=> item !== this.get('model'));
        rumis.forEach((rumi)=>rumiGroup.push(rumi));
      }
      rumiGroup.push('All');
      return rumiGroup;
    }),

    colors: ['#000000','#FF3333','#F7E829','#29367D','#00F0BA'],

    actions: {
      changeCenter(unit, calendar, e) {
        let newCenter = calendar.center.clone()[unit](e.target.value);
        calendar.actions.changeCenter(newCenter);
      },

      viewTask(task){
        this.transitionToRoute('task',task);
      },
    }
});
