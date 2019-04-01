<template>
    <div class="login">
        <button @click='login'>Login</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    login() {
        // start okta login process
        this.$auth.loginRedirect('/');
    }
}
</script>
