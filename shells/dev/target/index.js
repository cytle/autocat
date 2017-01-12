import Vue from 'vue';
import store from './store';
import Target from './Target.vue';
import Other from './Other.vue';
import Counter from './Counter.vue';
import Event from './Event.vue';

const items = [];
for (var i = 0; i < 100; i++) {
  items.push({ id: i });
}

const circular = {};
circular.self = circular;

new Vue({
  store,
  render (h) {
    return h('div', null, [
      h(Counter),
      h(Target, {props: {msg: 'hi'}}),
      h(Other),
      h(Event)
    ]);
  },
  data: {
    obj: {
      items: items,
      circular
    }
  }
}).$mount('#app');
