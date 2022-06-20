<template>
  <div class="container">
    <!-- <div>MainCarousel</div> -->
    <h4>추천 영상</h4>
    <v-carousel height="auto" hide-delimiters>
      <template v-for="(photo, index) in recommend">
        <v-carousel-item
          class="carouselContainer"
          v-if="(index + 1) % columns === 1 || columns === 1"
          :key="index"
          style="margin-bottom: 50px; background-color: black"
        >
          <v-row class="flex-nowrap" style="height: 100%">
            <template v-for="(n, i) in columns">
              <template v-if="+index + i < recommend.length">
                <v-col :key="i">
                  <v-sheet v-if="+index + i < recommend.length" height="100%;">
                    <v-row class="fill-height" align="end" justify="center">
                      <div class="display-3, cardContainer">
                        <span class="cardCar">
                          <router-link
                            :to="`/vdetail/${recommend[index + i].id}`"
                            style="color: black"
                          >
                            <img
                              :src="recommend[index + i].url"
                              alt=""
                              style="width: 100%"
                            />
                            <span>{{ recommend[index + i].title }}</span>
                          </router-link>
                          <button @click="like(recommend[index + i].id)">
                            <font-awesome-icon
                              icon="fa-solid fa-heart"
                              id="likeBtn"
                            />
                          </button>
                        </span>
                      </div>
                    </v-row>
                  </v-sheet>
                </v-col>
              </template>
            </template>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from "@/router";

export default {
  data() {
    return {};
  },
  computed: {
    columns() {
      if (this.$vuetify.breakpoint.xl) {
        return 3;
      }

      if (this.$vuetify.breakpoint.lg) {
        return 3;
      }

      if (this.$vuetify.breakpoint.md) {
        return 2;
      }

      return 1;
    },
    ...mapState(["recommend"]), //여기에 state 더 불러와줘야함
    ...mapState(["liked"]),
  },
  methods: {
    getPhotos: function () {
      this.$store
        .dispatch("getRecommend")
        .then(() => {})
        .catch(() => {
          console.log("getRecommend err");
        });
    },
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
            alert("찜 리스트에서 삭제되었습니다.");
          }
        });
    },
  },
  mounted() {
    this.getPhotos();
  },
};
</script>

<style scoped>
.cardCar * {
  background-color: transparent !important;
}

.cardCar {
  flex-grow: 1;
  display: inline-block;
  width: auto;
  flex-basis: 223px;
  transition: 0.5s;
  padding: 10px;
  border: 0 !important;
}

.cardCar:hover {
  flex-grow: 4;
  flex-basis: 270px;
  transition: 0.5s;
}

.cardCar img {
  width: 100%;
  transition: 0.3s;
}

.cardCar:hover img {
  width: 100%;
  filter: brightness(35%);
  transition: 0.3s;
}

.cardCar span {
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

.cardCar:hover span {
  visibility: visible;
  opacity: 1;
  top: 60%;
  font-size: 23px;
  transition: 0.3s;
}

.cardCar button {
  position: absolute;
  top: 45%;
  left: 10%;
  z-index: 2;
  visibility: hidden;
  opacity: 0;
  transition-property: visibility, opacity;
  transition-duration: 0.5s;
}

.cardCar:hover button {
  opacity: 1;
  visibility: visible;
  transition: 0.5s;
}

.cardCar #likeBtn {
  color: white;
  font-size: 30px;
  transition: 0.3s;
}

.cardCar #likeBtn:hover {
  color: #f82f62;
  transition: 0.3s;
}

.cardContainer {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: space-between;
}

.carouselContainer * {
  background-color: black;
}
</style>
