<template>
  <v-layout wrap v-if="!closed">
    <v-card class="mt-4 mb-2 mx-auto" color="black" max-width="300">
      <v-card-actions>
        <div>Ad</div>
        <div class="flex-grow-1"></div>
        <v-btn outlined @click="closed = true">Close Ad</v-btn>
      </v-card-actions>
      <client-only>
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