<template>
  <div class="row d-flex justify-content-around">
    <!-- {{ community.content }} -->
    <div class="col-3">
      <router-link :to="{ name: 'CommunityDetail', params: { community_pk: community.id } }" id="communityTitle">
        {{ community.title }}
      </router-link>
      
    </div>
    <div class="col-2">
      {{ community?.userName }}
    </div>
    <div class="col-2">
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
router-link {
  
}
#communityTitle:hover {
  text-decoration: underline;
}
</style>