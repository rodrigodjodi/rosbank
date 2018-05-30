<template>
  <div class="container">
    
    <ul>
      <li v-for="(props, conta) in contas" :key="conta">
        {{props.Nome}}
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
    ...mapState(["user"])
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
