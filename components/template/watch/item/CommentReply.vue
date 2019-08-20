<template>
  <div class="reply-area">
    <v-snackbar
      left
      bottom
      v-model="snackbar"
      :timeout="4000"
      :color="messages.success ? 'green' : 'red'"
    >
      <span>{{messages.success ? messages.message : messages.error}}</span>
      <v-btn text @click="snackbar = false" color="white">Close</v-btn>
    </v-snackbar>
    <div
      v-if="reply(comment.comment_id).length > 0"
      class="click-to-show-reply px-1"
      @click="viewReplies(comment)"
    >
      {{comment.show ? 'Hide' : 'Show'}} {{reply(comment.comment_id).length > 1 ? `${reply(comment.comment_id).length} replies` : 'reply'}}
      <v-icon>mdi-menu-{{comment.show ? 'up' : 'down'}}</v-icon>
    </div>
    <div class="reply-user add-reply" v-if="replyId === comment.comment_id">
      <v-textarea v-model="replyContext" rows="1" auto-grow placeholder="Add reply..."></v-textarea>
      <div class="comment-actions text-right">
        <v-btn small @click="closeReplyAction" text>Cancel</v-btn>
        <v-btn small @click="replyAction(comment)" :disabled="disabledReply" color="primary">Comment</v-btn>
      </div>
    </div>
    <template v-if="comment.show">
      <div
        class="reply-comment py-1"
        v-for="item in reply(comment.comment_id)"
        :key="item.comment_id"
      >
        <v-avatar size="35px" class="reply-user avatar">
          <v-img :src="item.user.avatar"></v-img>
        </v-avatar>
        <div class="reply-user px-2">
          <div class="reply-user name px-1">{{item.user.username}}</div>
          <div class="reply-user time">{{item.created_at | moment("from", "now")}}</div>
          <div v-if="!item.edit" class="comment-content px-1">{{item.comment}}</div>
          <div v-else class="reply-user editmode">
            <v-textarea v-model="editContext" rows="1" auto-grow></v-textarea>
            <v-flex class="text-right">
              <v-btn @click="editMode(item, false)" text>Cancel</v-btn>
              <v-btn @click="editAction(item)" color="primary">Save</v-btn>
            </v-flex>
          </div>
        </div>
        <div class="comment-control">
          <v-menu transition="fade-transition" offset-y right>
            <template v-slot:activator="{ on }">
              <v-btn class="edit" v-on="on" small icon text>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-btn text block tile @click="editMode(item, true)">
                <v-icon left>mdi-pencil</v-icon>Edit
              </v-btn>
              <v-btn text block tile @click="deleteAction(item)">
                <v-icon left>mdi-delete</v-icon>Delete
              </v-btn>
            </v-list>
          </v-menu>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      replyContext: "",
      snackbar: false,
      messages: [],
      disabledReply: true
    };
  },
  props: ["comment"],
  computed: {
    replyId() {
      return this.$store.state.comment.replyId;
    },
    replies() {
      var replies = this.$store.state.comment.comments.filter(el => {
        return el.parent_id;
      });
      return replies;
    }
  },
  methods: {
    reply(id) {
      var reply = this.replies.filter(item => {
        return item.parent_id === id;
      });
      return reply;
    },
    viewReplies(item) {
      return this.$store.dispatch("comment/show", item);
    },
    closeReplyAction() {
      return this.$store.commit("comment/replyId", null);
    },
    editMode(item, active) {
      var data = { item, active };
      if (active === true) {
        this.editContext = item.comment;
      }
      return this.$store.dispatch("comment/showEdit", data);
    },
    async editAction(item) {
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          comment_id: item.comment_id,
          comment: this.editContext
        },
        item
      };
      return await this.$store.dispatch("comment/edit", data);
    },
    async deleteAction(item) {
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          comment_id: item.comment_id,
          comment: this.editContext
        },
        item
      };
      var response = await this.$store.dispatch("comment/removeComment", data);
      this.snackbar = true;
      this.messages = response;
    },
    async replyAction(comment) {
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          episode_id: this.$route.query.a,
          user_id: this.$store.state.auth.profile.user_id,
          parent_id: comment.comment_id,
          comment: this.replyContext
        },
        item: comment
      };
      await this.$store.dispatch("comment/reply", data);
      this.replyContext = "";
      return this.$store.commit("comment/replyId", null);
    }
  },
  watch: {
    replyContext(val) {
      if (val.length > 0) {
        return (this.disabledReply = false);
      }
      this.disabledReply = true;
    }
  }
};
</script>