<template>
  <div>
    <h1>My home</h1>
    <ul>
      <li v-for="(props, conta) in contas" :key="conta">
        {{props.Nome}}
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { app } from "../firebase";
import "firebase/database";
const db = app.database();
export default {
  name: "contas",
  data() {
    return {
      contas: null
    };
  },
  components: {},
  created() {
    const contas = db.ref("contas");
    contas.on("value", snapshot => {
      this.contas = snapshot.val();
    });
  }
};
</script>
