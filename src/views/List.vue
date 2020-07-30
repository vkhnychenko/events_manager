<template>
  <div>
    <div class="row">
      <div class="input-field col s4">
        <form id="select">
          <select ref="select" v-model="filter">
            <option value disabled>Показать события за последний:</option>
            <option value="month">Месяц</option>
            <option value="week">Неделю</option>
            <option value="day">День</option>
          </select>
          <button
            v-if="filter"
            type="reset"
            class="btn btn-small red"
            @click="clearFilter"
          >Очистить фильтр</button>
        </form>
      </div>
    </div>
    <hr />
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in allEvents" :key="event.id">
          <td>{{event.id}}</td>
          <td>{{event.title}}</td>
          <td>{{event.datetime}}</td>
          <td class="td">
            <div class="text">{{event.description}}</div>
          </td>
          <td>
            <router-link tag="button" class="btn btn-small" :to="'/event/' + event.id">Open</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    />
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import { mapGetters } from "vuex";

export default {
  name: "List",
  mixins: [paginationMixin],
  data: () => ({
    filter: null,
    search: "",
  }),
  computed: {
    ...mapGetters(["allEvents", "searchValue"]),
    // filteredProducts() {
    //     if (this.sortedProducts.length) {
    //       return this.sortedProducts
    //     } else {
    //       return this.PRODUCTS
    //     }
    //   },
  },
  watch: {
    async filter() {
      let params = { page: this.page };
      if (this.filter === "day") {
        params["day"] = new Date().getDate();
      } else if (this.filter === "week") {
        params["week"] = new Date().getWeek();
      } else if (this.filter === "month") {
        params["month"] = new Date().getMonth() + 1;
      }
      this.totalItems = await this.$store.dispatch("getEvents", params);
      this.setupPagination(this.totalItems, this.allEvents.length);
      await this.$store.dispatch("getSearchValue", '');
    },
    searchValue() {
      this.sortProductsBySearchValue(this.searchValue);
    },
  },
  async mounted() {
    console.log(this.searchValue);
    window.M.FormSelect.init(this.$refs.select);
    if (this.searchValue) {
      this.sortProductsBySearchValue(this.searchValue);
      await this.$store.dispatch("getSearchValue", '');
    } else {
      try {
        this.totalItems = await this.$store.dispatch("getEvents", {
          page: this.page,
        });
        
      } catch (e) {
        console.log(e);
      }
    }
    this.setupPagination(this.totalItems, this.allEvents.length);
  },
  methods: {
    clearFilter() {
      document.getElementById("select").reset();
      this.filter = null;
    },
    async sortProductsBySearchValue(value) {
      try {
        this.totalItems = await this.$store.dispatch("getEvents", {
          page: this.page,
          search: value,
        });
        this.setupPagination(this.totalItems, this.allEvents.length);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.td {
  max-width: 400px;
}
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>