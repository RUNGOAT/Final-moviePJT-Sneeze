<template>
  <div>
    <h1>CommunityUpdate</h1>
    <form @submit.prevent="updateCommunity">
      <label for="title">title: </label>
      <input type="text" id="title" v-model.trim="title">
      <label for="content">content: </label>
      <textarea v-model.trim="content" id="content" cols="30" rows="10"></textarea>
      <button>제출</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityDetailUpdateView',
  data() {
    return {
      communityId: this.$route.params.community_pk.toString(),
      title: null,
      content: null,
    }
  },
  methods: {
    updateCommunity() {

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
        method: 'put',
        url: `${API_URL}/community/community/${this.communityId}/`,
        data: {
          title,
          content,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.$router.push({ name: 'CommunityDetail', params: { community_pk: res.data.id }})
        })
    }
  }
}
</script>

<style>

</style>