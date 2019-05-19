<template>
  <div>
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark pt-2 pb-2 fundo-escuro">
      <div class="container d-flex justify-content-between">
        <router-link class="navbar-brand logo" to="/">
          <img
            src="@/assets/earth.svg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt="Icone"
          >
          LTK Informática
        </router-link>

        <ul class="nav links">
          <li class="nav-item">
            <router-link class="nav-link link" to="/1">• Notebooks •</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link link" to="/2">• Mouses •</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link link" to="/pesquisa" target="_blank">• Pesquisa em PDF •</router-link>
          </li> -->
        </ul>

        <button type="button" class="btn btn-md botao" v-on:click="carrinho">
          <div v-if="quantidadeItens > 0" class="badge-danger badge">{{ quantidadeItens }}</div>
          <i class="fa fa-shopping-cart"></i>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    quantidadeItens() {
      return this.$store.state.quantidadeItens;
    }
  },
  methods: {
    carrinho() {
      this.$router.push("/carrinho/meucarrinho");
    }
  }
};
</script>

<style lang="scss">
.fundo-escuro {
  background-color: #3c3c3c;
}

.logo {
  color: rgba(#ffffff, 0.87) !important;

  &:hover {
    color: rgba(#f4511e, 0.87) !important;
  }
}

.links {
  flex: 1;
  margin-left: 24px !important;
}

.botao {
  color: rgba(#ffffff, 0.87);
  position: relative;

  &:hover {
    color: rgba(#f4511e, 0.87);
  }

  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 10px;
  }
}

.link {
  font-weight: 300;
  color: rgba(#ffffff, 0.87);
  transition: all 0.1s;
  padding: 0;
  margin: 4px 16px 0px 16px;

  &:hover {
    color: rgba(#f4511e, 0.87);
  }
}
</style>
