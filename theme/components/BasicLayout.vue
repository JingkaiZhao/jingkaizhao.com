<template>
  <div class="basic-layout">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style lang="stylus" scoped>
.basic-layout
  min-height 100vh
</style>

