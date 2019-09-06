import Component from '@ember/component';

export default Component.extend({
  classNames: ['rumi-comments-section'],
  tagName: 'div',

  didRender(){
    this._super(...arguments);
    
    this.$().scrollTop(this.$()[0].scrollHeight);
  }
});
