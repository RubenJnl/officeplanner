import Vue from 'vue'
import App from './App.vue'

import * as moment from 'moment';
import 'moment/locale/nl';
moment.locale('nl');


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
