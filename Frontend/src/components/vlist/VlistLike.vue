<template>
  <div class="container">
    <h2>찜리스트</h2>
    <br />
    <!-- 여기서 변수 내려줘서 props로 받던, VideoInf에서 url path로 식별하던, 찜리스트 받아올 수 있도록 mode 고려 -->
    <video-inf :option="{ state: 'liked', action: 'getLiked' }"></video-inf>
  </div>
</template>

<script>
import VideoInf from "@/components/common/VideoInf";
export default {
  name: "VlistLike",
  components: {
    VideoInf,
  },
};
</script>

<style></style>
