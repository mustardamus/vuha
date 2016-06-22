<style lang="sass">

</style>

<template>
  <form class="post-form" v-form name="validation" @submit.prevent="onSubmit">
    <label class="label" for="title">Title</label>
    <p class="control">
      <input id="title" type="text" name="title" placeholder="Title"
        :class="{ input: true, 'is-danger': validation.title.$invalid && validation.$submitted }"
        v-form-ctrl required v-model="title"
      >
      <span class="help is-danger" v-if="validation.title.$invalid && validation.$submitted">
        Title is required
      </span>
    </p>

    <label class="label" for="content">Content</label>
    <p class="control">

      <textarea id="content" name="content" placeholder="Content formatted in Markdown"
        :class="{ textarea: true, 'is-danger': validation.content.$invalid && validation.$submitted }"
        v-form-ctrl required v-model="content"
      ></textarea>

      <span class="help is-danger" v-if="validation.content.$invalid && validation.$submitted">
        Content is required
      </span>
    </p>

    <p class="control">
      <button class="button is-primary" type="submit">Create</button>
    </p>
  </form>
</template>

<script>
export default {
  props: {
    title: String,
    content: String
  },

  data () {
    return {
      validation: null,
      passwordCheck: ''
    }
  },

  ready () {
    this.$('form input').get(0).focus()

    this.title = 'Just keep on going'
    this.content = '# Markdown\n\n* should\n* work'
  },

  methods: {
    onSubmit () {
      if (this.validation.$valid) {
        this.$emit('data', {
          title: this.title,
          content: this.content
        })
      } else {
        this.$('form .vf-invalid').get(0).focus()
      }
    }
  }
}
</script>
