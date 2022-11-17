<template>
  <div>
    <form @submit.prevent="createComment">
      <label for="content">댓글: </label>
      <input type="text" id="content" v-model.trim="content">
      <button>작성</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CommunityCommentForm',
  data() {
    return {
      content: null,
    }
  },
  methods: {
    createComment() {
      axios({
        method: 'get',
        // url: 
      })
    }
  }
}
</script>

<style>

</style>