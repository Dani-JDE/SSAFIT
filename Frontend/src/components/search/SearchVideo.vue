// 새로고침하면 목록 사라져버림

<template>
  <div class="container">
    <!-- 검색창 -->
    <form @submit.prevent>
      <input
        class="view"
        type="text"
        :value="keyword"
        @input="search((keyword = $event.target.value))"
        placeholder="검색어를 입력하세요."
      />
      <input class="btn" type="button" value="검색" />
    </form>
    <!-- 영상 목록 -->
    <div class="cardContainer">
      <span
        v-for="(photo, idx) in result"
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from "@/router"; //삭제 해야해~

export default {
  name: "SearchVideo",
  components: {
    // VideoInf,
  },
  data() {
    return {
      keyword: "",
      result: [],
    };
  },
  props: { option: Object, rerender: Number },
  computed: {
    ...mapState(["videos"]),
    ...mapState(["liked"]),
  },
  methods: {
    // 찜 버튼 누르기
    like(id) {
      if (localStorage.getItem("access-token") === null) {
        alert("로그인이 필요한 서비스입니다.");
        router.push({ name: "userlogin" }); //삭제할때 import 한거도 삭제해
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
            let idx = 0;
            for (let photo of this.result) {
              if (photo.id === id) {
                this.result.splice(idx, 1);
                break;
              }
              idx++;
            }
            alert("찜 리스트에서 삭제되었습니다.");
          }
        });
    },
    //검색
    search(keyword) {
      let add = [];
      for (let video of this.videos) {
        if (video.title.toLowerCase().includes(keyword.toLowerCase())) {
          let { title, ...rest } = video;
          title = this.textLengthOverCut(title, 25, "...");
          add.push({ title, ...rest });
        }
      }
      add.push({}, {}, {});
      this.result = add;
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
    this.$store.dispatch(this.option.action).then(() => {
      this.search("");
    });
  },
};
</script>

<style>
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
  width: 100%;
  transition: 0.3s;
}

.card:hover img {
  width: 100%;
  filter: brightness(35%);
  transition: 0.3s;
}

.card span {
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
