<template>
  <transition name="fade">
    <div class="toast" v-show="show">{{text}}</div>
  </transition>
</template>

<script>
  export default {
    name: "toast"
  }
</script>

<style lang="stylus" scoped>
  .toast
    position: fixed;
    left: 50%;
    bottom: 15%;
    width fit-content
    z-index: 1000;
    background: rgba(0, 0, 0, .58);
    padding: 16px 26px;
    border-radius: 50px;
    transform: translateX(-50%);
    font-size: 16px;
    color: #fff;
    text-shadow: 0 0 2px #000;
    animation fadeIn .5s

  @keyframes fadeIn
    from
      opacity 0
    to
      opacity 1

  .fade-enter-active, .fade-leave-active
    transition all .7s
  .fade-enter, .fade-leave-to
    opacity 0
</style>