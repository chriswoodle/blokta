import Vue from 'vue';
import Router from 'vue-router';

import Main from './views/main/Main.vue';
import Home from './views/main/Home.vue';

import Welcome from './views/welcome/Welcome.vue';
import Login from './views/welcome/Login.vue';
import Hello from './views/welcome/Hello.vue';

import Public from './views/public/Public.vue';
import Post from './views/public/Post.vue';

Vue.use(Router);

import Auth from '@okta/okta-vue';

console.log(process.env.VUE_APP_OKTA_DOMAIN, process.env.VUE_APP_OKTA_CLIENT_ID);

Vue.use(Auth, {
    issuer: `https://${process.env.VUE_APP_OKTA_DOMAIN}`,
    client_id: process.env.VUE_APP_OKTA_CLIENT_ID,
    redirect_uri: `${window.location.protocol}//${window.location.host}/implicit/callback`,
    scope: 'openid profile email'
});

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            // Okta callback
            path: '/implicit/callback',
            component: Auth.handleCallback()
        },
        {
            path: '/',
            name: 'welcome',
            component: Welcome,
            children: [
                {
                    path: '/',
                    name: 'hello',
                    component: Hello,
                }
            ]
        },
        {
            path: '/',
            name: 'public',
            component: Public,
            children: [
                {
                    path: '/post',
                    name: 'post',
                    component: Post,
                }
            ]
        },
        {
            path: '/',
            name: 'main',
            component: Main,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                }
            ]
        }
    ],
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());
export default router;
