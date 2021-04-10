<template>
  <div class="Threads">
    <div class="titulo">
      <div align="right" style="margin-top:5%">
        <a href="/#/Thread" class="botao"><font size="3" color="black">New Thread</font></a>
      </div>
      <div align="left"><font size="4"><b>Forum</b></font></div>
    </div>
    <div class="threads" align="left">
      <table style="border-collapse: collapse;">
        <tr v-for="(perc,index) in dados" :key="index" >
          <th class="bord" width="50%" align="left"><router-link :to="{ name: 'Detalhes', params: {codigo: perc.codigo}}"><font color=grey>{{perc.titulo}}</font></router-link></th>
          <th class="bord" width="10%" align="center"><router-link :to="{ name: 'Detalhes', params: {codigo: perc.codigo}}"><font size=2>details</font></router-link></th>
          <th class="bord" width="10%" align="left"><router-link :to="{ name: 'Detalhes', params: {codigo: perc.codigo}}"><font size=2 color=black><b>{{perc.respostas}} replies</b></font></router-link></th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Threads',
  data () {
    return {
      dados: []
    }
  },
  created: function () {
    axios.get('https://tarefa-backend.herokuapp.com/listarthreads').then(res => {
      this.dados = res.data
      console.log(res)
    }).catch(error => console.log(error))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(92, 165, 230);
  text-decoration:none
}
.Threads{
  border:1px solid black;
  max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px 50px 10px 50px ;
}
.botao{
  padding: 5px;
  text-decoration: none;
  margin-top: 20px;
  background-color: #EEEEEE;
  color: #333333;
  border-top: 1px solid #CCCCCC;
  border-right: 1px solid #CCCCCC;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #CCCCCC;
  border-radius: 5px;
}
.titulo{
  margin-bottom: 10%;
}
.bord{
  padding: 10px;
 border-top: none;
 border-bottom: 1px solid black;
 border-top: none;
 border-top: none;
}
</style>
