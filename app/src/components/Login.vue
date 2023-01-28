<template>
  <v-container>
    <v-card class="elevation-1 pa-3 login-card">
      <v-card-text>
        <div class="layout column align-center">
          <h1 class="flex my-4 primary--text font-weight-bold">
            ログインページ
          </h1>
        </div>
        <v-form ref="loginForm">
          <v-text-field
            name="login"
            label="メールアドレス"
            type="text"
            required
            v-model="userId"
          ></v-text-field>
          <v-text-field
            name="password"
            label="パスワード"
            id="password"
            type="password"
            required
            v-model="userPassword"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="login">ログイン</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      userId: "",
      userPassword: "",
    };
  },
  methods: {
    login: function() {
      const userId = this.userId;
      const userPassword = this.userPassword;

      axios
        .post("/express/loginAuth/", {
          id: userId,
          pass: userPassword,
        })
        .then((response) => {
          console.log(response);
          confirm("認証に成功しました");
        })
        .catch((error) => {
          console.error(error);
          confirm("認証に失敗しました");
        });
    },
  },
};
</script>

<style scoped></style>
