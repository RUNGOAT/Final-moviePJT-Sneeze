<template>
  <div>
    <section class="page-section" id="contact">
        <div class="container">

            <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Login</h2>

            <div class="row">
                <div class="col-lg-8 mx-auto">
                    
                  <div class="control-group">
                      <div class="st-font form-group floating-label-form-group controls mb-0 pb-2">
                          <label for="username">Username</label>
                          <input style="font-size: 30px" v-model.trim="credentials.username" class="form-control" id="username" type="text" placeholder="Username" required="required" data-validation-required-message="Please enter your username." />
                          <p class="help-block text-danger"></p>
                      </div>
                  </div>
                  <div class="control-group">
                      <div class="st-font form-group floating-label-form-group controls mb-0 pb-2">
                          <label>password</label>
                          <input style="font-size: 30px" @keypress.enter="login" v-model.trim="credentials.password" class="form-control" id="password" type="password" placeholder="Password" required="required" data-validation-required-message="Please enter your password." />
                          <p class="help-block text-danger"></p>
                      </div>
                  </div>
                  <br />
                  <div id="success"></div>
                  <div class="text-white st-font form-group"><button @click="login" class="btn btn-secondary btn-xl" id="Login" type="submit">Login</button></div>
                  <h3 class="st-font">회원정보가 없다면 아래 회원가입을 눌러주세요.</h3>
                  <div class="text-white st-font form-group"><button @click="moveToSignUp" class="btn btn-secondary btn-xl" id="Signup" type="submit">Signup</button></div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = 'http://127.0.0.1:8000'

export default {
  name: "LogIn",
  data() {
    return {
      // loginStatus: false,
      credentials: {
        username: null,
        password: null,
      },
    }
  },
  methods: {
    login() {
      axios.post(`${SERVER_URL}/userinfo/api-token-auth/`, this.credentials)
      // axios.post(`${SERVER_URL}/accounts/login/`, this.credentials)
      .then( (res) => {
        localStorage.setItem('jwt', res.data.token)
        // this.$emit('login')
        // this.loginStatus = true
        // this.$store.dispatch("loginChange", this.loginStatus)
        const loginInfo = {
          token: res.data.token,
          username: this.credentials.username,
          password: this.credentials.password,
        }
        this.$store.commit('SAVE_TOKEN', loginInfo)
        // this.$router.push({ name: "Home" })
        // console.log(res.data.token)
        console.log(this.credentials)
        // location.reload()
      })
      .catch( (err) => {
        alert("올바른 아이디와 비밀번호를 입력해주세요.")
        console.log(err)
      })
    },
    moveToSignUp: function () {
      this.$router.push({ name: 'SignUp' })
    }
  }
}
</script>

<style>
</style>