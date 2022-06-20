<template>
  <main class="form-signup">
    <div class="container">
      <div style="margin: 100px 0px">
        <h2><b>회원 가입</b></h2>
        <br />
        <b-form @submit.stop.prevent>
          <!-- 아이디 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="아이디">
                <b-form-input
                  type="text"
                  v-model="user.userid"
                  :state="validId"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="validId">
                  아이디는 5 ~ 12 글자로 작성해주세요.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validId" />
              </b-form-group>
            </b-col>
            <b-col class="mt-8">
              <b-button @click="idDuplicateCheck" size="sm">중복확인</b-button>
            </b-col>
          </b-row>
          <!-- 이름 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="이름">
                <b-form-input
                  type="text"
                  v-model="user.nickname"
                  :state="validName"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="validName">
                  닉네임을 입력해주세요.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validName" />
              </b-form-group>
            </b-col>
            <b-col> </b-col>
          </b-row>
          <!-- 비밀번호 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="비밀번호">
                <b-form-input
                  type="password"
                  v-model="user.pw"
                  :state="validPw"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="validPw">
                  비밀번호는 4 ~ 12 글자로 작성해주세요.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validPw" />
              </b-form-group>
            </b-col>
            <b-col> </b-col>
          </b-row>
          <!-- 비밀번호 재확인 -->
          <b-row>
            <b-col cols="9">
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
            </b-col>
            <b-col> </b-col>
          </b-row>
          <!-- 이메일 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="이메일">
                <b-form-input
                  type="email"
                  v-model="user.email"
                  :state="validEmail"
                  required
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="validEmail">
                  이메일 형식이 올바르지 않습니다.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validEmail" />
              </b-form-group>
            </b-col>
            <b-col class="mt-8">
              <b-button @click="emailDuplicateCheck" size="sm"
                >중복확인</b-button
              >
            </b-col>
          </b-row>
          <br />
          <!-- 가입버튼 -->
          <b-row>
            <b-col cols="9">
              <b-button
                class="w-100 btn btn-lg btn-outline-secondary signup-btn"
                type="submit"
                @click="signup"
                :disabled="isDisabled"
                >회원가입</b-button
              >
            </b-col>
            <b-col> </b-col>
          </b-row>
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
      user: {
        userid: "",
        nickname: "",
        pw: "",
        email: "",
      },
      pw2: "",
    };
  },
  computed: {
    ...mapState(["checkedId", "checkedEmail", "compare_id", "compare_email"]),

    // 유효성 검사
    validId() {
      return this.user.userid.length > 4 && this.user.userid.length < 13;
    },
    validName() {
      return this.user.nickname.length > 0;
    },
    validPw() {
      return this.user.pw.length > 3 && this.user.pw.length < 13;
    },
    validPw_Re() {
      return this.user.pw == this.pw2 && this.user.pw.length > 0;
    },
    validEmail() {
      const exptext = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
      return exptext.test(this.user.email);
    },

    // 회원가입 버튼 활성화
    isDisabled() {
      if (
        this.validId &&
        this.validName &&
        this.validPw &&
        this.validPw_Re &&
        this.validEmail
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    idDuplicateCheck() {
      this.$store.dispatch("DuplicateId", this.user.userid);
    },
    emailDuplicateCheck() {
      this.$store.dispatch("DuplicateEmail", this.user.email);
    },
    signup() {
      if (!this.checkedId || this.user.userid != this.compare_id) {
        alert("아이디 중복체크를 해주세요");
      } else if (!this.checkedEmail || this.user.email != this.compare_email) {
        alert("이메일 중복체크를 해주세요");
      } else {
        this.$store.dispatch("userSignup", this.user);
      }
    },
  },
};
</script>

<style scoped>
.form-signup {
  width: 60%;
  margin: auto;
}
.signup-btn {
  color: black;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .form-signup {
    width: 90%;
    margin: auto;
  }
}
</style>
