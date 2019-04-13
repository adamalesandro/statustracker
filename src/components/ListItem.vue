<template>
     <v-card>
        <v-card-title class="pa-0 pl-2">
            <span class="ticker"><strong>{{ListItem}}</strong></span>
            <v-spacer></v-spacer>
            <v-btn icon @click="removeItem()">
                <v-icon>close</v-icon>
            </v-btn>
        </v-card-title>
    </v-card>
</template>

<script>
import { EventBus } from '../event-bus.js';

export default {
    props: {
        ListItem: String
    },
    methods: {
        removeItem() {
            EventBus.$emit("removeItem", this.security);
        }
    }
}
</script>

<style>

</style>
