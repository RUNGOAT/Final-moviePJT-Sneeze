<template>
  <div>
    <router-link :to="{ name: 'Profile', params: { user_pk: community.user }}">{{ community.userName }}</router-link>
    {{ community.title }}
    {{ community.content }}
    {{ community }}
    <router-link :to="{ name: 'CommunityDetail', params: { community_pk: community.id } }">
      [DETAIL]
    </router-link>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'CommunityListItem',
  props: {
    community: Object,
  }
}
</script>

<style>

</style>