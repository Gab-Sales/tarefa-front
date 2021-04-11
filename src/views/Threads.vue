<template>
  <div class="home">
    <Threads/>
  </div>
</template>

<script>

import Threads from '@/components/ListarThreads.vue'
export default {
  name: 'Home',
  components: {
    Threads
  }
}
</script>
