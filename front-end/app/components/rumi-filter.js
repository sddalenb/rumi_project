import Component from '@ember/component';
import { on } from '@ember/object/evented';
import { next } from '@ember/runloop';
import ClickOutsideMixin from 'ember-click-outside/mixin';

export default Component.extend(ClickOutsideMixin, {
  classNames: ['rumi-filter'],
  tagName: 'div',

  clickOutside(e) {
    this.set('isOpen',false);
  },

  _attachClickOutsideHandler: on('didInsertElement', function() {
    next(this, this.addClickOutsideListener);
  }),

  _removeClickOutsideHandler: on('willDestroyElement', function() {
    this.removeClickOutsideListener();
  }),

  actions:{
    changePerspective(index){
      this.set('selectedRumi',index);
      this.set('isOpen',false);
    }
  }
});
