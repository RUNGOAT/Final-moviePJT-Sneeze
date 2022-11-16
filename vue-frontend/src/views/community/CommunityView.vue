<template>
  <div>
    <h1>Community</h1>
    <router-link :to="{ name: 'CommunityCreate' }">[CREATE]</router-link>
    <hr>
    <div class="container">
      <CommunityListItem
        v-for="community in communities"
        :key="community.created_at"
        :community="community"
      />
    </div>
  </div>
</template>

<script>
import CommunityListItem from '@/components/CommunityListItem.vue'


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