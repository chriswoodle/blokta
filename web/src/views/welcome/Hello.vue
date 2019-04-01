<template>
    <div class="hello">
        <h1>
            Hello, welcome to Blokta!
        </h1>
        <h2>
            {{authenticated ? '': 'Please login in.'}}
        </h2>
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
}
</script>

<style lang="scss" scoped>
.hello {
    text-align: center;
}
</style>

