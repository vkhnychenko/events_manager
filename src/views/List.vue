<template>
  <div>
    <div class="row">
      <div class="input-field col s4">
        <select id="select" ref="select" v-model="filter">
          <option value disabled>Показать события за последний:</option>
          <option value="month">Месяц</option>
          <option value="week">Неделю</option>
          <option value="day">День</option>
        </select>
        <button v-if="filter" type="reset" class="btn btn-small red" @click="clearFilter">Очистить</button>
      </div>
      <div class="input field col s4 offset-s4">
        <input
          class="search-input"
          type="text"
          v-model="search"
          placeholder="Найти событие по заголовку"
        />

        <button class="btn btn-small" @click.prevent="sortEventsBySearch">Искать</button>
        <button v-if="search" class="btn btn-small red" @click="clearSearch">Очистить</button>
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
    ...mapGetters(["allEvents", "totalItems"]),
  },
  watch: {
    filter() {
      this.sortEventsByFilter(this.filter);
    },
  },
  async mounted() {
    window.M.FormSelect.init(this.$refs.select);
    const params = { page: this.page };
    await this.getEventsFromAPI(params);
  },
  methods: {
    async getEventsFromAPI(params) {
      try {
        await this.$store.dispatch("getEvents", params);
        this.setupPagination(this.totalItems, this.allEvents.length);
      } catch (e) {
        console.log();
      }
    },
    async sortEventsByFilter(filter) {
      if (filter) {
        let params = { page: this.page };
        this.search = null;
        if (filter === "day") {
          params["day"] = new Date().getDate();
        } else if (filter === "week") {
          params["week"] = new Date().getWeek();
        } else if (filter === "month") {
          params["month"] = new Date().getMonth() + 1;
        }
        await this.getEventsFromAPI(params);
      }
    },
    async sortEventsBySearch() {
      this.filter = null
      document.getElementById("select").selectedIndex = -1;
      window.M.FormSelect.init(this.$refs.select);
      const params = { page: this.page, search: this.search };
      await this.getEventsFromAPI(params);
    },
    async clearFilter() {
      document.getElementById("select").selectedIndex = -1;
      window.M.FormSelect.init(this.$refs.select);
      this.filter = null;
      const params = { page: this.page };
      await this.getEventsFromAPI(params);
    },
    async clearSearch() {
      this.search = null;
      const params = { page: this.page };
      await this.getEventsFromAPI(params);
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