<template>
  <div>
    <h1>Carousel</h1>
    <carousel
      :per-page="1"
      :autoplay="true"
      :autoplay-timeout="2000"
      :autoplay-hover-pause="true"
      :loop="true"
      :navigation-enabled="true"
      :navigation-next-label="nextLabel"
      :navigation-prev-label="prevLabel"
      :pagenation-enabled="true"
      :paginationSize="20"
    >
      <slide
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      >
        <div >
          <img class="d-block w-100" :src="backdrop_path + movie.backdrop_path" :alt="movie.title">
          <h5 style="float">{{ movie.title }}</h5>
          <p style="float">{{ movie.overview }}</p>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
// import CarouselItem from '@/components/CarouselItem'
export default {
  name: 'CarouselView',
  components: {
    // CarouselItem,
    Carousel,
    Slide,
  },
  data() {
    return {
      nextLabel: "<img src='/assets/arrow-right.png'/>",
      prevLabel: "<img src='/assets/arrow-left.png'/>",
      backdrop_path: `https://image.tmdb.org/t/p/original/`
    }
  },
  methods: {
    check() {
      console.log(this.movies)
    }
  },
  computed: {
    movies() {
      return this.$store.state.top5Movies
    }
  },
  created() {
    this.check()
  }
}
</script>

<style>

</style>