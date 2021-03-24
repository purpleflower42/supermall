import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueBus from './bus/vue-bus'

Vue.config.productionTip = false

Vue.use(VueBus);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


