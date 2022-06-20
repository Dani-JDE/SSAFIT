<template>
  <main class="form-login">
    <div class="container">
      <div style="margin-top: 100px">
        <h2 class="text-center">LOG IN</h2>
        <b-form @submit.stop.prevent>
          <b-form-group label="User ID">
            <b-form-input
              type="text"
              id="userID"
              size="lg"
              v-model="user.userid"
              placeholder="아이디를 입력하세요."
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group label="User PW">
            <b-form-input
              type="password"
              id="userPW"
              size="lg"
              v-model="user.pw"
              placeholder="비밀번호를 입력하세요."
              trim
              >></b-form-input
            >
          </b-form-group>
          <br />
          <b-button
            class="w-100 btn btn-lg btn-outline-secondary login-btn"
            type="submit"
            @click="login"
            >로그인</b-button
          >
        </b-form>
        <div class="container text-center">
          <router-link :to="{ name: 'userid' }" class="find"
            >아이디 찾기</router-link
          >
          /
          <router-link :to="{ name: 'usercheck' }" class="find"
            >비밀번호 재설정</router-link
          >
          <br />
          <h6 class="text-center find mt-5">아직 회원이 아니신가요?</h6>
          <b-button
            class="w-100 btn btn-lg btn-outline-secondary signup-btn"
            @click="moveToSignin"
            >회원가입</b-button
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userid: "",
        pw: "",
      },
    };
  },
  methods: {
    login() {
      if (this.user.userid.length == 0) {
        alert("아이디를 입력해주세요.");
        document.querySelector("#userID").focus();
      } else if (this.user.pw.length == 0) {
        alert("비밀번호를 입력해주세요.");
        this.$router.push({ name: "userlogin" });
        document.querySelector("#userPW").focus();
      } else {
        this.$store.dispatch("userLogin", this.user);
        this.user.userid = "";
        this.user.pw = "";
        document.querySelector("#userID").focus();
      }
    },
    moveToSignin() {
      this.$router.push({ name: "usersignup" });
    },
  },
};
</script>

<style scoped>
.form-login {
  width: 50%;
  margin: auto;
}
.btn {
  color: black;
  text-decoration: none;
  font-style: italic;
  font-weight: bold;
}
.find {
  color: black;
  text-decoration: none;
  font-size: 12px;
}
.signup-btn {
  color: black;
  text-decoration: none;
}
a {
  color: black;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .form-login {
    width: 80%;
    margin: auto;
  }
}
</style>
