import App from './App.vue';
import Vue from 'vue';
import store from './store'

export function initApp () {
    new Vue({
      store,
      render (h) {
        return h(App);
      }
    }).$mount('#app');

}
