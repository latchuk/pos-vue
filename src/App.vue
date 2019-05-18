<template>
  <div id="app">
    <Navbar/>

    <div class="container mt-4">
      <router-view/>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import api from "./api";

export default {
  components: {
    Navbar
  },
  async created() {
    const { data } = await api.get("/carrinho");
    this.$store.commit("CARRINHO_RECUPERADO", data);
  }
};
</script>

<style lang="scss">
#app {
  font-family: Roboto;
  background: #fafafa;
  color: rgba(0, 0, 0, 0.87);
}
</style>
