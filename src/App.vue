<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Status</span>
        <span class="font-weight-light">Tracker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="addNewList">
        <span>New List</span>
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn flat>
        <v-icon >fingerprint</v-icon>&nbsp;
        <span class="mr-2">Adam Alesandro</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-flex xs12 md-6 offset-md3>
        <v-container>
          <v-form v-on:submit.prevent="addItemToList">
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
                  <v-select v-model="selectedListName" :items="listNameSelectListItems" label="List">
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
    }
  },
  data () {
    return {
      isFormValid: null,
      selectedListName: null,
      newItem: null,
      lists: [],
    }
  },
  created() {
    let defaultLists = [
      {
        ListName: "Groceries",
        ListItems: ["Milk", "Eggs", "Honey"]
      }
    ];


    var listsFromStorage = localStorage.todoLists;
    if (listsFromStorage == null) {
      this.lists = defaultLists;
    } else {
      this.lists = JSON.parse(listsFromStorage);
    }

    EventBus.$on("listNameChanged", (oldListName, newListName) => {
      this.editListName(oldListName, newListName);
    });

    EventBus.$on("removeItemFromList", (listName, listItem) => {
      this.removeItemFromList(listName, listItem);
    });
  },
  methods: {
    addNewList: function() {
      this.lists.push({ListName: "New List", ListItems: []});
    },
    addItemToList: function() {
      let targetList = this.selectedListName;
      let itemToAdd = this.newItem;
      this.addNewItemToList(targetList, itemToAdd);
      this.newItem = null;
    },
    addNewItemToList: function(listName, newListItem) {
      let list = this.lists.find(l => l.ListName == listName);
      debugger;
      list.ListItems.push(newListItem);
    },
    editListName: function(oldName, newName) {
      let list = this.lists.find(l => l.ListName == oldName);
      list.ListName = newName
    },
    removeItemFromList: function(listName, listItem) {
      let list = this.lists.find(l => l.ListName == listName);
      list.ListItems.splice(list.ListItems.indexOf(listItem), 1);
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
      localStorage.todoLists = JSON.stringify(this.lists);
    }
  }
}
</script>
