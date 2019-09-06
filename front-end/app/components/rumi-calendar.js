import Component from '@ember/component';

export default Component.extend({
  didInsertElement(){
    this._super(...arguments);

    $('.ember-power-calendar-day').removeClass (function (index, className) {
      return (className.match (/(^|\s)rumi-\S+/g) || []).join(' ');
    });

    this.$('.ember-power-calendar-row').has('.ember-power-calendar-weekday').remove();
    let $days = $('.ember-power-calendar-day');
    $days.removeClass (function (index, className) {
      return (className.match (/(^|\s)rumi-\S+/g) || []).join(' ');
    });


  },

  didRender(){
    this.$('[class*="rumi-"]').remove();
    let tasks = this.get('monthTasks');

    if(tasks){
      let $days = this.$('.ember-power-calendar-day');
      $days.removeClass (function (index, className) {
        return (className.match (/(^|\s)rumi-\S+/g) || []).join(' ');
      });

      let rumis = this.get('rumiList');
      $days = $('.ember-power-calendar-day--current-month');


      tasks.forEach((task)=>{
        let day = task.get('dateDue').getDate();
        let $calendarDay = $($days[day-1]);
        let position = 0;

        task.get('assignee').then((rumi,index)=>{
          let idx = rumis.indexOf(rumi);
          if(index!=0 && idx != -1){            
            $calendarDay.append(`<span class='rumi-${idx%5} notification-pos-${position}'></span>`);
          }
          position++;
          position = position % 5;
        });

      });
      $('.ember-power-calendar-day--other-month').removeClass (function (index, className) {
        return (className.match (/(^|\s)rumi-\S+/g) || []).join(' ');
      });
    }
  },
});
