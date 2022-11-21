<template>
  <div class="container row p-5">
    <div class="card col-md-3 m-auto p-3" id="login" style="width: 20rem; text-align: center;">
      <div class="card-body">
        <h3 class="card-title" style="font-weight: bold;">로그인</h3>
        <form @submit.prevent="logIn">
            <label for="username" class="card-subtitle mb-2">아이디</label><br>
            <input type="text" id="username" v-model="username">

            <label for="password" class="card-subtitle mb-2">비밀번호</label><br>
            <input type="password" id="password" v-model="password">

          <div class="d-grid col-11 mx-auto py-3">
            <input type="submit" class="btn btn-outline-light" value="logIn">
          </div>

          <hr>
          <p class="py-1">아직 회원이 아니십니까? <router-link :to="{ name: 'Signup'}">회원가입</router-link></p>
        </form>
      </div>
    </div>
  </div>
    <!-- <div>
      <h1>로그인</h1>
      <form @submit.prevent="logIn">
        <label for="username">아이디</label><br>
        <input type="text" id="username" v-model="username"><br>

        <label for="password"> 비밀번호</label><br>
        <input type="password" id="password" v-model="password"><br>
        <br>
        <div class="d-grid gap-2 col-7 mx-auto">
          <input type="submit" class="btn btn-outline-light" value="logIn">
        </div>
      </form>
      <hr>
      <p>아직 회원이 아니십니까? <router-link :to="{ name: 'Signup'}">회원가입</router-link></p>
  </div> -->
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

<style>
  #login{
    width:600px;
    height: 370px;
    border-radius: 10px;
    background-color: #30333E;
    /* text-align: center; */
  }
  /* .button {
    height: 20px;
    width: 20px;
    background-color: white;
    border: none;
    color: white;
    padding: 15px 30px;
    text-align: center;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
  } */
</style>