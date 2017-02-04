const state = {
  actions: [
    {
      event: 'ccc',
      elSelector: 'asd'
    }
  ]
};

const mutations = {
  'BIND_ACTION' (state, action) {
    state.actions.push(action);
  }
};

const getters = {
  // activeEvent: state => {
  //   return state.events[state.inspectedIndex];
  // },
  // filteredEvents: state => {
  //   return state.events.filter(e => e.eventName.indexOf(state.filter) > -1);
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
