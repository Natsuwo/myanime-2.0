<template>
  <v-flex xs9>
    <v-container>
      <v-layout wrap>
        <v-card width="100%" class="mx-auto">
          <v-layout wrap>
            <v-flex xs12>
              <v-list-item-content>
                <v-card-actions @click="isEdit = !isEdit" v-if="!isEdit">
                  <v-row align="center" justify="end">
                    <v-btn>Edit</v-btn>
                  </v-row>
                </v-card-actions>
              </v-list-item-content>
              <v-row align="center" justify="center">
                <v-avatar size="250" fill-height>
                  <v-img :src="avatarUrl"></v-img>
                  <div v-if="isEdit" class="user-avatar-edit" @click="pickFile">
                    <v-icon large>mdi-image-plus</v-icon>
                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      @change="onFilePicked"
                    />
                  </div>
                </v-avatar>
              </v-row>
              <v-list-item v-if="isEdit">
                <v-row align="center" justify="center">
                  <v-col cols="12" xs="12" md="8">
                    <v-form ref="form" v-model="valid">
                      <v-text-field
                        type="password"
                        v-model="cur_pass"
                        filled
                        label="Current Password"
                      ></v-text-field>
                      <v-text-field
                        :rules="passwordRules"
                        type="password"
                        v-model="new_pass"
                        filled
                        label="New Password"
                      ></v-text-field>
                    </v-form>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="isEdit = !isEdit">Cancel</v-btn>
                      <v-btn @click="updateProfile" color="primary">Save</v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-list-item>
              <v-list-item v-else>
                <v-list-item-content class="text-center">
                  <v-list-item-title class="headline">{{profile.username}}</v-list-item-title>
                  <v-list-item-subtitle>{{rank}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-container>
  </v-flex>
</template>
<script>
import Rank from "@/items/rank.json";
import setting from "@/items/settings.json";
import { updateProfile } from "@/services/User";
export default {
  middleware: "auth",
  layout: "profile",
  head() {
    return {
      titleTemplate: "%s - " + setting.site_title,
      title: "My profile"
    };
  },
  computed: {
    profile() {
      return this.$store.state.auth.profile;
    },
    rank() {
      return Rank.filter(x => x.id === this.profile.rank)[0].name;
    }
  },
  data() {
    return {
      avatarUrl: "",
      avatarFile: "",
      isEdit: false,
      cur_pass: "",
      new_pass: "",
      valid: true,
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          !v ||
          v.length >= 8 ||
          "Password must be greater than 8 character or more.",
        v => /.+[a-z]/.test(v) || "Password must be have a lowercase.",
        v => /.+\d/.test(v) || "Password must be have a number.",
        v => /.+[A-Z]/.test(v) || "Password must be have a uppercase."
      ]
    };
  },
  created() {
    this.avatarUrl = this.profile.avatar || "/default-avatar.png";
  },
  methods: {
    async updateProfile() {
      if (this.cur_pass && !this.$refs.form.validate()) return;
      var headers = {
        "X-User-Session": this.$store.state.auth.userToken
      };
      var formData = new FormData();
      formData.append("user_id", this.profile.user_id);
      formData.append("cur_pass", this.cur_pass);
      formData.append("new_pass", this.new_pass);
      formData.append(
        "avatar",
        this.avatarFile ? this.avatarFile : this.profile.avatar
      );
      var response = await updateProfile(headers, formData).catch(err => {
        this.$store.commit("snackbar/snackBar", {
          active: true,
          message: err.response.data
        });
      });
      this.$store.commit("snackbar/snackBar", {
        active: true,
        message: response.data
      });
      this.$store.commit("auth/updateAvatar", response.data.avatar);
      if (response.data.success) return this.isEdit != this.isEdit;
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.avatarUrl = fr.result;
          this.avatarFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.avatarFile = "";
        this.avatarUrl = this.profile.avatar;
      }
    }
  }
};
</script>
<style scoped>
.user-avatar-edit {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
</style>