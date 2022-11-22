<template>
  <div class="container" id="community">
    <div class="row">
      
      <router-link class="col-1" :to="{name : 'Community'}">
        <img src="@/assets/back.png" style="width:25px;" alt="back">
      </router-link>
      <span class="col-10" style="text-align: center;">Community</span>
    </div>
    <br>
    <div class="row">
      <h2 class="col-10">{{ community?.title }}</h2>

      <div class="col-2 d-flex justify-content-end" v-if="this.me.username === community?.userName">
        <span class="px-2" @click="updateCommunity">
          <img src="@/assets/pencil.png" style="width:28px;" alt="edit">
          <!-- 수정 -->
        </span> 
        <span class="px-2" @click="deleteCommunity">
          <img src="@/assets/trash.png" style="width:30px;" alt="edit">
          <!-- 삭제 -->
        </span>
      </div>
    </div>

    <div class="row">
      <p 
        class="m-0 fw-bold fs-3 user"
        @click="goProfile"
        >{{ community.userName }}</p>
      <p>{{ community?.updated_at }}</p>
    </div>
    <hr>
    <p>{{ community?.content }}</p>
    <!-- <p>{{ community?.created_at }}</p> -->
    <br>
    
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
    },
    goProfile() {
      this.$router.push({ name: 'Profile', params: { user_pk: this.review.user }})
    },
  },
}
</script>

<style>
#community{
    width:800px;
    height: 530px;
    padding: 3%;
    margin-top: 50px;
    border-radius: 10px;
    background-color: #30333E;
    /* text-align: center; */
  }
</style>