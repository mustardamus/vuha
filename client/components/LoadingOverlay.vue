<style lang="sass">

</style>

<template>
  <div class="loading-overlay">
    <div class="modal {{ isActive ? 'is-active' : ''}}">
      <div class="modal-background"></div>
      <div class="modal-container">
        <div class="modal-content">
          loading...
        </div>
      </div>
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
