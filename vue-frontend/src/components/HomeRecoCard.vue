<template>
  <div>
    <vue-glide v-if="movies.length"
      class="glide__track"
      data-glide-el="track"
      ref="slider"
      type="carousel"
      :breakpoints="{3000: {perView: 7}, 1100: {perView: 5}, 600: {perView: 3}}"
    >
      <vue-glide-slide
        v-for="movie in movies"
        :key="movie.created_at">
        <!-- <MovieDetail 
          :movie="movie"
        /> -->
        <p>{{ movie.title }}</p>
      </vue-glide-slide>
    </vue-glide>
    
  </div>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'

export default {
  name: 'HomeRecoCard',
  props: {
    movies: {
      type: Array,
    }
  },
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
}
</script>

<style>

</style>