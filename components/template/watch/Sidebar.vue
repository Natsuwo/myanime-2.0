<template>
  <div class="player-sidebar">
    <div class="player-sidebar-thumbnail">
      <v-img width="168px" src="https://www.myanime.co/file/cache/Ksu4I29-320x180.png"></v-img>
    </div>
    <div class="player-sidebar-right-content column">
      <div class="player-sidebar-title">Steins;Gate Movie: Steins;Gate Movie: Steins;Gate Movie: Steins;Gate Movie:</div>
      <div class="player-sidebar-fansub-name">Horriblesubs</div>
      <div class="player-sidebar-views">12K views</div>
    </div>
  </div>
  <!-- <div>
    <div class="brick-job__job">
      <a
        target="_blank"
        href="https://joblist.app/j/helloprint-vue-js-developer?ref=madewithvuejs.com"
        class="brick-job__job-image"
        style="background-image: url(&quot;https://joblist.app/storage/190/helloprint.jpg&quot;);"
      >Company Logo of Helloprint</a>
      <div class="brick-job__job-caption">
        <a
          target="_blank"
          href="https://joblist.app/j/helloprint-vue-js-developer?ref=madewithvuejs.com"
          class="brick-job__job-position"
        >Vue JS Developer</a>
        <div class="brick-job__job-meta">
          <strong>Helloprint</strong>

          /
          Rotterdam, Netherlands
        </div>
      </div>
    </div>
  </div>-->
</template>
<script>
export default {};
</script>
<style scoped>
.player-sidebar {
  display: -moz-flex;
  display: flex;
  -moz-flex-direction: row;
  flex-direction: row;
}
.player-sidebar-right-content {
  padding-left: 8px;
}
.player-sidebar-thumbnail {
  margin-right: 8px;
}
.player-sidebar-right-content.column {
  flex-direction: column;
}
.player-sidebar-right-content {
  overflow: hidden;
}
.player-sidebar-title {
  margin: 0 0 4px 0;
  display: -webkit-box;
  max-height: 3.2rem;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}
.player-sidebar-fansub-name,
.player-sidebar-views {
  color: #aaa;
}
</style>
