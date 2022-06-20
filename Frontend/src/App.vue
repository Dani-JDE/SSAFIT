<template>
  <div>
    <div v-if="isLogin">
      <login-header />
    </div>
    <div v-else>
      <header-nav />
    </div>
    <footer-nav />
  </div>
</template>

<script>
import LoginHeader from "@/components/common/LoginHeader.vue";
import HeaderNav from "@/components/common/HeaderNav.vue";
import FooterNav from "@/components/common/FooterNav.vue";
import { mapState } from "vuex";
export default {
  components: {
    LoginHeader,
    HeaderNav,
    FooterNav,
  },
  computed: {
    ...mapState(["isLogin"]),
  },
};
</script>

<style scoped>
@font-face {
  font-family: "GmarketSansBold";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
* {
  font-family: "GmarketSansBold";
  letter-spacing: 3px;
}
</style>
