<template>
  <main>
    <div class="item-carrinho" v-for="produtoCarrinho in carrinho" :key="produtoCarrinho.id">
      <img v-bind:src="produtoCarrinho.produto.imagens[0]">
      <div class="coluna preencher">
        <h3>{{produtoCarrinho.produto.titulo}}</h3>
        <p>{{produtoCarrinho.produto.descricao}}</p>
      </div>
      <div class="coluna">
        <small>valor</small>
        <p>{{produtoCarrinho.produto.valor}}</p>
      </div>
      <div class="coluna">
        <small>quantidade</small>
        <p>{{produtoCarrinho.quantidade}}</p>
      </div>
      <div class="coluna">
        <small>total</small>
        <p>{{produtoCarrinho.produto.valor * produtoCarrinho.quantidade}}</p>
      </div>
    </div>

    <small>total</small>
    <h3>R$ {{ totalCarrinho }}</h3>

    <br>
    <br>
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
  computed: {
    totalCarrinho() {
      if (this.carrinho.length) {
        let total = 0;

        this.carrinho.forEach(
          produtoCarrinho =>
            (total +=
              produtoCarrinho.produto.valor * produtoCarrinho.quantidade)
        );

        return total.toFixed(2);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;

  small {
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.54);
    font-weight: 500;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  h3 {
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    font-size: 24px;
    text-align: end;
  }

  .item-carrinho {
    display: flex;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    padding: 6px;
    margin-bottom: 16px;

    img {
      object-fit: contain;
      width: 123px;
      height: 123px;
      margin-right: 8px;
    }

    h3 {
      text-align: start;
    }

    .coluna {
      display: flex;
      flex-direction: column;
      padding: 0 8px;
      text-align: center;
      &:last-child {
        padding-right: 0;
      }
    }

    .preencher {
      flex: 1;
      text-align: start;
    }
  }
}
</style>
