import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { parse } from '../util';
import debugCreator from 'debug';

const debug = debugCreator('src:devtools:index');

Vue.config.errorHandler = (e, vm) => {
  bridge.send('ERROR', {
    message: e.message,
    stack: e.stack,
    component: vm.$options.name || vm.$options._componentTag || 'anonymous'
  });
};

let app = null;

/**
 * Create the main devtools app. Expects to be called with a shell interface
 * which implements a connect method.
 *
 * @param {Object} shell
 *        - connect(bridge => {})
 *        - onReload(reloadFn)
 */

export function initDevTools (shell) {
  initApp(shell);
  shell.onReload(() => {
    if (app) {
      app.$destroy();
    }
    bridge.removeAllListeners();
    initApp(shell);
  });
}

/**
 * Connect then init the app. We need to reconnect on every reload, because a
 * new backend will be injected.
 *
 * @param {Object} shell
 */

function initApp (shell) {
  shell.connect(bridge => {
    window.bridge = bridge;

    bridge.once('ready', version => {
      store.commit(
        'SHOW_MESSAGE',
        'Ready. Auto Cat  ' + version + '.'
      );
      // bridge.send('vuex:toggle-recording', store.state.vuex.enabled);
      // bridge.send('events:toggle-recording', store.state.events.enabled);
    });

    bridge.once('proxy-fail', () => {
      store.commit(
        'SHOW_MESSAGE',
        'Proxy injection failed.'
      );
    });

    bridge.on('message', (message) => {
      store.commit(
        'SHOW_MESSAGE',
        message
      );
    });

    bridge.on('flush', payload => {
      store.commit('components/FLUSH', parse(payload));
    });

    bridge.on('instance-details', details => {
      store.commit('components/RECEIVE_INSTANCE_DETAILS', parse(details));
    });

    bridge.on('elements:bind-action', payload => {
      store.commit('elements/BIND_ACTION', parse(payload));
    });

    app = new Vue({
      store,
      render (h) {
        return h(App);
      }
    }).$mount('#app');
  });
}
