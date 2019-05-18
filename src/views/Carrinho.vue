<template>
  <main>
    <div v-for="produtoCarrinho in carrinho" :key="produtoCarrinho.id">
      <p>{{produtoCarrinho.produto.titulo}}</p>
      <p>{{produtoCarrinho.quantidade}}</p>
      <br>
    </div>
  </main>
</template>
    
<script>
import api from "../api";

export default {
  name: "Carrinho",
  data() {
    return {
      carrinho: []
    };
  },
  created() {
    this.retornarCarrinho();
  },
  methods: {
    async retornarCarrinho() {
      const { data } = await api.get("/carrinho");
      console.log(data);
      this.carrinho = data;
    }
  },
  computed: {}
};
</script>

<style lang="scss">
</style>
