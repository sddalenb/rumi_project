import MdcCard from 'ember-cli-mdc-card/components/mdc-card';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service'

export default MdcCard.extend({
  classNames: ['rumi-task-group'],

  router: service(),

  groupStatus: computed('groupOpen', function(){
    if(this.get('groupOpen'))
      return htmlSafe('open');
  }),

  actions:{
    viewTask(task){
      this.get('router').transitionTo('task',task);
    },

    openGroup(){
      if(this.get('otherOpen')){
        this.toggleProperty('otherOpen') // this group wants to open, so close the other group first
      }
      this.toggleProperty('groupOpen')
    }
  }
});
