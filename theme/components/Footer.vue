<template>
  <footer>
    <div class="wrapper">
      <div class="left"><strong>JKZING</strong></div>
      <div class="right">
        <span class="contact">
          <ul class="social">
            <li>
              <a href="https://github.com/jkzing/" target="_blank" aria-label="GitHub" class="github">
                <svg viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill-rule="evenodd" clip-rule="evenodd" fill="#000" d="M32,0.8c-17.7,0-32,14.3-32,32c0,14.1,9.2,26.1,21.9,30.4 c1.6,0.3,2.2-0.7,2.2-1.5c0-0.8,0-2.8,0-5.4c-8.9,1.9-10.8-4.3-10.8-4.3c-1.5-3.7-3.6-4.7-3.6-4.7c-2.9-2,0.2-1.9,0.2-1.9 c3.2,0.2,4.9,3.3,4.9,3.3c2.9,4.9,7.5,3.5,9.3,2.7c0.3-2.1,1.1-3.5,2-4.3c-7.1-0.8-14.6-3.6-14.6-15.8c0-3.5,1.2-6.3,3.3-8.6 c-0.3-0.8-1.4-4.1,0.3-8.5c0,0,2.7-0.9,8.8,3.3c2.6-0.7,5.3-1.1,8-1.1c2.7,0,5.5,0.4,8,1.1c6.1-4.1,8.8-3.3,8.8-3.3 c1.7,4.4,0.6,7.7,0.3,8.5c2.1,2.2,3.3,5.1,3.3,8.6c0,12.3-7.5,15-14.6,15.8c1.1,1,2.2,2.9,2.2,5.9c0,4.3,0,7.7,0,8.8 c0,0.9,0.6,1.9,2.2,1.5C54.8,58.9,64,46.9,64,32.8C64,15.1,49.7,0.8,32,0.8z"></path>
                  </g>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/jkzing" target="_blank" aria-label="Twitter" class="bird">
                <svg viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 1.029L9.969 2.058v.171c0 .188-.03.368-.075.542-.024 1.415-.475 3.292-2.332 4.773C3.913 10.458 0 7.887 0 7.887c3.094 0 3.094-1.029 3.094-1.029-.688 0-2.063-1.371-2.063-1.371.344.342 1.032 0 1.032 0C.343 4.458.343 3.429.343 3.429c.344.343 1.032 0 1.032 0C-.344 2.058.687.343.687.343c.344 1.715 4.813 2.4 4.813 2.4l.057-.028a4.056 4.056 0 0 1-.057-.657C5.5.827 6.5 0 7.734 0c.68 0 1.28.309 1.69.786l.201-.1L10.656 0 9.97 1.372 11 1.029z" fill="#000" fill-rule="evenodd"></path>
                </svg>
              </a>
            </li>
          </ul>
        </span>
        <span class="copyright">
          <span>Copyright</span>
           © 2019 jkzing. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
</template>

<style lang="stylus" scoped>
footer
  background #fafafa
  border-top 1px solid #eaeaea

  .wrapper
    display flex
    vertical-align top
    justify-content center
    padding 50px 30px
    width 1060px
    max-width 100%
    margin auto

    .left
      flex-grow 0
      flex-shrink 0

    .right
      flex-grow 1
      text-align right

.social
  margin 0
  padding 0
  list-style none
  display inline-flex
  vertical-align middle

  li
    margin-right 15px
    border-right 1px solid #eaeaea
    height 20px
    line-height 21px
    padding-right 15px

    a
      opacity 0.4
      transition opacity 300ms

  .github
    display inline-block
    width 18px
    height 18px

  .bird
    display inline-block
    width 18px
    height 18px
    padding-top 1px

.copyright
  text-align right
  font-size 0.875rem
  color #999


</style>

