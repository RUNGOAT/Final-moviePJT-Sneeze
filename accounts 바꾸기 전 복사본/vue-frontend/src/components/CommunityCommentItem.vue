<template>
  <div>
    {{ comment.user }}
    {{ comment.content }}
    <hr>
  </div>
</template>

<script>

export default {
  name: 'CommunityCommentItem',
  props: {
    comment: Object,
  }
}
</script>

<style>

</style>