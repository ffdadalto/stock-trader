<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card tile class="blue-grey lighten-3 text-capitalize">
            <v-card-title class="headline titulo-acao" style="justify-content: space-between;">
                <!-- <v-img lazy-src="/img/Adidas.png" max-height="80" max-width="80" src="/img/Adidas.png"></v-img> -->
                <v-img :lazy-src="require('@/assets/' + stock.imgUrl)" max-height="80" max-width="80"
                    :src="require('@/assets/' + stock.imgUrl)"></v-img>
                <strong>{{ stock.name }}</strong>
                <small>{{ stock.price | moeda }}</small>
            </v-card-title>
        </v-card>
        <v-card tile>
            <v-container fill-height class="grey lighten-4">
                <v-text-field class="mr-1" label="Quantidade" type="number" :error="insufficientFunds"
                    v-model.number="quantity"></v-text-field>
                <v-btn tile small class="green darken-3 white--text"
                    :disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(quantity)" @click="buyStock()">
                    {{ insufficientFunds ? 'Insuficiente' : 'Comprar' }}</v-btn>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: ["stock"],
    data: () => ({
        quantity: 0,
    }),
    methods: {
        ...mapActions({ buyStockAction: 'buyStock' }),
        buyStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity,
            };

            this.buyStockAction(order);

            this.quantity = 0;

            this.saveData();
        },
        saveData() {
            const { funds, stockPortfolio, stocks } = this.$store.getters;
            this.$http.put('data.json', { funds, stockPortfolio, stocks });
        },
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        },
        insufficientFunds() {
            return this.quantity * this.stock.price > this.funds;
        }
    }
};
</script>

<style scoped>
.titulo-acao {
    padding: 5px 20px;
}
</style>