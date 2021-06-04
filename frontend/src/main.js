import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Import de scss
import '@/assets/sass/App.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
