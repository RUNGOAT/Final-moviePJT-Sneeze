<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="logIn">
      <label for="username">아이디 : </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="password"> 비밀번호 : </label>
      <input type="password" id="password" v-model="password"><br>
      <input type="submit" value="logIn">
    </form>
      <p>아직 회원이 아니십니까? <router-link :to="{ name: 'Signup'}">회원가입</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    logIn() {
      const username = this.username
      const password = this.password

      const payload = {
        username: username,
        password: password,
      }
      this.$store.dispatch('logIn', payload)
    }
  }
}
</script>
