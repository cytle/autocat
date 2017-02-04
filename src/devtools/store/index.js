import Vue from 'vue';
import Vuex from 'vuex';
import events from 'views/events/module';
import elements from 'views/elements/module';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    message: '',
    tab: 'components',
    logList: []
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
    },
    LOG (state, message) {
      state.logList.push({
        message,
        time: Date.now()
      });
    }
  },
  modules: {
    elements,
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
