<template>
  <div>
    <h2>추천</h2>
    <RecommendationItem
      v-for="recommendation in recommendations"
      :key="recommendation.id"
      :recommendation="recommendation"
    />
  </div>
</template>

<script>
import RecommendationItem from '@/components/RecommendationItem'
export default {
  name: 'RecommendationView',
  components: {
    RecommendationItem,
  },
  methods: {
    getRecommended() {
        // if (this.isLogin) {
          this.$store.dispatch('getRecommended')
        // } else {
          //   alert('로그인이 필요한 서비스 입니다.')
        //   this.$router.push({ name: 'LogInView'})
    },
  },
  computed: {
    recommendations() {
      return this.$store.state.recommendations
      // return movies._.orderBy('popularity')
    }
  }

  
}
</script>

<style>

</style>