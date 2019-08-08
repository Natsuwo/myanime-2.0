<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    bottom
    left
    :color="message.success ? 'green' : 'red'"
  >
    <span>{{message.success ? message.message : message.error}}</span>
    <v-btn text @click="snackbar = false" color="white">Close</v-btn>
  </v-snackbar>
</template>
<script>
export default {
  data() {
    return {
      snackbar: false,
      message: []
    };
  },
  watch: {
    "$store.state.snackbar.active"(val) {
      this.snackbar = val;
      this.message = this.$store.state.snackbar.message;
    },
    snackbar(val) {
      if (!val)
        return this.$store.commit("snackbar/snackBar", {
          active: false,
          message: ""
        });
    }
  }
};
</script>
