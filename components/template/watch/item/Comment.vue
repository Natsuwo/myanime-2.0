<template>
  <div>
    <v-layout class="player-before-comments pt-3" align-center v-scroll="onScroll">
      <div class="comments-count pr-3">{{total}} Comments</div>
      <div class="comments-sort pr-3">
        <v-btn text small>
          <v-icon>mdi-sort</v-icon>Sort
        </v-btn>
      </div>
    </v-layout>
    <v-layout v-if="!$store.state.auth.isLogin" class="not-sign-in">
      <v-flex text-center>
        Sign in to post a comment!
        <v-btn color="primary" @click="signIn">Sign in</v-btn>
      </v-flex>
    </v-layout>
    <div class="signed-in" v-else>
      <v-layout v-if="loading || firstLoad" justify-center align-center row wrap>
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
          placeholder="Post a publish comment..."
        ></v-textarea>
      </v-layout>
      <v-layout v-if="show" class="comment-actions">
        <v-flex class="text-right">
          <v-btn @click="closeAction" text>Cancel</v-btn>
          <v-btn @click="commentAction" :disabled="disabled" color="primary">Comment</v-btn>
        </v-flex>
      </v-layout>
    </div>
    <v-flex v-for="comment in comments" :key="comment.comment_id" my-4>
      <v-layout column>
        <div class="main-comment">
          <v-avatar class="comment-user avatar">
            <v-img src="https://i.imgur.com/N5SvkzK.jpg"></v-img>
          </v-avatar>
          <div class="comment-user px-2">
            <div class="comment-user name px-1">{{comment.user.username}}</div>
            <div class="comment-user time px-1">{{comment.created_at | moment("from", "now")}}</div>
            <div v-if="!comment.edit" class="comment-content px-1" v-text="comment.comment"></div>
            <div v-else class="comment-user editmode">
              <v-textarea v-model="editContext" rows="1" auto-grow></v-textarea>
              <v-flex class="text-right">
                <v-btn @click="editMode(comment, false)" text>Cancel</v-btn>
                <v-btn @click="editAction(comment)" color="primary">Save</v-btn>
              </v-flex>
            </div>
            <div class="comment-user comment-actions pt-2">
              <div class="heart">
                <v-btn
                  :class="isHeart(comment.comment_id) ? 'heart-count': ''"
                  @click="attachHeart(comment, isHeart(comment.comment_id) ? true : false)"
                  x-small
                  icon
                  text
                >
                  <v-icon>mdi-heart</v-icon>
                  <span v-if="comment.hearts > 0">{{comment.hearts}}</span>
                </v-btn>
              </div>
              <v-btn small text @click="showReply(comment.comment_id)">Reply</v-btn>
            </div>
          </div>
          <div class="comment-control" v-if="validControl(comment.user_id)">
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
        </div>
        <CommentReply :comment="comment" />
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
      comment: "",
      editContext: "",
      scrolled: false,
      loading: false
    };
  },
  computed: {
    firstLoad() {
      return this.$store.state.comment.loading;
    },
    comments() {
      var comments = this.$store.state.comment.comments.filter(el => {
        return !el.parent_id;
      });
      return comments;
    },
    usermeta() {
      return this.$store.state.auth.usermeta;
    },
    heart() {
      var index = this.usermeta.findIndex(x => x.meta_key === "heart");
      if (index >= 0) {
        return this.usermeta[index].meta_value;
      }
    },
    replyId() {
      return this.$store.state.comment.replyId;
    },
    total() {
      return this.$store.state.comment.total;
    }
  },
  methods: {
    isHeart(id) {
      if (!this.heart) return false;
      if (this.heart.find(x => x === id)) {
        return true;
      }
      return false;
    },
    attachHeart(item, val) {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true);
      }
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          episode_id: item.episode_id,
          comment_id: item.comment_id,
          user_id: this.$store.state.auth.user_id,
          isHeart: false
        },
        item
      };
      if (val) {
        return this.$store.dispatch("comment/unHeart", data);
      }
      data.form.isHeart = true;
      return this.$store.dispatch("comment/attachHeart", data);
    },
    onScroll(e) {
      if (window.scrollY > 200) {
        return (this.scrolled = true);
      }
    },
    validControl(user_id) {
      return (
        this.$store.state.auth.isLogin &&
        user_id === this.$store.state.auth.user_id
      );
    },
    showReply(id) {
      if (!this.$store.state.auth.isLogin) {
        return this.$store.commit("dialog/signIn", true);
      }
      return this.$store.commit("comment/replyId", id);
    },
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
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          comment_id: item.comment_id,
          episode_id: this.$route.query.a,
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
          episode_id: this.$route.query.a,
          comment: this.editContext
        },
        item
      };
      return await this.$store.dispatch("comment/removeComment", data);
    },
    signIn() {
      this.$store.commit("signIn", true);
      return this.$store.commit("dialog/signIn", false);
    }
  },
  watch: {
    comment(val) {
      if (val.length > 0) {
        return (this.disabled = false);
      }
      this.disabled = true;
    },
    async firstLoad(val) {
      if (!val) {
        var headers = {
          "X-User-Session": this.$store.state.auth.userToken
        };
        var episode_id = this.$route.query.a;
        return await this.$store.dispatch("comment/get", { headers, episode_id });
      }
      return this.scrolled = false
    },
    scrolled(val) {
      if (val) {
        return this.$store.commit("comment/loading", false);
      }
    }
  }
};
</script>