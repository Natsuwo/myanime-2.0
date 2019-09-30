<template>
  <v-layout wrap v-if="!closed">
    <v-card class="mt-4 mb-2 mx-auto" color="black" max-width="300">
      <v-card-actions>
        <div>Ad</div>
        <div class="flex-grow-1"></div>
        <v-btn outlined @click="closed = true">Close Ad</v-btn>
      </v-card-actions>
      <client-only>
        <div class="unit__container">
          <div class="unit__block px-2 py-2">
            <span>We are supported primarily by advertisements. We hope you will disable Adblock on our site, thank you.</span>
          </div>
          <script data-cfasync="false" type="text/javascript">
  if (!window.BB_a) {
    BB_a = [];
  }
  if (!window.BB_ind) {
    BB_ind = 0;
  }
  if (!window.BB_r) {
    BB_r = Math.floor(Math.random() * 1000000000);
  }
  BB_ind++;
  BB_a.push({ pl: 43699, index: BB_ind });
          </script>
          <script data-cfasync="false" type="text/javascript" src="//st.bebi.com/bebi_v3.js"></script>
        </div>
      </client-only>
    </v-card>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      closed: false
    };
  }
};
</script>
<style scoped>
.unit__container {
  position: relative;
  min-width: 300px;
  min-height: 60px;
  color: #eee;
  font-size: 12px;
  overflow: hidden;
}
.unit__container .unit__block {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  border: 1px dashed rgba(147, 148, 150, 0.25);
}
</style>