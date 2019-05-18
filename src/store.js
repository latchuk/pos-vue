import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        carrinho: [],
        quantidadeItens: 0
    },
    mutations: {
        CARRINHO_RECUPERADO(state, payload) {
            state.carrinho = payload;

            let quantidadeItens = 0;

            payload.forEach(produtoCarrinho => {
                quantidadeItens += produtoCarrinho.quantidade;
            });

            state.quantidadeItens = quantidadeItens;

        },
        AUMENTAR_QUANTIDADE: async (state, payload) => {
            state.carrinho[payload].quantidadeItens++;
            state.quantidadeItens++;
        },
        ADICIONAR_AO_CARRINHO: async (state, payload) => {
            state.carrinho.push(payload);

            let quantidadeItens = 0;

            state.carrinho.forEach(produtoCarrinho => {
                quantidadeItens += produtoCarrinho.quantidade;
            });

            state.quantidadeItens = quantidadeItens;
        },
        // REMOVE(state) {
        //     state.carrinho = [];
        //     state.quantidade = 0;
        // }
    },
    actions: {

    }
})
