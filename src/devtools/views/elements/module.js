const state = {
  elements: [
    {
      time: Date.now(),
      el: '{11111}'
    }
  ]
};

const mutations = {
  'SELECTION_CHANGED' (state, el) {
    state.elements.push(el);
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
