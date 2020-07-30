<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Менеджер событий</span>
      <div class="input-field">
        <input
          id="username"
          type="text"
          v-model.trim="username"
          :class="{invalid: $v.username.$dirty && !$v.username.required}"
        />
        <label for="username">Имя пользователя</label>
        <small
          class="helper-text invalid"
          v-if="$v.username.$dirty && !$v.username.required"
        >Введите имя пользователя</small>
      </div>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Поле email не должно быть пустым</small>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.email"
        >Введите корректный email</small>
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

      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "register",
  data: () => ({
    email: "",
    password: "",
    username: "",
    agree: false,
    date: "",
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
    username: { required },
    agree: { checked: (v) => v },
  },
  mounted() {
    this.date = new Date();
    console.log(this.date.toString("yyyy-MM-dd"));
    console.log(this.date.toString("HH-mm"));
  },
  methods: {
    ...mapActions(["register"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        username: this.username,
      };
      try {
        console.log(formData);
        await this.register(formData);
        this.$router.push("/login?message=login");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>