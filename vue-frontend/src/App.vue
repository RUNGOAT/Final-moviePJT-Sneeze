<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="../src/assets/logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
          Movie
        </a>
      
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Movie' }">Movie</router-link>
        <router-link :to="{ name: 'Community' }">Community</router-link>
        <router-link :to="{ name: 'Profile', params: { username: username }  }">Profile</router-link>
        <!-- <router-link :to="{ name: 'Signup' }">Signup</router-link>
        <router-link :to="{ name: 'Login' }">Login</router-link> -->
        <button @click="logOut" v-show="isLogin">Logout</button>
        <button @click="logIn" v-show="!isLogin">Login</button>
        <button @click="signUp" v-show="!isLogin">Signup</button>
        <router-link :to="{ name: 'MovieDetail', params: { movie_id: '505642'} }">Detail</router-link>

        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-dark" type="submit">Search</button>
        </form>

      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    username(){
      return this.$store.state.username
    },
    isLogin(){
      return this.$store.getters.isLogin
    },
  },
  methods: {
    logOut() {
      this.$store.commit('LOGOUT')
    },
    logIn() {
      this.$router.push({ name: 'Login'})
    },
    signUp() {
      this.$router.push({ name: 'Signup'})
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: black;
  /* color: #2c3e50; */
}

/* nav {
  padding: 30px;
} */

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
