<template>
  <main class="form-findpw">
    <div class="container">
      <div style="margin: 100px 0px">
        <h2 class="text-center"><b>비밀번호 재설정</b></h2>
        <br />
        <b-form @submit.stop.prevent>
          <b-form-group label="비밀번호">
            <b-form-input
              type="password"
              v-model="pw"
              :state="validPw"
              trim
            ></b-form-input>
            <b-form-invalid-feedback :state="validPw">
              비밀번호는 4 ~ 12 글자로 작성해주세요.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validPw" />
          </b-form-group>

          <b-form-group label="비밀번호 재확인">
            <b-form-input
              type="password"
              v-model="pw2"
              :state="validPw_Re"
              trim
            ></b-form-input>
            <b-form-invalid-feedback :state="validPw_Re">
              동일한 암호를 입력하세요.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validPw_Re" />
          </b-form-group>
          <b-button
            class="w-100 btn btn-lg btn-outline-secondary setpw-btn"
            type="submit"
            @click="setPw"
            :disabled="isDisabled"
            >재설정</b-button
          >
        </b-form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      pw: "",
      pw2: "",
    };
  },
  computed: {
    ...mapState(["tmp_userid"]),

    // 유효성 검사
    validPw() {
      return this.pw.length > 3 && this.pw.length < 13;
    },
    validPw_Re() {
      return this.pw == this.pw2 && this.pw.length > 0;
    },

    // 재설정 버튼 활성화
    isDisabled() {
      if (this.validPw && this.validPw_Re) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    setPw() {
      let user = { userid: this.tmp_userid, pw: this.pw };
      this.$store.dispatch("setPw", user);
    },
  },
  created() {
    this.$store.commit("SET_AUTH_PW_F");
  },
};
</script>

<style scoped>
.form-findpw {
  width: 50%;
  margin: auto;
}
.setpw-btn {
  color: black;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .form-findpw {
    width: 80%;
    margin: auto;
  }
}
</style>
