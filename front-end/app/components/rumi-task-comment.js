import Component from '@ember/component';

export default Component.extend({
  classNames: ['rumi-task-comment'],
  tagName: 'div',

  didUpdateAttrs(){
    this._super(...arguments);
    console.log('Update');
  }
});
