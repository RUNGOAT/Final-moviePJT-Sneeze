<template>
  <div>
    <H2>Movie Review</H2>
    <ReviewCommentForm/>
  </div>
</template>

<script>
import ReviewCommentForm from '@/components/ReviewCommentForm'
export default {
  name: 'MovieReviewView',
  components: {
    ReviewCommentForm,
  }
}
</script>

<style>

</style>