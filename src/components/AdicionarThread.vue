<template>
<router-link to="/"  style="text-decoration:none"><font size=4 color=green>Home</font></router-link>
  <div class="Thread">
    <div class="titulo">
      <div align="left">
        <span><font size="4"><b>New Thread</b></font></span>
        <br>
        <br>
        <form @submit.prevent="salvar">
        <table>
          <tr>
            <td><input type="text" placeholder="Title:" v-model="dados.titulo"></td>
          </tr>
          <tr>
            <td colspan="2"><textarea  v-model="dados.conteudo" class="tarea" placeholder="Here is a some text input.&#10;&#10;&#10;Here is another paragraph of input" ></textarea></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Your name:"  v-model="dados.nome"></td>
            <td><input type="submit" class="btn" value="Create"></td>
          </tr>

        </table>
         </form>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Threads',
  data () {
    return {
      dados: { titulo: '', conteudo: '', nome: '' }
    }
  },
  methods: {
    salvar () {
      axios.post('https://tarefa-backend.herokuapp.com/CriarThread', this.dados).then(res => {
        console.log(res)
        this.$router.push('/')
      }).catch(error => console.log(error))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Thread{
  border:1px solid black;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 50px 10px 50px ;
}
.tarea{
margin: 0px; width: 339px; height: 175px;
}
.btn{
  width: 165px
}
.titulo{
  margin-bottom: 40px;
}

</style>
