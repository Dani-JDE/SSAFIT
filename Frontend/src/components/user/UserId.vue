<template>
  <main class="form-findid">
    <div class="container">
      <div style="margin-top: 100px">
        <h2 class="text-center"><b>아이디 찾기</b></h2>
        <b-form @submit.stop.prevent>
          <b-form-group label="이름">
            <b-form-input
              type="text"
              id="userName"
              size="lg"
              v-model="nickname"
              placeholder="닉네임을 입력하세요."
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group label="이메일">
            <b-form-input
              type="email"
              id="userEmail"
              size="lg"
              v-model="email"
              placeholder="이메일을 입력하세요."
              trim
              >></b-form-input
            >
          </b-form-group>
          <br />
          <b-button
            class="w-100 btn btn-lg btn-outline-secondary findid-btn"
            type="submit"
            @click="findId"
            >아이디 찾기</b-button
          >
        </b-form>
        <div class="container text-right">
          <router-link :to="{ name: 'usercheck' }" class="find"
            >비밀번호 재설정</router-link
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
      nickname: "",
      email: "",
    };
  },
  methods: {
    findId() {
      if (this.nickname.length == 0) {
        alert("이름을 입력해주세요.");
        document.querySelector("#userName").focus();
      } else if (this.email.length == 0) {
        alert("이메일을 입력해주세요.");
        document.querySelector("#userEmail").focus();
      } else {
        this.$store.dispatch("getUserId", {
          nickname: this.nickname,
          email: this.email,
        });
        this.nickname = "";
        this.email = "";
        document.querySelector("#userName").focus();
      }
    },
  },
};
</script>

<style scoped>
.form-findid {
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
  .form-findid {
    width: 90%;
    margin: auto;
  }
}
</style>
