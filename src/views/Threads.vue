<template>
  <div class="home">
    <Threads/>
  </div>
</template>

<script>

import Threads from '@/components/ListarThreads.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    Threads
  },
  created: function () {
    axios.get('https://tarefa-backend.herokuapp.com/listarthreads').then(res => {
      console.log(res)
    }).catch(console.log('Erro'))
  }
}
</script>
