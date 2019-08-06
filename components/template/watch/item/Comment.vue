<template>
  <div>
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
    <v-layout class="player-before-comments pt-3" align-center>
      <div class="comments-count pr-3">{{total}} Comments</div>
      <div class="comments-sort pr-3">
        <v-btn text small>
          <v-icon>mdi-sort</v-icon>Sort
        </v-btn>
      </div>
    </v-layout>
    <v-layout v-if="loading" justify-center align-center row wrap>
      <v-progress-circular indeterminate></v-progress-circular>
    </v-layout>
    <v-layout v-else class="comment-input" row wrap pt-3>
      <v-avatar class="mr-4 pt-4 avatar-comment">
        <v-img src="https://i.imgur.com/N5SvkzK.jpg"></v-img>
      </v-avatar>
      <v-textarea
        v-model="comment"
        @click="showAction"
        rows="1"
        auto-grow
        placeholder="Push a publish comment..."
      ></v-textarea>
    </v-layout>
    <v-layout v-if="show" class="comment-actions">
      <v-flex class="text-right">
        <v-btn @click="closeAction" text>Cancel</v-btn>
        <v-btn @click="commentAction" :disabled="disabled" color="primary">Comment</v-btn>
      </v-flex>
    </v-layout>
    <v-flex class="comments-area" v-for="comment in comments" :key="comment.comment_id" my-4>
      <v-layout>
        <v-avatar class="comment-user avatar">
          <v-img src="https://i.imgur.com/N5SvkzK.jpg"></v-img>
        </v-avatar>
        <div class="comment-user px-2">
          <div class="comment-user name px-1">{{comment.user.username}}</div>
          <div class="comment-user time px-1">{{comment.created_at | moment("from", "now")}}</div>
          <div v-if="!comment.edit" class="comment-content px-1">{{comment.comment}}</div>
          <div v-else class="comment-user editmode">
            <v-textarea v-model="editContext" rows="1" auto-grow></v-textarea>
            <v-flex class="text-right">
              <v-btn @click="editMode(comment, false)" text>Cancel</v-btn>
              <v-btn @click="editAction(comment)" color="primary">Save</v-btn>
            </v-flex>
          </div>
          <CommentReply :comment="comment" />
        </div>
        <div class="comment-control">
          <v-menu transition="fade-transition" offset-y right>
            <template v-slot:activator="{ on }">
              <v-btn class="edit" v-on="on" small icon text>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-btn text block tile @click="editMode(comment, true)">
                <v-icon left>mdi-pencil</v-icon>Edit
              </v-btn>
              <v-btn text block tile @click="deleteAction(comment)">
                <v-icon left>mdi-delete</v-icon>Delete
              </v-btn>
            </v-list>
          </v-menu>
        </div>
      </v-layout>
    </v-flex>
  </div>
</template>
<script>
import CommentReply from "./CommentReply";
export default {
  components: {
    CommentReply
  },
  data() {
    return {
      show: false,
      disabled: true,
      snackbar: false,
      messages: [],
      loading: false,
      comment: "",
      editContext: ""
    };
  },
  computed: {
    comments() {
      var comments = this.$store.state.comment.comments.filter(el => {
        return !el.parent_id;
      });
      return comments;
    },
    total() {
      return this.$store.state.comment.total;
    }
  },
  methods: {
    showAction() {
      this.show = true;
    },
    closeAction() {
      this.show = false;
    },
    editMode(item, active) {
      var data = { item, active };
      if (active === true) {
        this.editContext = item.comment;
      }
      return this.$store.dispatch("comment/showEdit", data);
    },
    async commentAction() {
      this.loading = true;
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          episode_id: this.$route.query.a,
          user_id: this.$store.state.auth.user_id,
          comment: this.comment
        }
      };
      await this.$store.dispatch("comment/add", data);
      this.comment = "";
      this.closeAction();
      return (this.loading = false);
    },
    async editAction(item) {
      var index = this.comments.indexOf(item);
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          comment_id: item.comment_id,
          comment: this.editContext
        },
        index
      };
      return await this.$store.dispatch("comment/edit", data);
    },
    async deleteAction(item) {
      var index = this.comments.indexOf(item);
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          comment_id: item.comment_id,
          comment: this.editContext
        },
        index
      };
      var response = await this.$store.dispatch("comment/removeComment", data);
      this.snackbar = true;
      this.messages = response;
    }
  },
  watch: {
    comment(val) {
      if (val.length > 0) {
        return (this.disabled = false);
      }
      this.disabled = true;
    }
  }
};
</script>
<style scoped>
</style>
