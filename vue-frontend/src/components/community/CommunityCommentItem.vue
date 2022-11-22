<template>
  <div class="container">
    <div v-if="update">
      <div class="row justify-content-between">
        <p class="col-3" id="commentUsername">{{ comment.userName }}</p>
        <div class="col-3 justify-content-left" v-if="this.me.username === comment.userName">
          <span class="mx-2" @click="updateForm">수정</span>
          <span class="mx-2" @click="deleteComment">삭제</span>
        </div>

      </div>
      <p id="commentContent">{{ comment.content }}</p>
    </div>

    <div v-else>
      <p id="commentUsername">{{ comment.userName }}</p>
      <form @submit.prevent="updateComment">
        <!-- <label for="content">댓글: </label> -->
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
    }
  }
}
</script>

<style>
#commentUsername{
  font: bolder;
}
#commentContent{
  font:lighter
}
</style>