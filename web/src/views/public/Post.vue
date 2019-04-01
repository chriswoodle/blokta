<template>
    <div class='post'>
        <vue-markdown class='md' v-bind:source="rawMarkdown"></vue-markdown>
        <div class='sub'>
            <h3>Subscribe to this writer:</h3>
            <input type='text' v-model='phone' placeholder="12223334444" />
            <br>
            <button @click='subscribe'>subscribe</button>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';

// @ts-ignore
import VueMarkdown from 'vue-markdown';

@Component({    components: {
        'vue-markdown': VueMarkdown
    }})
export default class Post extends Vue {
    phone = '';
    rawMarkdown = '';
    created() {
        axios({
            url: 'https://raw.githubusercontent.com/droplit/universal-ws/master/overview.md',
            method: 'GET',
        }).then((response) => {
            this.rawMarkdown = response.data;
            this.$forceUpdate();
        });
    }
    subscribe() {
        console.log(process.env.VUE_APP_SERVICE_HOST);
        if (this.phone && this.phone.length !== 10) {
            axios({
                url: `${process.env.VUE_APP_SERVICE_HOST}/subscribe`,
                method: 'POST',
                data: {
                    to: this.phone
                }
            }).then((response) => {
                console.log(response);
                alert('subscribed!');
            }).catch(error => {
                alert(`Failed to dispatch: ${error}`);
            });
        } else {
            alert('Please enter a valid phone number! ex "12223334444"');
        }
    }
}
</script>

<style lang="scss" scoped>
.post {
    background: white;
    margin-left: auto;
    margin-right: auto;
    max-width: 1000px;
    padding: 100px;
}
.sub {
    margin-top: 40px;
    > * {
        margin-bottom: 5px;
    }
}
</style>
