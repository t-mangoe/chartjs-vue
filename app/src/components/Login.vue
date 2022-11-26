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
          ></v-text-field>
          <v-text-field
            name="password"
            label="パスワード"
            id="password"
            type="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <div class="login-btn">
        <v-btn block color="primary">ログイン</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.login-btn {
  width: 50%;
}
</style>
