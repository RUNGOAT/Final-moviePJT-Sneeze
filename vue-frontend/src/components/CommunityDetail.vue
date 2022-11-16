<template>
  <div>
    {{ community?.user }}
    {{ community?.related_name }}
    {{ community?.title }}
    {{ community?.content }}
    {{ community?.created_at }}
    {{ community?.updated_at }}
    <hr>
    <div v-if="comments">
      <CommunityCommentItem
        v-for="comment in comments"
        :key="comment.created_at"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommunityCommentItem from '@/components/CommunityCommentItem'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityDetailView',
  components: {
    CommunityCommentItem,
  },
  data() {
    return {
      community: null,
      communityId: this.$route.params.communityId,
      comments: null,
    }
  },
  methods: {
    getCommunity() {
      console.log(this.communityId)
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