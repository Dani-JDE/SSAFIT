<template>
  <div class="container">
    <div class="btnContainer">
      <button @click="part = ''" class="partBtn" id="totalBtn">전체</button>
      <button
        v-for="(partName, idx) in parts"
        v-bind:key="idx"
        @click="part = partName"
        class="partBtn"
      >
        {{ partName }}
      </button>
    </div>
    <!-- 여기서 변수 내려줘서 props로 받던, VideoInf에서 url path로 식별하던, 찜리스트 받아올 수 있도록 mode 고려 -->
    <video-inf
      :option="{ state: 'videos', action: 'getVideos' }"
      :part="part"
    ></video-inf>
  </div>
</template>

<script>
import axios from "axios";
import VideoInf from "@/components/common/VideoInf.vue";
export default {
  components: {
    VideoInf,
  },
  data() {
    return {
      parts: [],
      part: "",
    };
  },
  created() {
    //이녀석 vuex로 보내버려~
    axios.get("http://localhost:9999/video/part").then((res) => {
      this.parts = [...this.parts, ...res.data];
    });
  },
};
</script>

<style>
#totalBtn {
  color: #f82f62;
}

.partBtn {
  margin: 10px 10px;
  position: relative;
  border: none;
  display: inline-block;
  min-width: 110px;
  padding: 10px 30px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;

  background-color: rgb(255, 255, 255);
  color: #1e6b7b;
}
.partBtn:hover {
  letter-spacing: 2px;
  transform: scale(1.2);
  cursor: pointer;
}
.partBtn:active {
  transform: scale(1.5);
}

.btnContainer {
  margin: 20px;
}
</style>
