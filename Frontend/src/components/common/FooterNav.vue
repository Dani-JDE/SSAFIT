<template>
  <div class="footer">
    <v-card-text>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4 white"
        style="margin-left: 10px"
        icon
      >
        <v-icon size="30px">{{ icon }}</v-icon>
      </v-btn>
    </v-card-text>
    <v-card-text class="white--text pt-0"
      >SSAFIT 서비스 이용약관 | 개인정보 처리 방침 | 이용약관 | 채용정보<br />
      <br />
      고객센터(이용 및 결제 문의) | cs@SSAFIT.co.kr /02-000-0000 (유료)<br />
      제휴 및 대외 협력 | https://SSAFIT.team/contact <br />
      B2B 이용권 구매 문의 | 싸피마케팅 (ssafit@ssafit.com / 070-0000-0000)
      copyright<br />
      <br />
      주식회사 SSAFIT 대표 배준성 부산광역시 기장군 싸피대로 싸피빌딩 3층
      <br />
      사업자등록번호 111-11-1111 통신판매업 신고번호 제 2022-서울서초-0965호
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="white--text">
      {{ new Date().getFullYear() }} —
      <strong>SSAFIT</strong>
    </v-card-text>
  </div>
</template>
<script>
export default {
  name: "FooterNav",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
<style scoped>
.footer {
  background-color: grey;
  color: white;
  text-align: center;
}
</style>
