<template>
  <main class="form-editMember">
    <div class="container">
      <div style="margin-top: 100px">
        <h2 class="text-center"><b>회원정보 수정(본인확인)</b></h2>
        <br />
        <b-form @submit.stop.prevent>
          <b-form-group label="비밀번호">
            <b-form-input
              type="password"
              id="pw"
              size="lg"
              v-model="pw"
              placeholder="비밀번호를 입력하세요."
              trim
            ></b-form-input>
          </b-form-group>
          <br />
          <b-button
            class="w-100 btn btn-lg btn-outline-secondary editMember-btn"
            type="submit"
            @click="checkMember"
            >비밀번호 확인</b-button
          >
        </b-form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      pw: "",
    };
  },
  methods: {
    checkMember() {
      if (this.pw.length == 0) {
        alert("비밀번호를 입력해주세요.");
        document.querySelector("#pw").focus();
      } else {
        this.$store.dispatch("getAuthProfile", { pw: this.pw });
        this.pw = "";
        document.querySelector("#pw").focus();
      }
    },
  },
};
</script>

<style scoped>
.form-editMember {
  width: 50%;
  margin: auto;
}
.btn {
  color: black;
  text-decoration: none;
  font-style: italic;
  font-weight: bold;
}
.editMember {
  color: black;
  text-decoration: none;
  font-size: 12px;
}
@media screen and (max-width: 768px) {
  .form-editMember {
    width: 80%;
    margin: auto;
  }
}
</style>
