<template>
    <div id="app">
        <div class='content'>
            <div id='nav'>
                <div class='logo'>
                    <img alt="App logo" src="./assets/logo.png">
                </div>
                <div class='account'>
                    <div class='target'>
                        <span v-if='user'>{{username}}</span>
                        <img v-bind:src='`//www.gravatar.com/avatar/12345?d=identicon`' />
                    </div>
                    <div class='menu' menu>
                        <a v-if='!authenticated' @click='login'>
                            <span>Login</span>
                        </a>
                        <a v-if='authenticated'>
                            <span>Manage Account</span>
                        </a>
                        <a v-if='authenticated' @click='logout'>
                            <span>Logout</span>
                        </a>

                    </div>
                </div>
            </div>
            <div class='content-inside'>
                <router-view />
            </div>
        </div>
        <footer class="footer">
            <div class='copyright'>
                {{`&copy; Chris Woodle ${(new Date()).getFullYear()}`}}
            </div>
        </footer>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as okta from '@okta/okta-vue';

interface User {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    locale: string;
    name: string;
    preferred_username: string;
    sub: string;
    updated_at: number;
    zoneinfo: string;
}

@Component({
    watch: {
        $route: 'isAuthenticated'
    }
})
export default class App extends Vue {
    authenticated = false;
    user: User | {} = {};
    username = '';

    created() {
        this.isAuthenticated().then(() => {
            if (this.authenticated === true) {
                this.$auth.getUser().then((result: User | undefined) => {
                    console.log(result);
                    this.user = result || {};
                    if (result)
                        this.username = result.name;
                    console.log(this.user);
                    this.$forceUpdate();
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    }

    async isAuthenticated() {
        this.authenticated = await this.$auth.isAuthenticated();
    }

    login() {
        this.$auth.loginRedirect('/');
        this.user = {};
    }

    async logout() {
        await this.$auth.logout();
        await this.isAuthenticated();

        // Navigate back to home
        this.$router.push({ path: '/' });
    }
}
</script>

<style lang="scss">
@import "@/styles/styles.scss";
#app {
    height: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.content {
    min-height: 100%;
}
.content-inside {
    padding: 50px;
    padding-bottom: 100px;
}

#nav {
    height: 70px;
    background-color: $primary-color;
    color: white;
    > div {
        display: inline-block;
        vertical-align: top;
        position: relative;
        height: 70px;
        line-height: 70px;
        &.account {
            padding-right: 15px;
            padding-left: 15px;
            float: right;
            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }
            img {
                height: 40px;
                width: 40px;
                margin-left: 10px;
                margin-bottom: 4px;
                vertical-align: middle;
                border: none;
                border-radius: 3px;
            }
        }
        &.logo {
            > img {
                height: 40px;
                margin: 15px;
            }
        }
        &:hover {
            .menu {
                opacity: 1;
                pointer-events: initial;
            }
        }
        .target {
            user-select: none;
        }
        .menu {
            opacity: 0;
            pointer-events: none; // Disable hover pointer event when opacity: 0
            position: absolute;
            right: 0;
            background-color: #fff;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
            transition: opacity 0.2s linear;
            min-width: 100px;
            &.hidden {
                opacity: 0;
                pointer-events: none;
            }
            a {
                display: block;
                white-space: nowrap;
                padding-right: 15px;
                padding-left: 15px;
                height: 44px;
                transition: background-color 0.1s linear;
                &:hover {
                    background-color: $primary-color;
                    text-decoration: none;
                    span,
                    span.icon {
                        color: white;
                    }
                }
                &:active {
                    transition-duration: 0s;
                    background: lighten($primary-color, 15%);
                }
                span {
                    display: inline-block;
                    vertical-align: top;
                    font-size: 12px;
                    line-height: 44px;
                    color: #727272;
                }
            }
        }
    }
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
        }
    }
}

.footer {
    height: 50px;
    margin-top: -50px;
    .copyright {
        text-align: center;
        font-size: 14px;
        line-height: 50px;
    }
}
</style>
