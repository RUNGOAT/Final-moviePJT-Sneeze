<template>
  <div>
    <h1>Carousel</h1>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true" data-interval="true">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <CarouselItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    
        <!-- <div class="carousel-item active">
          <div :class=" movie.id === 1? 'carousel-item active' : 'carousel-item' " data-bs-interval="2000" :v-for="movie in movies">
            <img class="d-block w-100" :src="backdrop_path + movie.backdrop_path" :alt="movie.title">
            <div class="carousel-caption d-none d-md-block">
              <h5>{{ movie.title }}</h5>
              <p>{{ movie.overview }}</p>
            </div>
          </div> -->
    
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
      return this.$store.state.movies.slice(0, 3)
    }
  }
}
</script>

<style>

</style>