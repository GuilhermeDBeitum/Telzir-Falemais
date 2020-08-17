<template>
  <v-container>
    <router-link style="color:black; text-decoration:none;" to="Simulador">
      <v-row align="center" justify="center">
        <h1 class="white--text font-weight-black my-4">COMEÇAR</h1>
        <v-img fixed botton max-width="600" src="..\assets\hand.png"></v-img>
      </v-row>
    </router-link>
  </v-container>
</template>

<script>
export default {
  name: "Intro",
  components: {},
};
</script>
