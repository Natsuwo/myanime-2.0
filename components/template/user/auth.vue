<template>
  <v-dialog transition="slide-x-transition" v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon class="pr-2">mdi-account-plus</v-icon>Sign up
      </v-btn>
    </template>
    <v-form v-if="is_signIn" @keyup.native.enter="signInAction">
      <v-card v-show="show" width="800">
        <v-flex xs12 text-center>
          <v-card-title class="justify-center">Sign in</v-card-title>
          <v-card-text v-show="show">
            <v-text-field v-model="dataSI.email" filled label="Email or Username"></v-text-field>
            <v-text-field v-model="dataSI.password" filled label="Password" type="password"></v-text-field>
            <v-btn block outlined color="#8cc33c" @click="signInAction">
              <v-icon left>mdi-account</v-icon>Sign in
            </v-btn>
          </v-card-text>
          <h3>Do not have an account?</h3>
          <v-card-actions>
            <v-btn block color="orange" @click="is_signIn = false">
              <v-icon left>mdi-account-plus</v-icon>Sign up
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-card>
    </v-form>
    <v-form v-else @keyup.native.enter="signUpAction">
      <v-card width="800">
        <v-flex xs12 text-center>
          <v-card-title class="justify-center">Sign up</v-card-title>
          <v-card-text>
            <v-text-field v-model="dataSU.username" filled label="Username"></v-text-field>
            <v-text-field v-model="dataSU.email" filled label="Email"></v-text-field>
            <v-text-field v-model="dataSU.password" filled label="Password" type="password"></v-text-field>
            <v-text-field
              v-model="dataSU.password_confirm"
              filled
              label="Password comfirmation"
              type="password"
            ></v-text-field>
            <v-btn block outlined color="#8cc33c" @click="signUpAction">
              <v-icon left>mdi-account-plus</v-icon>Sign up now
            </v-btn>
          </v-card-text>
          <h3>Already have an account?</h3>
          <v-card-actions>
            <v-btn block color="primary" @click="is_signIn = true">
              <v-icon left>mdi-account</v-icon>Sign in
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { signUp, signIn } from "@/services/Auth";
export default {
  data() {
    return {
      dataSU: {},
      dataSI: {},
      is_signIn: true,
      dialog: false,
      show: true
    };
  },
  methods: {
    async signUpAction() {
      var messages = (await signUp(this.dataSU)).data;
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: messages
      });
      if (messages.success) {
        this.is_signIn = true;
      }
      return;
    },
    async signInAction() {
      var messages = (await signIn(this.dataSI)).data;
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: messages
      });
      if (messages.success) {
        this.dialog = false;
        var data = {
          isLogin: true,
          token: messages.access,
          user_id: messages.user.user_id
        };
        this.$store.commit("setAuth", data);
      }
      return;
    }
  },
  watch: {
    "$store.state.signIn"(val) {
      if (val) {
        this.dialog = true;
      }
    },
    dialog(val) {
      if (!val) {
        this.$store.commit("signIn", false);
      }
    }
  }
};
</script>
