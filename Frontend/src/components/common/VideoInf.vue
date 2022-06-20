<template>
  <div style="max-width: 1190px">
    <div class="cardContainer">
      <span
        v-for="(photo, idx) in shownPhotos"
        v-bind:key="idx"
        :class="[{ card: photo.url }, { notCard: !photo.url }]"
      >
        <router-link :to="`/vdetail/${photo.id}`">
          <img :src="photo.url" alt="" />
          <span>{{ photo.title }}</span>
        </router-link>
        <button @click="like(photo.id)">
          <font-awesome-icon icon="fa-solid fa-heart" id="likeBtn" />
        </button>
      </span>
    </div>
    <v-btn v-intersect="onIntersect" @click="getPhotos">더 보기</v-btn>
  </div>
</template>

<script>
// import lodash from "lodash";
import { mapState } from "vuex";
import router from "@/router";

export default {
  name: "VideoInf",
  data() {
    return {
      photos: [], //서버 통신으로 받아오는 비디오 배열
      shownPhotos: [], //보여주는 비디오 배열
      current: 0, //지금 보여주는 비디오 개수
      loaded: 0, //지금까지 로딩된 비디오 배열의 비디오 수 => 이거를 howMany씩 잘라서 shownPhotos에 넣는다
      howMany: 15, //한번에 몇개 영상 갱신?
    };
  },
  props: {
    option: {
      type: Object,
    },
    part: {
      type: String,
      default: "",
    },
  },
  watch: {
    part: function () {
      this.reset();
    },
  },
  computed: {
    ...mapState(["videos"]), //여기에 state 더 불러와줘야함
    ...mapState(["watched"]), //여기에 state 더 불러와줘야함
    ...mapState(["liked"]), //여기에 state 더 불러와줘야함
  },
  methods: {
    // 찜 버튼 누르기
    like(id) {
      if (localStorage.getItem("access-token") === null) {
        alert("로그인이 필요한 서비스입니다.");
        router.push({ name: "userlogin" });
      } else
        this.$store.dispatch("getLiked").then(() => {
          let flag = true;
          for (let video of this.liked) {
            if (video.id === id) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.$store.dispatch("createLiked", { id: id });
            alert("찜 리스트에 추가되었습니다.");
          } else {
            this.$store.dispatch("deleteLiked", { id: id });
            if (this.option.state == "liked") {
              let idx = 0;
              for (let photo of this.shownPhotos) {
                if (photo.id === id) {
                  this.shownPhotos.splice(idx, 1);
                  break;
                }
                idx++;
              }
            }
            alert("찜 리스트에서 삭제되었습니다.");
          }
        });
    },
    // 사진 가져와서 출력
    getPhotos: function () {
      this.$store.dispatch(this.option.action).then(() => {
        let add = [];
        //data
        if (this.option.state == "videos") {
          for (let video of this.videos) {
            if (video.part.includes(this.part)) {
              let { title, ...rest } = video;
              title = this.textLengthOverCut(title, 27, "...");
              add.push({ title, ...rest });
            }
          }
        } else if (this.option.state == "watched") {
          for (let video of this.watched) {
            if (video.part.includes(this.part)) {
              let { title, ...rest } = video;
              title = this.textLengthOverCut(title, 27, "...");
              add.unshift({ title, ...rest });
            }
          }
        } else if (this.option.state == "liked") {
          for (let video of this.liked) {
            if (video.part.includes(this.part)) {
              let { title, ...rest } = video;
              title = this.textLengthOverCut(title, 27, "...");
              add.unshift({ title, ...rest });
            }
          }
        }
        this.photos = [...this.photos, ...add];
        this.loaded += add.length;
        this.addFromLoaded();
      });
    },
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) {
        if (this.current == this.loaded) {
          // this.getPhotos(); //무한히 같은 영상 목록 로드
        } else {
          this.addFromLoaded();
        }
      }
    },
    addFromLoaded() {
      let added = this.howMany;
      if (this.howMany > this.photos.length) added = this.photos.length;
      this.shownPhotos.splice(this.current, 3);
      this.shownPhotos.splice(this.current, 0, ...this.photos.splice(0, added));
      this.shownPhotos.push({}, {}, {});
      this.current += added;
    },
    reset() {
      // alert(this.part); //현재 부위 출력, 전체는 ""
      this.photos = [];
      this.shownPhotos = [];
      this.loaded = 0;
      this.current = 0;
      this.getPhotos();
    },
    textLengthOverCut(txt, len, lastTxt) {
      if (len == "" || len == null) {
        // 기본값
        len = 20;
      }
      if (lastTxt == "" || lastTxt == null) {
        // 기본값
        lastTxt = "...";
      }
      if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
      }
      return txt;
    },
  },
  created() {
    this.getPhotos();
  },
  mounted() {
    this.onIntersect();
  },
  updated() {
    this.onIntersect();
  },
};
</script>

<style scoped>
.notCard {
  max-width: 370px;
  flex-grow: 1;
  display: inline-block;
  width: auto;
  flex-basis: 223px;
  padding: 10px;
  border: 0 !important;
}

.notCard #likeBtn {
  display: none;
}

.card {
  max-width: 370px;
  flex-grow: 1;
  display: inline-block;
  width: auto;
  flex-basis: 223px;
  transition: 0.5s;
  padding: 10px;
  border: 0 !important;
}

.card:hover {
  flex-grow: 4;
  flex-basis: 270px;
  transition: 0.5s;
}

.card img {
  border-radius: 7px;
  width: 100%;
  transition: 0.3s;
}

.card:hover img {
  border-radius: 12px;
  width: 100%;
  filter: brightness(35%);
  transition: 0.3s;
}

.card span {
  height: 70px;
  overflow: hidden;

  visibility: hidden;
  opacity: 0;
  position: absolute;
  width: 80%;
  top: 50%;
  left: 10%;
  color: white;
  font-size: 15px;
  font-weight: bold;
  transition: 0.3s;
}

.card:hover span {
  visibility: visible;
  opacity: 1;
  top: 60%;
  font-size: 23px;
  transition: 0.3s;
}

.card button {
  position: absolute;
  top: 45%;
  left: 10%;
  z-index: 2;
  visibility: hidden;
  opacity: 0;
  transition-property: visibility, opacity;
  transition-duration: 0.5s;
}

.card:hover button {
  opacity: 1;
  visibility: visible;
  transition: 0.5s;
}

.card #likeBtn {
  color: white;
  font-size: 30px;
  transition: 0.3s;
}

.card #likeBtn:hover {
  color: #f82f62;
  transition: 0.3s;
}

.cardContainer {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
