<template>
  <nav class="indigo darken-3">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Менеджер событий</router-link>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">Создать задачу</a>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <a href="#">Список задач</a>
        </router-link>
        <div class="btn" @click="logout">Logout</div>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data: () => ({
    searchValue: "",
  }),
  methods: {
    ...mapActions(['getSearchValue']),
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
    search(value) {
        this.getSearchValue(value)
        this.searchValue = "";
        this.$router.push("/list").catch(()=>{});
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2rem;
}
</style>