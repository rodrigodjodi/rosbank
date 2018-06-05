<template>
  <div class="container">
    <p>Você não tem nenhuma conta.</p>
    <router-link tag="button" to="/novaconta">CRIE SUA PRIMEIRA CONTA</router-link>
    <ul>
      <li v-for="(props, conta) in contas" :key="conta">
        {{props.name}}
      </li>
    </ul>
    <p v-if="user">Usuário: {{user.displayName}}</p>
    <p v-if="user">Email: {{user.email}}</p>

  </div>
</template>

<script>
// @ is an alias to /src
import { db } from "../firebase";
import { mapState } from "vuex";
export default {
  name: "contas",
  data() {
    return {
      contas: null
    };
  },
  computed: {
    ...mapState(["user", "accountTypes"])
  },
  components: {},
  methods: {
    retrieveAccounts() {
      db.collection("contas").where("holder", "==", this.user.uid).onSnapshot(querySnapshot => {
        var contas = [];
        querySnapshot.forEach(function(doc) {
          contas.push(doc.data());
        });
        console.log("Numero de contas: " + contas.length );
        this.contas = contas;
      });
    }
  },
  created() {
    this.retrieveAccounts();
  }
};
</script>
