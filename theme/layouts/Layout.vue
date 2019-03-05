<template>
  <BasicLayout>
    <h1 class="big-title">Blog</h1>
    <PostList :posts="$pagination.posts" />
  </BasicLayout>
</template>

<script>
export default {
  mounted() {
    console.log(this)
  }
}
</script>


<style src="../styles/prismjs-bluloco.styl" lang="stylus"></style>
<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>
.big-title
  text-align center
  font-size 2.25rem
  font-weight 600
  margin-top 35px
</style>


