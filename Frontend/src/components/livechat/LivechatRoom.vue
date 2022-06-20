<template>
  <div class="container">
    <b-container class="ux">
      <h2>실시간채팅</h2>
      <br />

      <div class="chat-box" id="scrollDiv">
        <!-- v-for start -->
        <div v-for="(chat, index) in chats" :key="index">
          <br />
          <!-- 기본채팅(0)-다른유저 -->
          
            <div v-if="chat.type == 0 && chat.uid != userinfo.id">
              <div align="left">
                <div class="chat">
                  <b-row>
                    <b-col cols="2">
                      <img
                        class="align-self-center"
                        style="border: 2px solid; border-radius: 70%"
                        :src="require(`@/assets/images/${chat.profile}.png`)"
                        width="40px"
                      />
                    </b-col>
                    <b-col cols="10" class="align-self-center">
                      <b-row>
                        <b-col>{{ chat.writer }}</b-col>
                      </b-row>
                      <b-row>
                        <b-col>{{ chat.content }}</b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
            <!-- 기본채팅(0)-나 -->
            <div v-else-if="chat.type == 0 && chat.uid == userinfo.id">
              <div align="right">
                <div class="chat">
                  <b-row>
                    <b-col class="text-left">{{ chat.content }}</b-col>
                  </b-row>
                </div>
              </div>
            </div>
            <!-- 입퇴장(1) -->
            <div v-else-if="chat.type == 1">
              <div style="font-size: 12px" class="text-center">
                {{chat.writer}}님이 {{ chat.content }}
              </div>
            </div>
            <!-- 삭제된 메세지(2)-->

            <div v-else-if="chat.type == 2 && chat.uid != userinfo.userid">
              <div align="left">
                <div class="chat">
                  <b-row>
                    <b-col cols="2">
                      <img
                        class="align-self-center"
                        style="border: 2px solid; border-radius: 70%"
                        :src="require(`@/assets/images/${chat.profile}.png`)"
                        width="40px"
                      />
                    </b-col>
                    <b-col cols="10" class="align-self-center">
                      <b-row>
                        <b-col>{{ chat.writer }}</b-col>
                      </b-row>
                      <b-row>
                        <b-col style="font-style: italic">{{
                          chat.content
                        }}</b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
            <div v-else-if="chat.type == 2 && chat.uid == userinfo.userid">
              <div align="right">
                <div class="chat">
                  <b-row>
                    <b-col class="text-left" style="font-style: italic">{{
                      chat.content
                    }}</b-col>
                  </b-row>
                </div>
              </div>
            </div>
          
          <!-- v-for end -->
        </div>
      </div>
      <div>
        <br />
        <b-form @submit.stop.prevent class="form-text-color">
          <b-row>
            <b-col cols="10"
              ><b-form-input
                v-model="chat.content"
                placeholder="메세지를 입력하세요"
                @keyup.enter="sendMessage"
              ></b-form-input
            ></b-col>
            <b-col cols="2"><b-button @click="sendMessage">전송</b-button></b-col>
          </b-row>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LivechatRoom",
  data() {
    return {
      chat: {
        content: "",
        type: 0,
      },
      timerID: function(){},
    };
  },
  computed: {
    ...mapState(["chats", "userinfo", "lastChatNum"]),
  },
  watch: {
    chats: function() {
      document.querySelector("#scrollDiv").scrollTop = document.querySelector("#scrollDiv").scrollHeight;
    }
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("sendChat", this.chat);
      this.chat.content = "";
    },
  },
  created() {
    this.$store.dispatch("sendChat", {content: "입장", type: "1"});
    this.timerID = setInterval(() => this.$store.dispatch("getLastchatNum"), 500);
  },
  destroyed() {
    this.$store.dispatch("sendChat", {content: "퇴장", type: "1"});
    clearInterval(this.timerID);
  }
};
</script>

<style scope>
.ux {
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 30px;
  width: 50%;
  border: solid 2px;
  border-radius: 5px;
  border-color: grey;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.284);
}
.chat-box {
  overflow: auto;
  max-height: 500px;
  box-shadow: inset 0 5px 7px -7px grey;
}
.chat-box::-webkit-scrollbar {
  width: 10px; /*스크롤바의 너비*/
}

.chat-box::-webkit-scrollbar-thumb {
  background-color: grey; /*스크롤바의 색상*/
  border-radius: 5px;
}

.chat-box::-webkit-scrollbar-track {
  background-color: white; /*스크롤바 트랙 색상*/
}
.chat {
  width: 70%;
  margin: 10px;
  margin-right: 30px;
  padding: 10px;
  vertical-align: middle;
  border: solid 2px;
  border-radius: 5px;
  border-color: grey;
}
.chat-input {
  padding: 30px;
  border: solid 2px;
  border-radius: 5px;
  border-color: grey;
}
</style>
