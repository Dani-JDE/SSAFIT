<template>
  <main class="form-signup">
    <!-- 회원정보 수정 -->
    <div class="container">
      <h2><b>회원정보 수정</b></h2>
      <b-container class="inner-form">
        <h3>기본정보 수정</h3>
        <hr style="width: 30%" />
        <b-form @submit.stop.prevent class="form-text-color">
          <v-carousel class="profile" v-model="user.profile">
            <div>마음에 드는 프로필 사진을 클릭해주세요</div>
            <br />
            <v-carousel-item
              style="text-align: center"
              v-for="i in 11"
              :key="i"
              reverse-transition="fade-transition"
              transition="fade-transition"
              ><img
                :src="require(`@/assets/images/${i - 1}.png`)"
                width="400px"
            /></v-carousel-item>
          </v-carousel>
          <br />
          <!-- 아이디 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="아이디"
                ><b>{{ user.userid }}</b></b-form-group
              >
            </b-col>
            <b-col> </b-col>
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
                <b-form-valid-feedback :state="validEmail">
                  변경하지 않을 경우, 중복확인 없이 기본정보수정이 가능합니다.
                </b-form-valid-feedback>
              </b-form-group>
            </b-col>
            <b-col class="mt-8">
              <b-button @click="emailDuplicateCheck" size="sm"
                >중복확인</b-button
              >
            </b-col>
          </b-row>
          <br />
          <!-- 수정버튼 -->
          <b-row>
            <b-col cols="9">
              <b-button
                class="w-100 btn btn-lg btn-outline-secondary login-btn"
                type="submit"
                @click="editProfile"
                :disabled="isDisabledProfile"
                >기본정보수정</b-button
              >
            </b-col>
            <b-col> </b-col>
          </b-row>
        </b-form>
      </b-container>

      <!-- 비밀번호 변경 -->
      <b-container class="inner-form">
        <h3>비밀번호 변경</h3>
        <hr style="width: 30%" />
        <b-form @submit.stop.prevent>
          <!-- 비밀번호 -->
          <b-row>
            <b-col cols="9">
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
          <!-- 비밀번호 변경버튼 -->
          <b-row>
            <b-col cols="9">
              <b-button
                class="w-100 btn btn-lg btn-outline-secondary login-btn"
                type="submit"
                @click="changePw"
                :disabled="isDisabledPw"
                >비밀번호변경</b-button
              >
            </b-col>
            <b-col> </b-col>
          </b-row>
        </b-form>
      </b-container>
      <!--회원탈퇴-->
      <b-container class="inner-form">
        <h3>회원탈퇴</h3>
        <hr style="width: 30%" />
        <div style="margin: 30px 0px">
          탈퇴를 원하시면 아래 회원탈퇴 버튼을 눌러주세요
        </div>
        <b-button
          class="w-30 btn btn-lg btn-outline-secondary login-btn"
          type="submit"
          @click="userDelete"
          >회원탈퇴</b-button
        >
      </b-container>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: {
        profile: 0,
        userid: "",
        nickname: "",
        email: "",
      },
      pw: "",
      pw2: "",
    };
  },
  computed: {
    ...mapState(["userinfo", "checkedEmail", "compare_email"]),
    // 유효성 검사
    validName() {
      return this.user.nickname.length > 0;
    },
    validEmail() {
      //this.checkedEmail = false; // 확인해보기
      const exptext = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
      return exptext.test(this.user.email);
    },
    validPw() {
      return this.pw.length > 3 && this.pw.length < 13;
    },
    validPw_Re() {
      return this.pw == this.pw2 && this.pw.length > 0;
    },

    // 버튼 활성화
    isDisabledProfile() {
      if (this.validName && this.validEmail) {
        return false;
      } else {
        return true;
      }
    },
    isDisabledPw() {
      if (this.validPw && this.validPw_Re) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    emailDuplicateCheck() {
      this.$store.dispatch("DuplicateEmail", this.user.email);
    },
    editProfile() {
      if (
        this.user.email != this.userinfo.email &&
        (!this.checkedEmail || this.user.email != this.compare_email)
      ) {
        alert("이메일 중복체크를 해주세요");
      } else {
        this.$store.dispatch("modifyProfile", this.user);
      }
    },
    changePw() {
      let user = { userid: this.user.userid, pw: this.pw };
      this.$store.dispatch("setPw", user);
    },
    userDelete() {
      this.$store.dispatch("userDelete");
    },
  },
  created() {
    this.$store.commit("SET_AUTH_PW_F");
    this.user.profile = this.userinfo.profile;
    this.user.userid = this.userinfo.userid;
    this.user.nickname = this.userinfo.nickname;
    this.user.email = this.userinfo.email;
  },
};
</script>

<style scoped>
.form-signup {
  padding: 50px;
  margin: auto;
}
.inner-form {
  margin-top: 50px;
  padding: 50px;
  width: 70%;
  border: dotted 2px;
  border-color: grey;
}
.form-text-color {
  color: grey;
}
.login-btn {
  color: black;
  text-decoration: none;
}
.profile {
  text-align: center;
  width: 500px;
}
@media screen and (max-width: 768px) {
  .form-signup {
    padding: 0px;
    width: 90%;
    margin: auto;
  }
  .container {
    padding: 0px;
    margin: 0px;
    max-width: none;
  }
  .inner-form {
    width: auto;
    margin: 30px;
    padding: 30px;
  }
  .profile {
    text-align: center;
    width: auto;
  }
}
</style>
