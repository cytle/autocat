import App from 'src/App.vue';
import Vue from 'vue';

new Vue({
  // store,
  render (h) {
    return h(App);
  }
}).$mount('#app');
