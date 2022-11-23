<template>
  <div class="container p-5">
    <div class="row justify-content-space-between">
      <h1 class="col align-right">Community</h1>
      <router-link :to="{ name: 'CommunityCreate' }" class="col-1"><img class="d-flex justify-content-end" src="@/assets/plus.png" style="width:45px;"></router-link>
    </div>
    <br>
    <div class="row d-flex justify-content-around text-center">
      <p class="col-3">제목</p>
      <p class="col-2">작성자</p>
      <p class="col-2">작성일</p>
    </div>
    <hr>
    <div>
      <CommunityListItem
        v-for="community in communities"
        :key="community.created_at"
        :community="community"
      />
    </div>
  </div>
</template>

<script>
import CommunityListItem from '@/components/community/CommunityListItem.vue'

export default {
  name:'CommunityView',
  components: {
    CommunityListItem,
  },
  computed: {
    communities() {
      return this.$store.state.communities
    }
  },
  methods: {
    getCommunityList() {
      this.$store.dispatch('getCommunityList')
    }
  },
  created() {
    this.getCommunityList()
  }
}
</script>

<style>

</style>