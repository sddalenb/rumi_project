import Component from '@ember/component';

export default Component.extend({
  classNames: ['rumi-filter-option'],
  tagName: 'div',
  didInsertElement(){
    let color = this.get('color');
    if(this.get('rumi') === 'All')
      this.$('.circle').css({'background': 'white', 'border': `1px solid white`});
    else if(color !== '#000000')
      this.$('.circle').css({'background': color, 'border': `1px solid ${color}`});
    else
      this.$('.circle').css({'background': color, 'border': `1px solid white`});
  },

  didUpdateAttrs(){
    let color = this.get('color');
    if(this.get('rumi') === 'All')
      this.$('.circle').css({'background': 'white', 'border': `1px solid white`});
    else if(color !== '#000000')
      this.$('.circle').css({'background': color, 'border': `1px solid ${color}`});
    else
      this.$('.circle').css({'background': color, 'border': `1px solid white`});
  }

});
