<template>
  <v-dialog transition="slide-x-reverse-transition" v-model="dialog" width="500">
    <v-card>
      <v-card-title class="headline red lighten-1" primary-title>Sign in required!</v-card-title>
      <v-card-text class="pt-3">You must sign in to perform this action.</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="signIn">Sign In</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  watch: {
    "$store.state.dialog.signIn"(val) {
      return (this.dialog = val);
    },
    dialog(val) {
      if (!val) return this.$store.commit("dialog/signIn", false);
    }
  },
  methods: {
    signIn() {
      this.$store.commit("signIn", true);
      return this.$store.commit("dialog/signIn", false);
    }
  }
};
</script>
