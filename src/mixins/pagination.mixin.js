export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageCount: 0,
      totalItems: 0,
    };
  },
  methods: {
    async pageChangeHandler(page) {
      try {
        await this.$store.dispatch("getEvents", { page: page });
        this.$router.push(`${this.$route.path}?page=${page}`);
      } catch (e) {
        console.log(e);
      }
    },
    setupPagination(totalItems, pageSize) {
      this.pageCount = Math.ceil(totalItems / pageSize);
    },
  },
};
