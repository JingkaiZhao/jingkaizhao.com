<template>
  <div class="basic-layout">
    <Header />
    <div class="layout-content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style lang="stylus" scoped>
.basic-layout
  min-height 100vh
  .layout-content
    min-height calc(100vh - 237px)
</style>

