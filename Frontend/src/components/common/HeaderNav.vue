<template>
  <v-app>
    <div>
      <v-app-bar app color="white" flat>
        <a href="/" class="ssafit"> &nbsp;SSAFIT &nbsp;</a>
        <img
          style="width: 55px"
          class="run"
          src="https://img.icons8.com/stickers/100/000000/exercise-skin-type-1.png"
        />
        <v-spacer></v-spacer>
        <v-btn to="/user/login" color="grey" class="login"> Log In </v-btn>
        <div>
          <button @click="hamburgerMenu" class="hamburgerBtn">
            <font-awesome-icon icon="fa-solid fa-bars" class="hamburger" />
          </button>
        </div>
      </v-app-bar>

      <v-main class="main">
        <v-row class="main-divider">
          <div :class="[{ leftMenu: true }, { hide: isClosed }]">
            <v-sheet rounded="lg" class="leftBar">
              <v-list color="transparent">
                <v-list-item
                  v-for="(link, idx) in links"
                  :key="idx + 'I'"
                  :to="{ path: link.router }"
                  class="router"
                  link
                >
                  <v-list-item-icon>
                    <img :src="`${link.icon}`" style="width: 40px" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ link.title }}
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  v-for="(link, idx) in links2"
                  :key="idx + 'R'"
                  :to="{ path: link.router }"
                  class="router"
                  link
                >
                  <v-list-item-icon>
                    <img :src="`${link.icon}`" style="width: 40px" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ link.title }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </div>

          <div :class="[{ rightMain: true }, { paddingRightMain: !isClosed }]">
            <v-sheet min-height="100vh" rounded="lg">
              <router-view />
            </v-sheet>
          </div>
        </v-row>
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    isClosed: true,
    links: [
      {
        title: "홈",
        router: "/",
        icon: "https://img.icons8.com/stickers/100/000000/home-page.png",
      },
      {
        title: "검색",
        router: "/search",
        icon: "https://img.icons8.com/stickers/100/000000/search.png",
      },
    ],
    links2: [
      {
        title: "찜리스트",
        router: "/vlist/like",
        icon: "https://img.icons8.com/stickers/100/000000/like.png",
      },
      {
        title: "시청기록",
        router: "/vlist/watched",
        icon: "https://img.icons8.com/stickers/100/000000/laptop-play-video.png",
      },
      {
        title: "채팅방",
        router: "/livechat",
        icon: "https://img.icons8.com/stickers/100/000000/communication.png",
      },
    ],
  }),
  methods: {
    hamburgerMenu() {
      this.isClosed = !this.isClosed;
    },
  },
};
</script>
<style scoped>
/* 홈, 검색, 찜리스트, 시청기록 나타내는 왼쪽 메뉴바 */
.leftMenu {
  position: fixed;
  width: 200px;
}
/* 컨텐츠 표시 오른쪽 메인 공간 */
.rightMain {
  margin-left: 200px;
  width: 100%;
}
.leftBar {
  width: 180px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.main {
  background-color: grey;
}
.main-divider {
  margin: 20px;
}
.ssafit {
  background-image: linear-gradient(
    90deg,
    red,
    orange,
    yellow,
    green,
    blue,
    navy,
    purple
  );
  -webkit-background-clip: text;
  color: transparent;

  font-weight: bold;
  font-size: 40px;

  font-size: 25px;
}
.router {
  color: black;
  text-decoration: none;
}
.login {
  color: white;
  font-size: 20px;
}
.run:hover {
  transform: translateX(300px) scale(0.8, 1);
  transition-duration: 2s;
}

/* 햄버거 버튼 숨겨 */
.hamburger {
  display: none;
}

@media screen and (max-width: 768px) {
  .main {
    background-color: rgb(84, 84, 84);
  }
  /* 위는 삭제 */
  .main * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    display: block;
    width: auto;
    height: auto;
  }
  .leftMenu {
    visibility: visible;
    opacity: 1;
    position: fixed;
    z-index: 2;
    margin: 0px;
    width: 100%;
    height: 200px;
    transition: all 0.3s;
  }

  .leftBar {
    border-radius: 0px !important;
    width: 100%;
  }
  .main-divider {
    flex-direction: column;
  }
  /* 상단 이미지 & 인사문구 가리기 */
  .run {
    display: none;
  }
  .message {
    display: none;
  }
  /* 햄버거 버튼 나오고 회원 버튼 사라짐 */
  .userMenu {
    display: none;
  }
  .hamburger {
    display: block;
    font-size: 25px;
  }
  .hide {
    visibility: hidden;
    opacity: 0;
    height: 0px;
  }
  .paddingRightMain {
    padding-top: 200px;
    transition: all 0.2s;
  }
  .rounded-lg {
    border-radius: 0 !important;
  }
  .v-application .rounded-lg {
    border-radius: 0px !important;
  }
  .v-list > a * {
    display: inline-block;
    vertical-align: middle;
  }
  .v-list > a {
    text-align: center;
  }
  .hamburgerBtn {
    margin: 0px 15px;
  }
}
</style>
