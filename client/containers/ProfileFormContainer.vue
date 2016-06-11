<template>
  <profile-form @data="onData"></profile-form>
</template>

<script>
export default {
  components: {
    ProfileForm: require('../components/ProfileForm.vue')
  },

  methods: {
    onData (data) {
      //this.$root.createUser(data)
      console.log('update user', data);
    }
  }
}
</script>
