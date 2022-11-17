<template>
  <div>
    {{ community?.user }}
    {{ community?.related_name }}
    {{ community?.title }}
    {{ community?.content }}
    {{ community?.created_at }}
    {{ community?.updated_at }}
    <br>
    <button @click="updateCommunity">UPDATE</button>
    <button @click="deleteCommunity">DELETE</button>
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
    }
  },
  methods: {
    getCommunity() {
      axios({
        method: 'get',
        url: `${API_URL}/community/detail/${this.communityId}`,
        // data: {
        //   community_pk: this.communityId,
        // }
      })
        .then(res => {
          console.log(res)
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
          console.log(res)
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
  created() {
    this.getCommunity()
    this.getCommunityComment()
  }
}
</script>

<style>

</style>