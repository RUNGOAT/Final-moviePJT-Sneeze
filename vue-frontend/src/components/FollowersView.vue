<template>
  <div>
    <p 
      class="m-0 fw-bold fs-3 user"
      @click="goProfile"
      >{{ user.username }}</p>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'FollowersView',
  data() {
    return {
      user: [],
    }
  },
  props: {
    userId: Number
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      axios({
        method: 'post',
        url: `${API_URL}/userinfo/${this.userId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          this.user = res.data
          console.log(res)
        })
    },
    goProfile() {
      this.$router.push({ name: 'Profile', params: { user_pk: this.userId }})
    },
  }
}
</script>

<style>

</style>