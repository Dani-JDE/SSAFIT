import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import axios from "axios";
import lodash from "lodash";

Vue.use(Vuex);

const REST_API = `http://localhost:9999`;

export default new Vuex.Store({
  state: {
    // 비디오 관련
    videos: [],
    video: {},
    avgRate: 0,

    // 추천 비디오 관련
    recommend: [],

    // 찜 기록 관련
    liked: [],

    // 시청 기록 관련
    watched: [],

    // 리뷰 관련
    reviews: [],
    review: {},
    replies: [],
    replyNum: [],

    // 로그인 관련
    isLogin: false, // 로그인 상태
    userinfo: {}, // 로그인된 user의 정보
    // 회원가입 관련
    checkedId: false, // id 중복체크완료 여부
    checkedEmail: false, // eamil 중복체크완료 여부
    compare_id: "", // 중복확인 완료 id값 임시저장
    compare_email: "", // 중복확인 완료 email값 임시저장
    // 비밀번호 재설정 관련
    isAuthPw: false, // 비밀번호 재설정 권한
    tmp_userid: "", // 임시 저장 아이디
    // 프로필 재설정 관련
    isAuthProfile: false, // 프로필 재설정 권한


    // 채팅 관련
    lastChatNum: 0,
    startChatNum: 0,
    chats: [],
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },
    getPwAuth(state) {
      return state.isAuthPw;
    },
    getProfileAuth(state) {
      return state.isAuthProfile;
    },
  },
  mutations: {
    // 비디오 관련
    GET_VIDEOS(state, payload) {
      state.videos = payload;
    },
    GET_VIDEO(state, payload) {
      state.video = payload;
    },

    // 추천 비디오 관련
    GET_RECOMMEND(state, payload) {
      state.recommend = payload;
    },

    // 찜 기록 관련
    GET_LIKED(state, payload) {
      state.liked = payload;
    },
    CREATE_LIKED(state, payload) {
      state.liked.push(payload);
    },
    UPDATE_LIKED(state, payload) {
      state.liked = payload;
    },

    // 시청 기록 관련
    GET_WATCHED(state, payload) {
      state.watched = payload;
    },

    // 리뷰 관련
    GET_REVIEWS(state, payload) {
      // 부모리뷰리스트
      state.reviews = payload;
    },
    GET_REVIEW(state, payload) {
      state.review = payload;
    },
    GET_REPLIES(state, payload) {
      // 자식답글리스트
      state.replies = payload;
    },
    SET_REPLIES_NUM(state, payload) {
      for (let i = 0; i < state.reviews.length; i++) {
        state.replyNum[state.reviews[i].id] = 0;
      }
      for (let i = 0; i < payload.length; i++) {
        state.replyNum[payload[i].re_id]++;
      }
    },
    // CREATE_REVIEW(state, payload) {
    //   state.reviews.push(payload);
    // },
    UPDATE_REVIEW(state, payload) {
      state.review = payload;
    },

    // 로그인 관련
    USER_LOGIN(state, user) {
      state.isLogin = true;
      state.userinfo = user;
    },
    //로그아웃 관련
    USER_LOGOUT(state) {
      localStorage.removeItem("access-token");
      state.isLogin = false;
      state.userinfo = {};
    },
    // 회원가입관련
    CHECK_DUPL_ID(state, userid) {
      state.checkedId = true;
      state.compare_id = userid;
    },
    CHECK_DUPL_EMAIL(state, email) {
      state.checkedEmail = true;
      state.compare_email = email;
    },
    DUPL_RESET(state) {
      state.checkedId = false;
      state.compare_id = "";
      state.checkedEmail = false;
      state.compare_email = "";
    },
    // 비밀번호 재설정 권한
    SET_AUTH_PW_T(state) {
      state.isAuthPw = true;
    },
    SET_AUTH_PW_F(state) {
      state.isAuthPw = false;
    },
    TMP_USER_ID(state, id) {
      state.tmp_userid = id;
    },
    // 프로필 변경 권한
    SET_AUTH_PROFILE_T(state) {
      state.isAuthProfile = true;
    },
    SET_AUTH_PROFILE_F(state) {
      state.isAuthProfile = false;
    },


    // 채팅 관련
    GET_STARTNUM(state, num) {
      state.startChatNum = num;
    },
    GET_LASTNUM(state, num) {
      state.lastChatNum = num;
    },
    GET_CHATS(state, chats) {
      state.chats = chats;
    }
  },
  actions: {
    //비디오 관련
    getVideos({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let params = null;

        if (payload) {
          params = payload;
        }
        const API_URL = `${REST_API}/video/all`; // 백엔드 참고
        axios({
          url: API_URL,
          method: "GET",
          params,
        })
          .then((res) => {
            for (let video of res.data) {
              video.title = lodash.unescape(video.title);
            }
            commit("GET_VIDEOS", res.data);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    getVideo({ commit }, id) {
      const API_URL = `${REST_API}/video/detail/${id}`;
      axios({
        url: API_URL,
        method: "GET",
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          commit("GET_VIDEO", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //추천 비디오 관련
    getRecommend({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let params = null;
        let headers = null;

        if (payload) {
          params = payload;
        }
        if (localStorage.getItem("access-token")) {
          headers = { "access-token": localStorage.getItem("access-token") };
        }
        const API_URL = `${REST_API}/video/recommended`; // 백엔드 참고
        axios({
          url: API_URL,
          method: "GET",
          params,
          headers,
        })
          .then((res) => {
            const ans = [...res.data.slice(0, 12)];
            ans.forEach((element) => {
              element.title = lodash.unescape(element.title); //title decoding
              if (element.title.length > 27) {
                element.title = element.title.substr(0, 27) + "...";
              }
            });
            res.data = ans;

            commit("GET_RECOMMEND", res.data);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },

    //찜 기록 관련
    getLiked({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let params = null;

        if (payload) {
          params = payload;
        }
        const API_URL = `${REST_API}/video/liked`; // 백엔드 참고
        axios({
          url: API_URL,
          method: "GET",
          params,
          headers: {
            "access-token": localStorage.getItem("access-token"),
          },
        })
          .then((res) => {
            for (let video of res.data) {
              video.title = lodash.unescape(video.title);
            }
            commit("GET_LIKED", res.data);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    createLiked({ commit }, payload) {
      const API_URL = `${REST_API}/video/likes`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "POST",
        params: payload,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then(() => {
          commit("CREATE_LIKED", payload);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLiked({ commit }, payload) {
      {
        commit;
      }
      const API_URL = `${REST_API}/video/likes/${payload.id}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "DELETE",
        params: payload,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //시청 기록 관련
    getWatched({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let params = null;

        if (payload) {
          params = payload;
        }
        const API_URL = `${REST_API}/video/watched`; // 백엔드 참고
        axios({
          url: API_URL,
          method: "GET",
          params,
          headers: {
            "access-token": localStorage.getItem("access-token"),
          },
        })
          .then((res) => {
            for (let video of res.data) {
              video.title = lodash.unescape(video.title);
            }
            commit("GET_WATCHED", res.data);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },

    //리뷰 관련
    getReviews({ commit, dispatch }, id) {
      let params = null;

      if (id) {
        params = id;
      }
      const API_URL = `${REST_API}/review/par/${id}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
        params,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          commit("GET_REVIEWS", res.data);
          dispatch("getReplies", id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getReview({ commit }, id) {
      const API_URL = `${REST_API}/review/${id}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          commit("GET_REVIEW", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getReplies({ commit }, id) {
      let params = null;

      if (id) {
        params = id;
      }
      const API_URL = `${REST_API}/review/chi/${id}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
        params,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          commit("GET_REPLIES", res.data);
          commit("SET_REPLIES_NUM", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createReview({ dispatch }, review) {
      const API_URL = `${REST_API}/review/write`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "POST",
        params: review,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then(() => {
          dispatch("getReviews", review.vid);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    modifyReview({ dispatch }, review) {
      const API_URL = `${REST_API}/review/update`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "PUT",
        params: review,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then(() => {
          dispatch("getReviews", review.vid);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteReview({ dispatch }, payload) {
      const API_URL = `${REST_API}/review/delete/${payload.id}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "DELETE",
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then(() => {
          dispatch("getReviews", payload.vid);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 로그인 관련
    userLogin({ dispatch }, user) {
      const API_URL = `${REST_API}/user/login`;
      axios({
        url: API_URL,
        method: "POST",
        params: user,
      })
        .then((res) => {
          if (res.data.message == "success") {
            localStorage.setItem("access-token", res.data["access-token"]);
            dispatch("getUserInfo");
          } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserInfo({ commit }) {
      const API_URL = `${REST_API}/user/getUser`;
      if (localStorage.getItem("access-token")) {
        axios({
          url: API_URL,
          method: "GET",
          headers: {
            "access-token": localStorage.getItem("access-token"),
          },
        })
          .then((res) => {
            commit("USER_LOGIN", res.data);
            router.push({ name: "main" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 회원가입 관련
    DuplicateId({ commit }, userid) {
      const API_URL = `${REST_API}/user/join/id/${userid}`;
      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          if (res.data == "success") {
            commit("CHECK_DUPL_ID", userid);
            alert("사용가능한 아이디 입니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 500) alert("중복된 아이디 입니다.");
          else alert("서버가 응답하지 않습니다.");
        });
    },
    DuplicateEmail({ commit }, email) {
      const API_URL = `${REST_API}/user/join/email/${email}`;
      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          if (res.data == "success") {
            commit("CHECK_DUPL_EMAIL", email);
            alert("사용가능한 이메일 입니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 500) alert("중복된 이메일 입니다.");
          else alert("서버가 응답하지 않습니다.");
        });
    },
    userSignup({ commit }, user) {
      const API_URL = `${REST_API}/user/join`;
      axios({
        url: API_URL,
        method: "POST",
        params: user,
      })
        .then(() => {
          alert(`${user.nickname}님, 회원가입을 축하드립니다!`);
          commit("DUPL_RESET");
          router.push({ name: "userlogin" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 아이디, 비밀번호 찾기
    getUserId(context, user) {
      context;
      const API_URL = `${REST_API}/user/find-id`;
      axios({
        url: API_URL,
        method: "GET",
        params: user,
      })
        .then((res) => {
          alert(`${user.nickname}님의 id는 "${res.data}" 입니다.`);
        })
        .catch((err) => {
          console.log(err);
          alert(`일치하는 회원 정보가 없습니다.`);
        });
    },
    getAuthPw({ commit }, user) {
      const API_URL = `${REST_API}/user/change-pw/auth`;
      axios({
        url: API_URL,
        method: "GET",
        params: user,
      })
        .then(() => {
          commit("SET_AUTH_PW_T");
          commit("TMP_USER_ID", user.userid);
          router.push({ name: "userpw" });
        })
        .catch((err) => {
          console.log(err);
          alert(`일치하는 회원 정보가 없습니다.`);
        });
    },
    setPw({ commit }, user) {
      commit;
      const API_URL = `${REST_API}/user/change-pw`;
      axios({
        url: API_URL,
        method: "PUT",
        params: user,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then(() => {
          commit("SET_AUTH_PROFILE_F");
          alert("비밀번호 재설정이 완료되었습니다.");
          commit("USER_LOGOUT");
          router.push({ name: "userlogin" });
        })
        .catch((err) => {
          console.log(err);
          alert(`잘못된 요청입니다.`);
        });
    },
    // 프로필 변경 관련
    getAuthProfile({ commit }, pw) {
      const API_URL = `${REST_API}/user/info/auth`;
      axios({
        url: API_URL,
        method: "POST",
        params: pw,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          if (res.data == "success") {
            commit("SET_AUTH_PROFILE_T");
            router.push({ name: "memberedit" });
          } else {
            alert("비밀번호가 일치하지 않습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(`잘못된 요청입니다.`);
        });
    },
    modifyProfile({ commit }, user) {
      const API_URL = `${REST_API}/user/info/${user.userid}`;
      axios({
        url: API_URL,
        method: "PUT",
        params: user,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then(() => {
          alert("회원정보 수정이 완료되었습니다.");
          commit("DUPL_RESET");
          commit("SET_AUTH_PROFILE_F");
          alert("다시 로그인 해주세요!");
          commit("USER_LOGOUT");
          router.push({ name: "userlogin" });
        })
        .catch((err) => {
          console.log(err);
          alert(`잘못된 요청입니다.`);
        });
    },
    //회원 탈퇴 관련
    userDelete({ commit }) {
      const API_URL = `${REST_API}/user/signout`;
      axios({
        url: API_URL,
        method: "DELETE",
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then(() => {
          alert("회원탈퇴 되었습니다.")
          commit("USER_LOGOUT");
          router.push({ name: "main" });
        })
        .catch((err) => {
          console.log(err);
          alert(`잘못된 요청입니다.`);
        });
    },


    // 채팅 관련
    sendChat({ commit, dispatch }, chat) {
      const API_URL = `${REST_API}/chat/insert`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "POST",
        params: chat,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          if(res.data == "SUCCESS") {
            dispatch("getChats", this.state.startChatNum);
          }
          else {
            commit("GET_STARTNUM", res.data);
            dispatch("getChats", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLastchatNum({ commit, dispatch }) {
      const API_URL = `${REST_API}/chat/recent`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          if(res.data > this.state.lastChatNum) {
            commit("GET_LASTNUM", res.data);
            dispatch("getChats", this.state.startChatNum);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getChats({ commit }, num) {
      const API_URL = `${REST_API}/chat/all/${num}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          console.log(res.data)
          commit("GET_CHATS", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
