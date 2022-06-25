<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card tile class="grey lighten-1 text-capitalize">
            <v-card-title class="headline titulo-acao" style="justify-content: space-between;">
                <v-img :lazy-src="require('@/assets/' + stock.imgUrl)" max-height="80" max-width="80"
                    :src="require('@/assets/' + stock.imgUrl)"></v-img>
                <strong>{{ stock.name }}</strong>
                <small>{{ stock.price | moeda }}</small>
            </v-card-title>
        </v-card>
        <v-card tile>
            <v-container fill-height class="grey lighten-4">
                <v-text-field class="mr-1" label="Quantidade" type="number"
                    :error="qtdInsuficiente || !Number.isInteger(quantity)" v-model.number="quantity"></v-text-field>
                <v-btn tile small class="green darken-3 white--text"
                    :disabled="qtdInsuficiente || quantity <= 0 || !Number.isInteger(quantity)" @click="sellStock()">
                    {{ qtdInsuficiente ? 'Insuficiente' : 'Vender' }}</v-btn>
                <div class="resumo">
                    <span class="font-italic">
                        {{ stock.quantity }} ações no valor total de: {{ valorTotal | moeda }}
                    </span>
                </div>
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
        },
        valorTotal() {
            return this.qtdAcoes * this.stock.price;
        }
    }
};
</script>

<style scoped>
.resumo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.titulo-acao {
    padding: 5px 20px;
}
</style>