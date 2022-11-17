<template>
  <div>
    {{ review }}
  </div>
</template>

<script>
export default {
  name: 'ReviewItem',
  data() {
    return {
      data: 11
    }
  },
  props: {
    review: Object,
  }
}
</script>

<style>

</style>