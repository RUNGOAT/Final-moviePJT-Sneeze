<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="../src/assets/logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
          Movie
        </a>
      
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Community' }">Community</router-link>
        <router-link :to="{ name: 'Profile' }">Profile</router-link>
        <router-link :to="{ name: 'Signup' }">Signup</router-link>
        <router-link :to="{ name: 'Login' }">Login</router-link>

        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-dark" type="submit">Search</button>
        </form>

      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
