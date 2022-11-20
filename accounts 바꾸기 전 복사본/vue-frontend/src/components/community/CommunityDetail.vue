<template>
  <div>
    <p>{{ community?.userName }}</p>
    <p>{{ community?.related_name }}</p>
    <p>{{ community?.title }}</p>
    <p>{{ community?.content }}</p>
    <p>{{ community?.created_at }}</p>
    <p>{{ community?.updated_at }}</p>
    <br>
    <div v-if="this.me.username === community?.userName">
      <button @click="updateCommunity">UPDATE</button>
      <button @click="deleteCommunity">DELETE</button>
    </div>
    <router-link :to="{name : 'Community'}">[BACK]</router-link>
    <hr>
    <CommunityCommentForm
      @comment_add="commentAdd"
      :communityId="communityId"
    />
    <div v-if="comments">
      <CommunityCommentItem
        @update_comment="updateComment"
        @del_comment="delComment"
        v-for="comment in comments"
        :key="comment.created_at"
        :comment="comment"
        :communityId="communityId"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommunityCommentItem from '@/components/community/CommunityCommentItem'
import CommunityCommentForm from '@/components/community/CommunityCommentForm'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityDetailView',
  components: {
    CommunityCommentItem,
    CommunityCommentForm,
  },
  data() {
    return {
      community: null,
      communityId: this.$route.params.community_pk.toString(),
      comments: null,
      me: [],
    }
  },
  created() {
    this.getMe()
    this.getCommunity()
    this.getCommunityComment()
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
    getCommunity() {
      axios({
        method: 'get',
        url: `${API_URL}/community/detail/${this.communityId}`,
        // data: {
        //   community_pk: this.communityId,
        // }
      })
        .then(res => {
          console.log(res.data)
          this.community = res.data
        })
        .catch(err => console.log(err))
    },
    getCommunityComment() {
      axios({
        method: 'get',
        url: `${API_URL}/community/comments/${this.communityId}`
      })
        .then(res => {
          // console.log(res)
          this.comments = res.data
        })
    },
    commentAdd() {
      this.getCommunityComment()
    },
    deleteCommunity() {
      axios({
        method: 'delete',
        url: `${API_URL}/community/community/${this.communityId}`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.$router.push({ name:'Community' })
        })
    },
    updateCommunity() {
      this.$router.push({ name: 'CommunityUpdate', params: { community_pk: this.communityId }})
    },
    delComment() {
      this.getCommunityComment()
    },
    updateComment() {
      this.getCommunityComment()
    }
  },
}
</script>

<style>

</style>