<template>
  <div>
    <section class="page-section" id="contact">
        <div class="container">

            <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Signup</h2>

            <div class="row">
                <div class="col-lg-8 mx-auto">
                    
                  <div class="control-group">
                      <div class="st-font form-group floating-label-form-group controls mb-0 pb-2">
                          <label for="username">Username</label>
                          <input style="font-size: 30px" v-model.trim="credentials.username" class="form-control" id="username" type="text" placeholder="Username" required="required" data-validation-required-message="Please enter your username." />
                          <h6>Username에는 알파벳만 가능합니다.</h6>
                          <p class="help-block text-danger"></p>
                      </div>
                  </div>

                  <div class="control-group">
                      <div class="st-font form-group floating-label-form-group controls mb-0 pb-2">
                          <label for="email">Email</label>
                          <input style="font-size: 30px" v-model.trim="credentials.email" class="form-control" id="email" type="text" placeholder="email" required="required" data-validation-required-message="Please enter your email address." />
                          <h6>정확한 e-mail을 작성해주세요.</h6>
                          <p class="help-block text-danger"></p>
                      </div>
                  </div>
                  <div class="control-group">
                      <div class="st-font form-group floating-label-form-group controls mb-0 pb-2">
                          <label>password</label>
                          <input style="font-size: 30px" v-model.trim="credentials.password" class="form-control" id="password" type="password" placeholder="Password" required="required" data-validation-required-message="Please enter your password." />
                          <h6>password는 8자 이상을 권장합니다.</h6>
                          <p class="help-block text-danger"></p>
                      </div>
                  </div>
                  <div class="control-group">
                      <div class="st-font form-group floating-label-form-group controls mb-0 pb-2">
                          <label>passwordConfirmation</label>
                          <input style="font-size: 30px" v-model.trim="credentials.passwordConfirmation" @keypress.enter="signUp" class="form-control" id="passwordConfirmation" type="password" placeholder="passwordConfirmation" required="required" data-validation-required-message="Please confirm your password" />
                          <h6>password는 8자 이상을 권장합니다.</h6>
                          <p class="help-block text-danger"></p>
                      </div>
                  </div>
                  <br />
                  <div id="success"></div>
                  <div class="text-white st-font form-group"><button @click="signUp" class="btn btn-secondary btn-xl" id="Signup" type="submit">Signup</button></div>
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
  name: "SignUp",
  data: function () {
    return {
      credentials: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
    }
  },
  methods: {
    signUp: function () {
      axios.post(`${SERVER_URL}/userinfo/signup/`, this.credentials)
      .then( () => {
        // console.log(res)
        this.$router.push({ name: "Login" })
        alert("가입을 축하드립니다!")
      })
      .catch( (err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style>

</style>