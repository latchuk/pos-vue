<template>
  <main>
    <div class="produto" v-for="produto in produtos" :key="produto.id">
      <router-link :to="'/produto/' + produto.id">
        <img v-bind:src="produto.imagens[0]">
        <small>R$ {{ produto.valor }}</small>
        <P>{{ produto.titulo }}</P>
      </router-link>
    </div>
  </main>
</template>
    
<script>
import api from "../api";

export default {
  name: "Home",
  data() {
    return {
      produtos: []
    };
  },
  watch: {
    $route({ params: { categoria_id } }) {
      this.retornarProdutos(categoria_id);
    }
  },
  created() {
    this.retornarProdutos(this.$route.params.categoria_id);
  },
  methods: {
    async retornarProdutos(categoria_id) {
      let endPoint = "/produtos";

      if (categoria_id && categoria_id > 0) {
        endPoint += `?categoria_id=${categoria_id}`;
      }

      const { data } = await api.get(endPoint);

      this.produtos = data;
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-wrap: wrap;
}

.produto {
  width: 256px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.12);
  margin: 0 8px 8px 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
  img {
    object-fit: cover;
    width: 100%;
    border-radius: 4px;
  }
}
</style>
