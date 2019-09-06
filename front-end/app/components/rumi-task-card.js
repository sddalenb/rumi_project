import MdcCard from 'ember-cli-mdc-card/components/mdc-card';
import { inject as service } from '@ember/service';

export default MdcCard.extend({
  classNames: ['rumi-task-card'],
  router: service(),

  didRender(){
    if(this.get('router').get('currentRouteName') === 'calendar'){
      let $today = new Date(this.$('.date').text());
      let $element = new Date(this.$().next().find('.date').text());
      this.$().css('margin-bottom',0); // remove margin if it already had it


      if($today.getDate() != $element.getDate()){
        this.$().css('margin-bottom',15);
      }
      let rumi = this.get('rumiList').objectAt(this.get('selectedRumi'));
      let index = this.get('selectedRumi')%5;
      let color = this.get('colors').objectAt(index);
      if(rumi === 'All')
        this.get('task.assignee').then((current)=>{
          color = this.get('colors').objectAt(this.get('rumiList').indexOf(current)%5);
          this.$('.circle').css({'background': color, 'border': `1px solid ${color}`});
        });
      else
        this.$('.circle').css({'background': color, 'border': `1px solid ${color}`});

    }
  }
});
