<template>
    <div class="hello">
        <h1>Hello, welcome to Blokta!</h1>
        <div v-if='!authenticated'>
            <h2>Please login in.</h2>
            <button @click='login'>Login</button>
        </div>

        <img alt="App logo" src="../../assets/banner.png">
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Hello extends Vue {
    authenticated = false;
    created() {
        this.isAuthenticated();
    }
    async isAuthenticated() {
        this.authenticated = await this.$auth.isAuthenticated();
    }

    login() {
        this.$auth.loginRedirect('/');
    }
}
</script>

<style lang="scss" scoped>
.hello {
    text-align: center;
    h1 {
        margin: 10px;
    }
    img {
        height: 300px;
        border-radius: 20px;
        margin-top: 20px;
    }
}
</style>

