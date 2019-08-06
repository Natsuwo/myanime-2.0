<template>
  <v-layout column wrap>
    <div class="comment-user comment-actions">
      <v-btn x-small icon text>
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>
      <v-btn x-small icon text>
        <v-icon>mdi-thumb-down</v-icon>
      </v-btn>
      <v-btn small text @click="showReply(comment.comment_id)">Reply</v-btn>
      <div
        v-if="reply(comment.comment_id).length > 0"
        class="click-to-show-reply px-1"
        @click="viewReplies(comment)"
      >
        {{comment.show ? 'Hide' : 'Show'}} {{reply(comment.comment_id).length > 1 ? `${reply(comment.comment_id).length} replies` : 'reply'}}
        <v-icon>mdi-menu-{{comment.show ? 'up' : 'down'}}</v-icon>
      </div>
      <div class="comment-user add-reply" v-if="replyId === comment.comment_id">
        <v-textarea v-model="replyContext" rows="1" auto-grow placeholder="Add reply..."></v-textarea>
        <div class="comment-actions text-right">
          <v-btn small @click="closeReplyAction" text>Cancel</v-btn>
          <v-btn
            small
            @click="replyAction(comment)"
            :disabled="disabledReply"
            color="primary"
          >Comment</v-btn>
        </div>
      </div>
    </div>
    <template v-if="comment.show">
      <v-flex class="reply" v-for="item in reply(comment.comment_id)" :key="item.comment_id">
        <v-avatar size="30px" class="reply-user avatar">
          <v-img src="https://i.imgur.com/N5SvkzK.jpg"></v-img>
        </v-avatar>
        <div class="reply-user px-1">
          <div class="reply-user name">{{item.user.username}}</div>
          <div class="reply-user time">{{item.created_at | moment("from", "now")}}</div>
          <div class="comment-content">{{item.comment}}</div>
          <div class="reply-user comment-actions">
            <v-btn x-small icon text>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn x-small icon text>
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>
    </template>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      replyContext: "",
      replyId: null,
      disabledReply: true
    };
  },
  props: ["comment"],
  computed: {
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
    showReply(id) {
      this.replyId = id;
    },
    closeReplyAction() {
      this.replyId = null;
    },
    async replyAction(comment) {
      var data = {
        headers: {
          "X-User-Session": this.$store.state.auth.userToken
        },
        form: {
          episode_id: this.$route.query.a,
          user_id: this.$store.state.auth.user_id,
          parent_id: comment.comment_id,
          comment: this.replyContext
        },
        item: comment
      };
      await this.$store.dispatch("comment/reply", data);
      this.replyContext = "";
      this.replyId = null;
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
