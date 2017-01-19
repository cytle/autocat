import Vue from 'vue';
import Vuex from 'vuex';
import events from 'views/events/module';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    message: '',
    tab: 'components'
  },
  mutations: {
    SHOW_MESSAGE (state, message) {
      state.message = message;
    },
    SWITCH_TAB (state, tab) {
      state.tab = tab;
    },
    RECEIVE_INSTANCE_DETAILS (state, instance) {
      state.message = 'Instance selected: ' + instance.name;
    }
  },
  modules: {
    events
  }
});

export default store;

if (module.hot) {
  module.hot.accept([
    'views/events/module'
  ], () => {
    try {
      store.hotUpdate({
        modules: {
          events: require('views/events/module').default
        }
      });
    } catch (e) {
      console.log(e.stack);
    }
  });
}
