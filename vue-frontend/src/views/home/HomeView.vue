<template>
  <div>
    <h1>HOME</h1>
    <CarouselList/>
  
  </div>
</template>

<script>
import CarouselList from '@/components/CarouselList'

export default {
  name: 'HomeView',
  components: {
    CarouselList,
  },
  created() {
    this.getMovies()
  },
  methods: {
    getMovies() {
      // if (this.isLogin) {
        this.$store.dispatch('getMovies')
      // } else {
      //   alert('로그인이 필요한 서비스 입니다.')
      //   this.$router.push({ name: 'LogInView'})
      }
    }
  }
// }

</script>

<style>

</style>