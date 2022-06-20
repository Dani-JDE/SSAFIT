<template>
  <div class="container">
    <div class="video">
      <div class="embed-youtube">
        <iframe
          width="700"
          height="440"
          :src="`https://www.youtube.com/embed/${video.videoKey}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "VdetatilVideo",
  computed: {
    ...mapState(["video"]),
  },
};
</script>

<style>
.video {
  width: 100%;
  max-width: 900px;
  margin: 30px auto;
  border-radius: 30px;
  background-color: #f0f0f0;
  padding: 40px;
  box-sizing: border-box;
  box-shadow: 0px 8px 33px #999;
}
.embed-youtube {
  position: relative;
  width: 100%;
  height: auto;
  padding-bottom: 56.25%;
}
.embed-youtube iframe {
  z-index: 1;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
