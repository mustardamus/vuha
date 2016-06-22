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

    <div class="columns">
      <div class="column is-one-quarter">
        <label class="label" for="excerpt">Excerpt</label>
        <p class="control">
          <textarea id="excerpt" name="excerpt" placeholder="Short excerpt what the post is about"
            class="textarea" v-model="excerpt"
          ></textarea>
        </p>
      </div>

      <div class="column is-three-quarter">
        <label class="label" for="markdown">Content</label>
        <p class="control">
          <textarea id="markdown" name="markdown" placeholder="Content formatted in Markdown"
            :class="{ textarea: true, 'is-danger': validation.markdown.$invalid && validation.$submitted }"
            v-form-ctrl required v-model="markdown"
          ></textarea>

          <span class="help is-danger" v-if="validation.markdown.$invalid && validation.$submitted">
            Content is required
          </span>
        </p>
      </div>
    </div>

    <p class="control">
      <button class="button is-primary" type="submit">{{buttonText}}</button>
    </p>
  </form>
</template>

<script>
export default {
  props: {
    title: String,
    excerpt: String,
    markdown: String,
    buttonText: String
  },

  data () {
    return {
      validation: null
    }
  },

  ready () {
    this.$('form input').get(0).focus()
  },

  methods: {
    onSubmit () {
      if (this.validation.$valid) {
        this.$emit('data', {
          title: this.title,
          excerpt: this.excerpt,
          markdown: this.markdown
        })
      } else {
        this.$('form .vf-invalid').get(0).focus()
      }
    }
  }
}
</script>
