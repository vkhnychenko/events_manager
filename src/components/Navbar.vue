<template>
  <nav class="indigo darken-3">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Менеджер событий</router-link>
      <div class="search-form">
        <div class="search-text">
          <input
            class="search-input"
            type="text"
            v-model="searchValue"
            placeholder="Найти событие по заголовку"
          />
        </div>

        <div class="search-btn">
          <button class="btn" @click.prevent="search(searchValue)">Искать</button>
        </div>
      </div>

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
.search-form {
  display: table;
}
.search-text {
  display: table-cell;
}
.search-btn {
  display: table-cell;
  padding-left: 10px;
}
.search-input {
  color: white;
  background-color: black;
}
</style>