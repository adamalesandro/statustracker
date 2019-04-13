<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Status</span>
        <span class="font-weight-light">Tracker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat>
        <v-icon >fingerprint</v-icon>&nbsp;
        <span class="mr-2">Adam Alesandro</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-flex xs12 md-6 offset-md3>
        <v-container>
          <v-form v-on:submit.prevent="addNewItemToList">
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="newItem"
                  label="Add Item"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md3>
                <v-flex xs12 d-flex>
                  <v-select v-model="formListItem" :items="listNameSelectListItems" label="List">
                  </v-select>
                </v-flex>
              </v-flex>
              <v-flex>
                <v-btn color="primary" type="submit">
                  Add
                  <v-icon right dark>add</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-flex>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex sm4 v-for="list in lists" :key="list.ListName">
            <List :List="list" />
          </v-flex>
          <v-flex sm4>
            <v-btn icon>
              <v-icon dark x-large color="blue darken-2" @click="addNewList">add_circle</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import _ from 'underscore';
import List from './components/List';
import { EventBus } from './event-bus.js';

export default {
  name: 'App',
  components: {
    List
  },
  computed: {
    listNameSelectListItems: function() {
      return this.lists.map( x => x.ListName );
    },
  },
  data () {
    return {
      isFormValid: null,
      formListItem: null,
      newItem: null,
      lists: [],
    }
  },
  created() {
    this.lists = [
      {
        ListName: "Things people owe me",
        ListItems: ["A", "B", "C"]
      }
    ];

    EventBus.$on("listNameChanged", (oldListName, newListName) => {
      console.log(oldListName, newListName);
    });
  },
  methods: {
    addNewList: function() {
      this.lists.push({ListName: "New List", ListItems: []});
    },
    addNewItemToList: function() {
      console.log(this.lists, this.newItem);
    },
    editListName: function(oldName, newName) {
      this.lists
    },
    // addTickerToList: function() {
    //   this.securities.push({ ticker: this.ticker, level: this.level });
    //   this.ticker = null;
    //   this.level = 1;
    //   this.persist();
    // },
    removeItem: function(value) {
      // this.securities.splice(this.securities.indexOf(value), 1);
      // this.persist();
    },
    persist: function() {
      // localStorage.securities = JSON.stringify(this.securities);
    }
  }
}
</script>
