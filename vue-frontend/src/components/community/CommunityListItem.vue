<template>
  <div>
    {{ community?.userName }}
    {{ community.title }}
    {{ community.content }}
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