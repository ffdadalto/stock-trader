<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card tile class="blue darken-3 white--text">
            <v-card-title class="headline"><strong>{{ stock.name }}</strong>
                <small>
                    (Preço: {{ stock.price | moeda }}) | Qtde: {{ stock.quantity }}
                </small>
            </v-card-title>
        </v-card>
        <v-card tile>
            <v-container fill-height>
                <v-text-field class="mr-1" label="Quantidade" type="number"
                    :error="qtdInsuficiente || !Number.isInteger(quantity)" v-model.number="quantity"></v-text-field>
                <v-btn tile small class="blue darken-3 white--text"
                    :disabled="qtdInsuficiente || quantity <= 0 || !Number.isInteger(quantity)" @click="sellStock()">
                    {{ qtdInsuficiente ? 'Insuficiente' : 'Vender' }}</v-btn>
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
        ...mapActions({ sellStockAction: 'sellStock' }),
        sellStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity,
            };

            // this.$store.dispatch('sellStock', order);
            this.sellStockAction(order);

            this.quantity = 0;

            this.saveData();
        },
        saveData() {
            const { funds, stockPortfolio, stocks } = this.$store.getters;
            this.$http.put('data.json', { funds, stockPortfolio, stocks });
        },
    },
    computed: {
        qtdAcoes() {
            return this.$store.getters.stockPortfolio.find(e => e == this.stock).quantity;
        },
        qtdInsuficiente() {
            return this.qtdAcoes < this.quantity;
        }
    }
};
</script>

<style>
</style>