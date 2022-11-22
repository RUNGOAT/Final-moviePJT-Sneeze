<template>
  <div class="row d-flex justify-content-around">
    <!-- {{ community.content }} -->
    <div class="col-3">
      <router-link :to="{ name: 'CommunityDetail', params: { community_pk: community.id } }">
        {{ community.title }}
      </router-link>
      
    </div>
    <div class="col-1">
      {{ community?.userName }}
    </div>
    <div class="col-1">
      {{ community?.created_at }}
    </div>
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