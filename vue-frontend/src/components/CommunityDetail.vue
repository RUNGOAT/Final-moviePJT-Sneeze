<template>
  <div>
    {{ community.user }}
    {{ community.related_name }}
    {{ community.title }}
    {{ community.content }}
    {{ community.created_at }}
    {{ community.updated_at }}
    <CommunityFormView/>
    <hr>

  </div>
</template>

<script>
import CommunityFormView from './CommunityFormView.vue';

export default {
  name: 'CommunityDetailView',
  data() {
    return {
      community: null,
      communityId: this.$route.params.communityId
    }
  },
  components: {
    CommunityFormView,
  },
  methods: {
    getCommunity() {
      console.log(this.communityId)
      this.$store.dispatch('getCommunity', this.communityId)
    }
  },
  created() {
    this.getCommunity()
  }
}
</script>

<style>

</style>