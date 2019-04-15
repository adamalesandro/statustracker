<template>
    <div class="list">
        <h1 class="text-xs-center blue-grey--text text--darken-2">
            {{List.ListName}}
            <v-btn icon @click.native="showListNameEditDialog"><v-icon color="grey">edit</v-icon></v-btn>
        </h1>
        <ListItemContainer :ListItems="List.ListItems" />
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                <span class="headline">Edit List Name</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field v-model="newListName" label="List Name"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
    </div>
</template>

<script>
import ListItemContainer from './ListItemContainer';
import { EventBus } from '../event-bus';

export default {
    components: {
        ListItemContainer
    },
    data: function() {
        return {
            dialog: false,
            newListName: this.List.ListName,
        };
    },
    props: {
        List: Object
    },
    methods: {
        showListNameEditDialog: function() {
            this.dialog = true;
        },
        close: function() {
            this.dialog = false;
        },
        save: function() {
            EventBus.$emit("listNameChanged", this.List.ListName, this.newListName);
            this.dialog = false;
        }
    },
    mounted: function() {

    },
}
</script>

<style>

</style>
