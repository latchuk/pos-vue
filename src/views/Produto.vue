<template>
  <main v-if="produto.imagens">
    <h2>{{ produto.titulo }}</h2>

    <div class="conteudo">
      <div class="imagens-produto">
        <img v-bind:src="imagemGrande" class="imagem-grande">

        <div class="lista-imagens">
          <img
            class="lista-imagens"
            v-for="(imagem, indice) in produto.imagens"
            :key="indice"
            @mouseover="atualizarImagem(indice)"
            v-bind:src="imagem"
          >
        </div>
      </div>

      <div class="descricao-produto">
        <small>Descrição</small>
        <p>{{ produto.descricao }}</p>

        <small>Estoque</small>
        <p>Foram vendidos {{ produto.vendidos }}, ainda restam {{ produto.estoque }} em estoque.</p>

        <small>Valor</small>
        <p>R$ {{ produto.valor }}</p>

        <br>

        <div class="alert alert-danger" v-if="produto.estoque === 0">Produto indisponível no momento</div>
        <button v-if="produto.estoque !== 0" v-on:click="comprar" class="btn btn-primary">COMPRAR</button>
      </div>
    </div>
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
    },
    atualizarImagem(indice) {
      this.produto.indiceImagemSelecionada = indice;
    }
  },
  computed: {
    imagemGrande() {
      if (this.produto.imagens) {
        return this.produto.imagens[this.produto.indiceImagemSelecionada];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    font-size: 42px;
  }

  .conteudo {
    display: flex;

    .imagens-produto {
      flex: 0;

      .imagem-grande {
        object-fit: contain;
        width: 510px;
        height: 510px;
        margin-right: 6px;
        border: 1px solid rgba(0, 0, 0, 0.12);
      }

      .lista-imagens {
        display: flex;
        flex-wrap: wrap;

        img {
          object-fit: contain;
          width: 123px;
          height: 123px;
          margin: 6px 6px 0 0;
          border: 1px solid rgba(0, 0, 0, 0.12);
        }
      }
    }

    .descricao-produto {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 6px;

      small {
        margin-bottom: 8px;
        text-transform: uppercase;
        color: rgba(0, 0, 0, 0.54);
        font-weight: 500;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }
    }
  }
}
</style>
