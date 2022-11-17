<template>
  <div
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
  data() {
    return {
      data: 11
    }
  },
  props: {
    review: Object,
  },
  methods: {
    reviewDetail() {
      this.$router.push({ name: 'ReviewDetail', params: { review_pk: this.review.id }})
    },
  }
}
</script>

<style>

</style>