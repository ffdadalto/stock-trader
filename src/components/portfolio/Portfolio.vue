<template>
    <v-layout wrap>
        <Stock v-for="stock in stocks" :key="stock.id" :stock="stock"></Stock>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock';

export default {
    name: "Portfolio",
    components: { Stock },

    data: () => ({}),
    computed: {
        ...mapGetters({
            stocks: 'stockPortfolio'
        })
    }
};
</script>

<style>
</style>