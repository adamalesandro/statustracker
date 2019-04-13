export const store = {
    state: {
        listItems: []
    },
    addListItem (listItem) {
        this.state.listeItems.push(listItem);
    }
};
