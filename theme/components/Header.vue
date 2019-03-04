<template>
  <header>
    <div class="nav">
      <a>BLOG</a>
    </div>
    <div class="profile">
      <span class="avatar">
        <img alt="jkzing" src="https://zeit.co/api/www/avatar/12ad8fec211e158281961e2104e8d54d99dfdcf0?s=60" title="jkzing">
      </span>
    </div>
  </header>
</template>

<style lang="stylus" scoped>
$inactive = #999
$active = #000
header
  display flex
  justify-content space-between
  align-items center
  height 80px
  width 1040px
  max-width 100%
  padding 0 20px
  margin auto
  position relative

.nav
  height 30px
  text-transform uppercase

  a
    font-size 1rem
    color $active
    font-weight normal


.profile
  .avatar
    border-radius 100%
    display inline-block
    overflow hidden
    border 1px solid #eee
    line-height 0
    vertical-align top
    -webkit-mask-image -webkit-radial-gradient(circle,white,black);

    img
      width 30px
      height 30px


</style>

