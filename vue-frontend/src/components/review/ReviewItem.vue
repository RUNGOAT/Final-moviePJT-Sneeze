<template>
  <div
    class="py-3 text-light"
    @click="reviewDetail"
    style="cursor: grab"
  >
    {{ review.title }}
    {{ review }}
  </div>
</template>

<script>
export default {
  name: 'ReviewItem',
  props: {
    review: Object,
    movie: Object,
  },
  methods: {
    reviewDetail() {
      this.$router.push({ name: 'ReviewDetail', params: { 
        review_pk: this.review.id,
        movie_id: this.movie.movie_id,
        movie_pk: this.movie.id
      }})
    },
  }
}
</script>

<style>

</style>