<template>
  <main>
    <p>{{ produto.titulo }}</p>
    <button v-if="produto.estoque !== 0" v-on:click="comprar">COMPRAR</button>
    <strong v-if="produto.estoque === 0">Produto indisponível</strong>
  </main>
</template>
    
<script>
import api from "../api";

export default {
  name: "Produto",
  data() {
    return {
      produto: {}
    };
  },
  watch: {
    $route({ params: { produto_id } }) {
      this.retornarProduto(produto_id);
    }
  },
  created() {
    this.retornarProduto(this.$route.params.produto_id);
  },
  methods: {
    async retornarProduto(produto_id) {
      const { data } = await api.get(`/produtos/${produto_id}`);
      this.produto = data;
    },
    async comprar() {
      if (this.produto.estoque === 0) {
        return;
      }

      this.produto.estoque--;
      this.produto.vendidos++;

      const indice = this.$store.state.carrinho.findIndex(
        produtoCarrinho => produtoCarrinho.produto.id === this.produto.id
      );

      if (indice > -1) {
        const produtoCarrinho = this.$store.state.carrinho[indice];
        produtoCarrinho.quantidade++;

        await api.put(`/carrinho/${produtoCarrinho.id}`, produtoCarrinho);

        this.$store.commit("AUMENTAR_QUANTIDADE", indice);
      } else {
        await api.post("/carrinho", {
          produto: this.produto,
          quantidade: 1
        });

        const { data } = await api.get(
          `/carrinho/?produto_id=${this.produto.id}`
        );

        console.log(data[0]);

        this.$store.commit("ADICIONAR_AO_CARRINHO", data[0]);
      }

      await api.put(`/produtos/${this.produto.id}`, this.produto);
    }
  }
};
</script>

<style lang="scss">
</style>
