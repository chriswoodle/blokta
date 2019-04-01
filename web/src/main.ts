import Vue from 'vue';
import App from './App.vue';
import router from './router';

// @ts-ignore
import VueMarkdown from 'vue-markdown';
Vue.use(VueMarkdown);

import './styles/styles.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
