<template>
  <div>
    <div class="post-container" :key="post.key" v-for="post in posts">
      <div class="post">
        <aside>
          <div class="date">
            <span>{{ post.frontmatter.date }}</span>
          </div>
          <a class="title" href="/blog/announcing-transfer-in-for-domains">{{ post.title }}</a>
          <div class="authors">
            <div class="author">
              <span>
                <div class="avatar">
                  <img
                    src="https://zeit.co/api/www/avatar/12ad8fec211e158281961e2104e8d54d99dfdcf0?s=160"
                    style="height: 30px; width: 30px;"
                  >
                </div>
              </span>
              <div class="name">
                jkzing (<a href="https://github.com/jkzing" target="_blank" rel="noopener noreferrer">@jkzing</a>)
              </div>
            </div>
          </div>
        </aside>
        <div class="wrapper">
          <div>
            Today, we are excited to announce a significant improvement to Now's developer experience:
            the ability to
            <code>transfer-in</code> domains. With the latest release of
            <code>now</code> (v13.2.0), you are able
            to bring your own domain.
          </div>
        </div>
        <p class="more">
          <a href="/blog/announcing-transfer-in-for-domains">Read more</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>


<style lang="stylus" scoped>
$border-color = rgb(234, 234, 234)
$font = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

.post-container
  border-bottom 1px solid $border-color
  padding 50px 0 40px
  transition background 200ms ease 0s
  &:first-of-type
    border-top 1px solid $border-color
  &:hover
    background rgb(250, 250, 250)

.post
  max-width 650px
  margin auto

  .date
    margin-top 0
    color rgb(153, 153, 153)
    font-size 0.75rem
    font-family $font

  .title
    display block
    text-decoration none
    color rgb(0, 0, 0)
    font-size 1.5rem
    font-family $font
    margin-top 20px
    margin-bottom 0px
    text-align left
    font-weight 400

  .authors
    margin-top 20px
    .author
      display inline-flex
      margin-right 30px
      margin-bottom 10px
      > span
        border-radius 50%
        display inline-block
        overflow hidden
        border 1px solid #eee
        line-height 0
        vertical-align top
        -webkit-mask-image -webkit-radial-gradient(circle,white,black)
      .avatar
        position relative
        overflow hidden
        display flex
        flex-direction column
        justify-content center
        align-items center
        height 30px
        width 30px
    .name
      display inline-block
      vertical-align top
      color rgb(0, 0, 0)
      font-size 0.75rem
      font-family $font
      margin-top 8px
      margin-left 10px
      > a
        text-decoration none
        color #067df7
        font-size inherit
        font-weight 400

  .wrapper
    word-break break-word
    margin 15px 0px
    color #000
    > div
      font-weight 400
      font-size 0.875rem
      line-height 24px

  .more
    font-size 0.75rem
    > a
      color rgb(0, 0, 0)
      text-transform uppercase
      text-decoration underline


</style>

