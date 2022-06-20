<template>
  <div>
    <!-- <div>여기는 searchView 입니다!</div> -->
    <search-video :option="{ state: 'videos', action: 'getVideos' }" />
  </div>
</template>

<script>
import SearchVideo from "@/components/search/SearchVideo.vue";

export default {
  components: {
    SearchVideo,
  },
};
</script>
