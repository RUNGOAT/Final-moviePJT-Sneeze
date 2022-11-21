<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="http://localhost:8080/">
          <img src="../src/assets/logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
          Movie
        </a>
      
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Movie' }">Movie</router-link>
        <router-link :to="{ name: 'Community' }">Community</router-link>
        <router-link :to="{ name: 'MyProfile', params: { username: username }  }">Profile</router-link>
        <div v-if="!isLogin">
          <router-link :to="{ name: 'Signup' }">Signup</router-link> .
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </div>
        <div v-else>
          <button @click="logOut" v-show="isLogin">Logout</button>
        </div>
        <!-- <button @click="logOut" v-show="isLogin">Logout</button>
        <button @click="logIn" v-show="!isLogin">Login</button>
        <button @click="signUp" v-show="!isLogin">Signup</button> -->
        <router-link :to="{ name: 'MovieDetail', params: { movie_id: '505642'} }">Detail</router-link>

        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-light" type="submit">Search</button>
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
html {
  width: 100%;
  height :100%;
  background-attachment: fixed;
  background: linear-gradient(0deg, rgba(45,47,59,1) 0%, rgba(8,9,14,1) 35%) no-repeat;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height :100%;
  margin: 0;
  background: transparent;
  /* text-align: center; */
  color: white;
}

nav {
  background-color: #08090E;
}

nav a {
  font-weight: bold;
  color: white
  ;
}

nav a.router-link-exact-active {
  color: #009DC9;
}
</style>
