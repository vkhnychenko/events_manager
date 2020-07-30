<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Менеджер событий</span>
      <div class="input-field">
        <input id="username" type="text" v-model="username" />
        <label for="username">Имя пользователя</label>
        <small
          class="helper-text invalid"
          v-if="$v.username.$dirty && !$v.username.required"
        >Имя пользователя не должно быть пустым</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</small>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >Пароль должен быть {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import { required, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages";
import { mapActions } from "vuex";

export default {
  name: "login",
  data: () => ({
    username: "",
    password: "",
  }),
  validations: {
    username: { required },
    password: { required, minLength: minLength(8) },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    ...mapActions(["createToken"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        username: this.username,
        password: this.password,
      };
      try {
        await this.createToken(formData);
        this.$router.push("/").catch(() => {});
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>