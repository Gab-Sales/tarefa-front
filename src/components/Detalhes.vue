<template>
<router-link to="/"  style="text-decoration:none"><font size=4 color=green>Home</font></router-link>
  <div class="Threads">
    <table style="width:100%">
      <div v-for="(perc,index) in dados" :key="index">
      <tr align="left" >
        <th style="width:100%"><font size="4">{{perc.titulo}}<font size="2" style="vertical-align: top;">&nbsp;&nbsp;-{{perc.nome}}</font></font></th>
      </tr>
      <tr>
        <td colspan="2" align="left"><pre>{{perc.conteudo}}</pre></td>
      </tr>
      <tr>
        <td colspan="2" align="left"><font size="2">Created in {{perc.dataformatada}}</font></td>
        <td colspan="2" align="right" style="width:600px"><button v-on:click="deletarThread">Deletar</button></td>
      </tr>
      </div>
    </table>
    <hr>
    <div  align="left">
    <span><b>Replies</b></span>
    <table>
      <div v-for="(perc,index) in dadosrep" :key="index" >
       <tr>
         <th align="left">{{perc.nome}}:</th>
       </tr>
       <tr>
         <td align="left" style="width:700px">{{perc.resposta}}</td>
         <td ><input type="button" v-on:click="deletarThreadResp(perc.Codigo)" value="Deletar"></td>
       </tr>
       <tr>
         <td align="left" colspan="2" style="width:700px"><font size="2">Created in {{perc.dataformatada}}</font></td>
       </tr>
       <hr>
      </div>
    </table>
    </div>
    <table>
      <tr>
        <td v-for="(perc,index) in paginate" :key="index"><button v-on:click="mudarpagina(perc)">{{perc}}</button></td>
      </tr>
    </table>
    <br>

    <div align="left">
    <span><b>Reply:</b></span>
    <form @submit.prevent="salvar">
        <table style="width:100%">
          <tr>
            <td colspan="2" ><textarea required v-model="replies.resposta" class="tarea" placeholder="Here is a some text input.&#10;&#10;&#10;Here is another paragraph of input" ></textarea></td>
          </tr>
          <tr>
            <td width="50%"><input required type="text" placeholder="Your name:"  v-model="replies.nome"></td>
            <td><input type="submit" class="btn" value="Create"></td>
          </tr>

        </table>
    </form>
    </div>
  </div>

  <!-- <div>
    <input type="text" placeholder="Title:">
    <h1>esse é o param {{ $route.params.codigo }}</h1>
    <button @click="alerta">S</button>
  </div>
  nome:{{titulo}} -->
</template>

<script>
import axios from 'axios'
export default {
  name: 'Detalhes',
  data () {
    return {
      dados: {},
      dadosrep: [{}],
      replies: { thread: this.$route.params.codigo, resposta: '', nome: '' },
      delt: { cod: '' },
      paginate: {}
    }
  },
  methods: {
    salvar () {
      axios.post('https://tarefa-backend.herokuapp.com/ResponderThread', this.replies).then(res => {
        console.log(res)
        axios.get('https://tarefa-backend.herokuapp.com/RespostasThread/' + this.$route.params.codigo + '/1').then(res => {
          this.dadosrep = res.data[0].dados
          this.paginate = {}
          for (var i = 0; i < res.data[0].paginate; i++) {
            this.paginate[i] = i + 1
          }
        }).catch(error => console.log(error))
      }).catch(error => console.log(error))
    },
    deletarThread () {
      axios.delete('https://tarefa-backend.herokuapp.com/DeleteThread/' + this.$route.params.codigo).then(res => {
        console.log(res)
        this.$router.push('/')
      }).catch(error => console.log(error))
    },
    deletarThreadResp (par) {
      axios.delete('https://tarefa-backend.herokuapp.com/DeleteThreadResp/' + par).then(res => {
        console.log(res)
        axios.get('https://tarefa-backend.herokuapp.com/RespostasThread/' + this.$route.params.codigo + '/1').then(res => {
          this.dadosrep = res.data[0].dados
          this.paginate = {}
          for (var i = 0; i < res.data[0].paginate; i++) {
            this.paginate[i] = i + 1
          }
          console.log(this.paginate)
        }).catch(error => console.log(error))
      }).catch(error => console.log(error))
    },
    mudarpagina (par) {
      axios.get('https://tarefa-backend.herokuapp.com/RespostasThread/' + this.$route.params.codigo + '/' + par).then(res => {
        this.dadosrep = res.data[0].dados
        this.paginate = {}
        for (var i = 0; i < res.data[0].paginate; i++) {
          this.paginate[i] = i + 1
        }
        console.log(this.paginate)
      }).catch(error => console.log(error))
    }
  },
  created: function t () {
    axios.get('https://tarefa-backend.herokuapp.com/DetalharThread/' + this.$route.params.codigo).then(res => {
      this.dados = res.data
    }).catch(error => console.log(error))
    axios.get('https://tarefa-backend.herokuapp.com/RespostasThread/' + this.$route.params.codigo + '/1').then(res => {
      this.dadosrep = res.data[0].dados
      this.paginate = {}
      for (var i = 0; i < res.data[0].paginate; i++) {
        this.paginate[i] = i + 1
      }
      console.log(this.paginate)
    }).catch(error => console.log(error))
  }
}

</script>
<style scoped>
.Threads{
  border:1px solid black;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 50px 10px 50px ;
}
.tarea{
margin: 0px; width: 100%; height: 40px;
}
.btn{
width: 100%
}
.bord{
  padding: 10px;
 border-top: none;
 border-bottom: 1px solid black;
 border-top: none;
 border-top: none;
}
</style>
