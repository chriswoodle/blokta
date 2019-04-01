<template>
    <div>
        <vue-markdown class='md' v-bind:source="rawMarkdown"></vue-markdown>
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
}
</script>
