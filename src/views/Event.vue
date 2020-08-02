<template>
  <div class="row">
    <div v-if="eventInfo" class="col s6 offset-s3">
      <h1>{{eventInfo.title}}</h1>
      <h4>Срок завершения: {{eventInfo.datetime}}</h4>
      <hr>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" v-model="title" type="text"/>
          <label for="description">Название</label>
        </div>
        <div class="input-field">
          <textarea
            style="min-height: 150px"
            v-model="description"
            id="description"
            class="materialize-textarea"
          ></textarea>
          <label for="description">Описание</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{description.length}}/2048</span>
        </div>
        <div class="input-field">
          <input type="text" ref="datepicker" />
          <label for="title">Дата</label>
        </div>
        <div class="input-field">
          <input type="text" ref="timepicker" />
          <label for="title">Время</label>
        </div>
        <button class="btn" type="submit" style="margin-right: 1rem;">Обновить</button>
        <button class="btn blue" type="button" @click="deleteEvent">Удалить задачу</button>
      </form>
    </div>
    <p v-else>Событие не найдено</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["eventInfo"]),
  },
  data: () => ({
    title:'',
    description: "",
    date: null,
    time: null,
  }),
  async mounted() {
    try {
      await this.$store.dispatch("getEventById", +this.$route.params.id);
    } catch (e) {
      console.log();
    }
    this.title = this.eventInfo.title;
    this.description = this.eventInfo.description;
    this.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: "yyyy-mm-dd",
      defaultDate: new Date(),
      minDate: new Date(),
    });
    this.time = window.M.Timepicker.init(this.$refs.timepicker, {
      twelveHour: false,
      defaultTime: new Date(),
    });
    setTimeout(() => {
      window.M.updateTextFields();
    }, 0);
  },
  methods: {
    async submitHandler() {
      let event = {
        title: this.title,
        id: +this.$route.params.id,
        description: this.description,
      };
      if (this.date.date && this.time.time) {
        event["datetime"] =
          this.date.date.toString("yyyy-MM-dd") +
          "T" +
          this.time.time +
          new Date().toString(":ss.sssZ");
      } else if (this.date.date) {
        event["datetime"] =
          this.date.date.toString("yyyy-MM-dd") +
          "T" +
          new Date().toString("HH:mm:ss.sssZ");
      } else if (this.time.time) {
        event["datetime"] =
          new Date().toString("yyyy-MM-dd") +
          "T" +
          this.time.time +
          new Date().toString(":ss.sssZ");
      } else {
        event["datetime"] = new Date().toISOString();
      }
      try {
        await this.$store.dispatch("updateEvent", event);
        this.$message("Задача успешно обновлена");
        this.$router.push("/list");
      } catch (e) {
        console.log();
      }
    },
    deleteEvent() {
      try {
        this.$store.dispatch("deleteEvent", +this.$route.params.id);
        this.$message("Задача успешно удалена");
        this.$router.push("/list");
      } catch (e) {
        console.log();
      }
    },
  },
  // Уничтожает плагины после закрытия страницы
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }
  },
};
</script>