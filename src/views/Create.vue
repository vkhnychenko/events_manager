<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Создание задачи</h1>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" v-model="title" type="text" class="validate" required />
          <label for="title">Название</label>
          <span class="helper-text" data-error="Название обязательное поле"></span>
        </div>
        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Описание</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{description.length}}/2048</span>
        </div>
        <div class="input-field">
          <input id='datepicker' type="text" ref="datepicker" class="validate" required />
          <label for="title">Дата</label>
          <span class="helper-text" data-error="Нужно обязательно выбрать дату"></span>
        </div>
        <div class="input-field">
          <input id='timepicker' type="text" ref="timepicker" class="validate" required />
          <label for="title">Время</label>
          <span class="helper-text" data-error="Нужно обязательно выбрать время"></span>
        </div>
        <button class="btn" type="submit">Создать задачу</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "create",
  data: () => ({
    title: "",
    description: "",
    date: null,
    time: null,
  }),
  mounted() {
    this.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: "yyyy-mm-dd",
      defaultDate: new Date(),
      minDate: new Date(),
    });
    this.time = window.M.Timepicker.init(this.$refs.timepicker, {
      twelveHour: false,
    });
  },
  methods: {
    ...mapActions(["createEvent"]),
    async submitHandler() {
      const event = {
        title: this.title,
        description: this.description,
        datetime:
          this.date.date.toString("yyyy-MM-dd") +
          "T" +
          this.time.time +
          new Date().toString(":ss.sssZ"),
        user: localStorage.getItem("userId"),
      };
      console.log(event);
      try {
        await this.createEvent(event);
        this.$message("Задача успешно создана");
        this.title = this.description = "";
        document.getElementById('datepicker').value = ''
        document.getElementById('timepicker').value = ''
      } catch (e) {
        console.log(e);
      }
    },
  },
  // Уничтожает плагины после закрытия страницы
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.time && this.time.destroy) {
      this.time.destroy();
    }
  },
};
</script>
