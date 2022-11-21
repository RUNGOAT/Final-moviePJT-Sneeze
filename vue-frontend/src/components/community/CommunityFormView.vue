<template>
  <div class="container">
    <h1>게시글 작성</h1>
    <form @submit.prevent="createCommunity">
      <label for="title">title: </label>
      <input type="text" id="title" v-model.trim="title" class="form-control">
      <label for="content">content: </label>
      <textarea v-model.trim="content" id="content" cols="30" rows="10" class="form-control"></textarea>
      <button class="btn btn-warning">제출</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityForm',
  data() {
    return {
      title: null,
      content: null,
    }
  },
  methods: {
    createCommunity() {

      const title = this.title
      const content = this.content
      if (!title) {
        alert('제목을 입력해주세요!')
        return
      } else if (!content) {
        alert('내용을 입력해주세요!')
        return
      }
      axios({
        method: 'post',
        url: `${API_URL}/community/community_list_create/`,
        data: {
          title,
          content,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          // console.log(res.data)
          this.$router.push({ name: 'CommunityDetail', params: { community_pk: res.data.id }})
        })
        .catch(err => console.log(err))
    }
  }

}
</script>

<style>

</style>