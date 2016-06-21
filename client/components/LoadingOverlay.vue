<style lang="sass">
.loading-overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  display: none
  padding-top: 12px

  &.is-active
    display: block
</style>

<template>
  <div class="loading-overlay {{ isActive ? 'is-active' : ''}}">
    <div class="has-text-centered">
      <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean
  }
}
</script>
