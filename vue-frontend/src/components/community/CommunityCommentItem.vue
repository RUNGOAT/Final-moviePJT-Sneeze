<template>
  <div>
    <div v-if="update">
      <p 
        class="m-0 fw-bold fs-3 user"
        @click="goProfile"
        >{{ comment.userName }}</p>
      
      {{ comment.content }}
      <div v-if="this.me.username === comment.userName">
        <button @click="updateForm">UPDATE</button>
        <button @click="deleteComment">DELETE</button>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="updateComment">
        <label for="content">댓글: </label>
        <input type="text" id="content" v-model.trim="updateContent">
        <button>작성</button>
        <button @click="cancelUpdate">취소</button>
      </form>
    </div>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityCommentItem',
  data() {
    return {
      update: true,
      updateContent: null,
      me: [],
    }
  },
  props: {
    comment: Object,
    communityId: String,
  },
  created() {
    this.getMe()
  },
  methods: {
    getMe() {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          this.me = res.data
        })
    },
    deleteComment() {
      axios({
        method: 'delete',
        url: `${API_URL}/community/comment/${this.communityId}/${this.comment.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.$emit('del_comment')
        })
    },
    updateForm() {
      this.update = !this.update
    },
    cancelUpdate() {
      this.updateContent = ''
      this.update = !this.update
    },
    updateComment() {
      const updateContent = this.updateContent
      axios({
        method: 'put',
        url: `${API_URL}/community/comment/${this.communityId}/${this.comment.id}/`,
        data: {
          content: updateContent,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(() => {
          this.update = !this.update
          this.updateContent = ''
          this.$emit('update_comment')
        })
    },
    goProfile() {
      this.$router.push({ name: 'Profile', params: { user_pk: this.review.user }})
    },
  }
}
</script>

<style>

</style>