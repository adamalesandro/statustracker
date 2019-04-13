<template>
    <div>
        <div v-for="listItem in ListItems" :key="listItem">
            <ListItem :ListItem="listItem" />
        </div>
    </div>
</template>

<script>
import ListItem from './ListItem';

export default {
    components: {
        ListItem
    },
    props: {
        ListItems: Array
    }
}
</script>

<style>

</style>
