<template>
  <div>
    <!-- <h1>Carousel</h1> -->
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false" >
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        >
          <div :class="[movie.id == 1 ? 'carousel-item active' : 'carousel-item']" data-bs-interval="20">
            <img :src="backdrop_path + movie.backdrop_path" class="d-block w-100" alt="movie.title" id="carouselImg">
            <div class="carousel-caption d-none d-md-block text-left">
              <h2 style="font-weight: bold;">{{ movie.title }}</h2>
              <p>{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselList',
  components: {
  },
  data() {
    return {
      nextLabel: "<img src='/assets/arrow-right.png'/>",
      prevLabel: "<img src='/assets/arrow-left.png'/>",
      backdrop_path: `https://image.tmdb.org/t/p/original`
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
#carouselImg {
  filter: brightness(50%);
}
/* #carousel-item {
    position: relative;

    background: url(http://lorempixel.com/300/200/nature/5) no-repeat 0 0;
}
#carousel-item .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .7);
    color: #EEE;
    padding: 10px;
} */

/* #carouselImg img {
    display: block;
}

#carouselImg:after {
    position: absolute;
    content:"";
    height:100%;
    width:100%;
    top:0;
    left:0;
    background: linear-gradient(to bottom, rgba(255,0,0,0) 0%,rgba(255,0,0,0.65) 100%);
} */
</style>