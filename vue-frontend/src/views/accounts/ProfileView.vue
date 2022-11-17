<template>
  <div>
    <h1>{{ username }}'s Profile</h1>
    <div class="container">
      <div>
        <div>
          <p>Followers</p>
          <p>숫자</p>
        </div>
        <div>
          <p>Followings</p>
          <p>숫자</p>
        </div>
      </div>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-primary" type="button">Follow</button>
      </div>
    </div>
    <hr>
    <div>
      <p>{{ username }}님이 쓴 리뷰</p>

    </div>
    <div>
      <p>{{ username }}님이 좋아요한 영화</p>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  computed: {
    isLogin(){
      return this.$store.getters.isLogin
    },
    username() {
      return this.$store.state.username
    },
  },
  methods: {
  },
  created() {
  }
}
</script>

<style>

</style>