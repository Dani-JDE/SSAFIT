<template>
  <main class="form-login">
    <div class="container">
      <div style="margin-top: 100px">
        <h2 class="text-center"><b>비밀번호 재설정(본인확인)</b></h2>
        <b-form @submit.stop.prevent>
          <b-form-group label="아이디">
            <b-form-input
              type="text"
              id="userId"
              size="lg"
              v-model="user.userid"
              placeholder="아이디를 입력하세요."
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group label="이름">
            <b-form-input
              type="text"
              id="userName"
              size="lg"
              v-model="user.nickname"
              placeholder="닉네임을 입력하세요."
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group label="이메일">
            <b-form-input
              type="email"
              id="userEmail"
              size="lg"
              v-model="user.email"
              placeholder="이메일을 입력하세요."
              trim
            ></b-form-input>
          </b-form-group>
          <br />
          <b-button
            class="w-100 btn btn-lg btn-outline-secondary login-btn"
            type="submit"
            @click="findId"
            >본인 확인하기</b-button
          >
        </b-form>
        <div class="container">
          <router-link :to="{ name: 'userid' }" class="find"
            >아이디 찾기</router-link
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
        nickname: "",
        email: "",
      },
    };
  },
  methods: {
    findId() {
      if (this.user.userid.length == 0) {
        alert("아이디를 입력해주세요.");
        document.querySelector("#userId").focus();
      } else if (this.user.nickname.length == 0) {
        alert("이름을 입력해주세요.");
        document.querySelector("#userEmail").focus();
      } else if (this.user.email.length == 0) {
        alert("이메일을 입력해주세요.");
        document.querySelector("#userEmail").focus();
      } else {
        this.$store.dispatch("getAuthPw", this.user);
      }
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
a {
  color: black;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .form-login {
    width: 90%;
    margin: auto;
  }
}
</style>
