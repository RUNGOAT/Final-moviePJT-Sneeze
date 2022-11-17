<template>
  <div>
    <form @submit.prevent="createCommunity">
      <label for="title">title: </label>
      <input type="text" id="title" v-model.trim="title">
      <label for="content">content: </label>
      <input type="text" id="content" v-model.trim="content">
      <button>제출</button>
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
      console.log(this.$store.state.token)
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
          console.log(res)
          // this.$router.push({ name: 'CommunityDetail', params: { community_pk: res.data.id }})
        })
        .catch(err => console.log(err))
    }
  }

}
</script>

<style>

</style>