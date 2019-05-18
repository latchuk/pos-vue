import Vue from 'vue'
import Router from "vue-router";
import Home from './views/Home.vue'
import Produto from './views/Produto.vue'
import Carrinho from './views/Carrinho.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/:categoria_id?',
            name: 'home',
            component: Home
        },
        {
            path: '/produto/:produto_id?',
            name: 'produto',
            props: true,
            component: Produto
        },
        {
            path: '/carrinho/meucarrinho',
            name: 'carrinho',
            component: Carrinho
        },
        {
            path: 'perquisa',
            name: 'pesquisa',
            redirect: 'asdasd'
        }
    ]
})
