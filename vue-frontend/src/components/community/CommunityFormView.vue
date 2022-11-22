<template>
  <div class="container" id="community">
    <h2>게시글 작성</h2>
    <form @submit.prevent="createCommunity">
      <div class="mb-3 py-3">
        <!-- <label for="title" class="form-label">제목</label> -->
        <input type="text" class="form-control" id="title1" aria-describedby="titleHelp" v-model.trim="title" placeholder="제목">
        <div id="titleHelp" class="form-text">100자 이하</div>
      </div>
      <div class="mb-3 py-3">
        <!-- <label for="content" class="form-label">내용</label> -->
        <textarea type="text" class="form-control" id="content" v-model.trim="content" placeholder="내용" style="height: 200px;"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">등록</button>
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