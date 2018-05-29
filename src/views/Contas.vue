<template>
  <div class="container">
    
    <ul>
      <li v-for="(props, conta) in contas" :key="conta">
        {{props.Nome}}
      </li>
    </ul>
    <p v-if="$store.state.user">Usuário: {{$store.state.user.displayName}}</p>

  </div>
</template>

<script>
// @ is an alias to /src
import { db } from "../firebase";

export default {
  name: "contas",
  data() {
    return {
      contas: null
    };
  },
  components: {},
  methods: {},
  created() {
    db.ref("contas").on("value", snapshot => {
      this.contas = snapshot.val();
    });
  }
};
</script>
