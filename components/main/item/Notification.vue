<template>
  <v-menu
    v-if="$vuetify.breakpoint.mdAndUp"
    transition="slide-x-transition"
    :close-on-content-click="false"
    offset-y
    bottom
    left
    :nudge-width="100"
    :nudge-bottom="10"
  >
    <template v-slot:activator="{ on }">
      <v-btn class="bell mr-4" @click="showCount = false" dark icon v-on="on">
        <v-badge v-model="showCount" color="red" right overlap>
          <template v-slot:badge>
            <span v-if="total() > 0">{{total()}}</span>
          </template>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card width="480" height="600">
      <v-toolbar color="#333" dark>
        <v-toolbar-title>Notifications</v-toolbar-title>
      </v-toolbar>
      <v-list three-line v-if="data.length > 0">
        <template v-for="(item, index) in data">
          <v-list-item class="notification" :key="index" @click="viewEp(item)">
            <v-list-item-avatar>
              <div :class="item.read ? '' : 'noti-new'"></div>
              <v-img :src="item.cover"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle v-html="item.message"></v-list-item-subtitle>
              <v-list-item-title class="message-title">{{getMoment(item.created_at)}}</v-list-item-title>
            </v-list-item-content>
            <v-img max-width="87" :src="item.thumbnail"></v-img>
          </v-list-item>
        </template>
      </v-list>
      <v-row class="no-noti" v-else justify="center" align="center">
        <v-icon class="no-bell" color="rgba(237, 237, 237, 0.05)" size="120px">mdi-bell</v-icon>
        <div class="no-message text-center">
          <div class="font-weight-bold">Your notifications live here</div>
          <div class="body-2 grey--text">{{noMess}}</div>
        </div>
      </v-row>
    </v-card>
  </v-menu>
</template>
<script>
import moment from "moment";
import { readNoti } from "@/services/User";
import { mapMutations } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      noMess:
        "Save anime(s) and put them your watch list to get notified about new upload episodes.",
      showCount: true,
      headers: {
        "X-User-Session": this.$store.state.auth.userToken
      }
    };
  },
  methods: {
    ...mapMutations("auth", ["readNoti"]),
    getMoment(time) {
      var action = new Date(time);
      return moment(action).fromNow();
    },
    async viewEp(item) {
      var data = this.data;
      var index = data.indexOf(item);
      if (index > -1) {
        var result = data[index];
        if (!result.read) {
          var episode_id = result.episode_id;
          var resp = await readNoti(this.headers, { episode_id });
          if (resp.data.success) {
            this.readNoti(index);
          }
        }
      }
      return this.$router.push({ path: "/watch?a=" + item.episode_id });
    },
    total() {
      var data = this.data;
      var result = data.filter(x => x.read === false);
      return result.length;
    }
  }
};
</script>
<style scoped>
.noti-new {
  width: 4px;
  height: 4px;
  border-radius: 2px;
  margin: 22px 6px 0 6px;
  position: absolute;
  bottom: 20px;
  left: -15px;
  background-color: #babace;
}
.notification:hover {
  background: #5c5959;
  cursor: pointer;
}
.message-title {
  color: #aaa;
  font-size: 12px;
}
.bell.v-size--default {
  height: 36px !important;
  width: 36px !important;
}
.no-noti {
  height: 80%;
}
.no-message {
  bottom: 140px;
  width: 280px;
  position: absolute;
}
.no-bell {
  position: relative;
}
</style>