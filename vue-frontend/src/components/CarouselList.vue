<template>
  <div>
    <h1>Carousel</h1>
    <CarouselItem
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import CarouselItem from '@/components/CarouselItem'
export default {
  name: 'CarouselView',
  components: {
    CarouselItem,
  },
  computed: {
    movies() {
      return this.$store.state.movies
    }
  }
}
</script>

<style>

</style>