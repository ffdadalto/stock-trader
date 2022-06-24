<template>
    <v-app>
        <Header></Header>
        <v-main>
            <v-container>
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
    name: "App",
    components: { Header },

    data: () => ({
        //
    }),
    created() {
        this.$store.dispatch('initStocks');
    }
};
</script>

<style>
@keyframes slide-in {
    from {
        transform: translateX(-500px);
        opacity: 0;
    }

    to {
        transform: translateX(0px);
        opacity: 1;
    }
}

@keyframes slide-out {
    from {
        transform: translateX(0px);
        opacity: 1;
    }

    to {
        transform: translateX(-500px);
        opacity: 0;
    }
}

.slide-enter-active {
    animation: slide-in 0.2s ease;
}

.slide-leave-active {
    animation: slide-out 0.2s ease;
}

small {
    font-size: 16px;
    margin-left: 10px;
}
</style>
