<template>
    <v-layout wrap
        ><Stock v-for="stock in stocks" :key="stock.id" :stock="stock"></Stock
    ></v-layout>
</template>

<script>
import Stock from "./Stock";

export default {
    name: "Stocks",
    components: { Stock },
    data: () => ({
        stocks: [
            { id: 1, name: "BMW", price: 110.00 },
            { id: 2, name: "Google", price: 200.00 },
            { id: 3, name: "Apple", price: 280.00 },
            { id: 4, name: "Twitter", price: 83.00 },
        ],
    }),
};
</script>

<style>
</style>