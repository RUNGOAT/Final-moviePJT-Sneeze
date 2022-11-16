<template>
  <div>
    <h1>Community</h1>
    <div class="container">
      <CommunityDetail
        v-for="community in communities"
        :key="community.created_at"
      />
    </div>
  </div>
</template>

<script>
import CommunityDetail from '@/components/CommunityDetail.vue'

export default {
  name:'CommunityView',
  components: {
    CommunityDetail
  },
  computed: {
    communities() {
      return this.$store.state.communities
    }
  },
  methods: {
    getCommentList() {
      this.$store.dispatch('getCommentList')
    }
  },
  created() {
    this.getCommentList()
  }
}
</script>

<style>

</style>