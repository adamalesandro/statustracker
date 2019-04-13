export const store = {
    state: {
        securities: []
    },
    addSecurity (security) {
        this.state.securities.push(security);
    }
};
