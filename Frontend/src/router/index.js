import Vue from "vue";
import VueRouter from "vue-router";
// view
import MainView from "@/views/MainView.vue";
import UserView from "@/views/UserView.vue";
import MemberView from "@/views/MemberView.vue";
import SearchView from "@/views/SearchView.vue";
import VlistView from "@/views/VlistView.vue";
import VdetailView from "@/views/VdetailView.vue";
import LivechatView from "@/views/LivechatView";
// component
import UserLogin from "@/components/user/UserLogin.vue";
import UserSignup from "@/components/user/UserSignup.vue";
import UserId from "@/components/user/UserId.vue";
import UserCheck from "@/components/user/UserCheck.vue";
import UserPw from "@/components/user/UserPw.vue";

import MemberCheck from "@/components/member/MemberCheck.vue";
import MemberEdit from "@/components/member/MemberEdit.vue";

import VlistLike from "@/components/vlist/VlistLike.vue";
import VlistWatched from "@/components/vlist/VlistWatched.vue";

// vuex
import store from "@/store/index.js";

Vue.use(VueRouter);

// 네비게이션 가드
const requireAuth = () => (to, from, next) => {
  if (store.getters.getIsLogin) {
    return next();
  }
  next("/user/login");
  alert("로그인이 필요한 서비스입니다.");
};

const setPWAuth = () => (to, from, next) => {
  if (store.getters.getPwAuth) {
    return next();
  }
  next("/user/check");
  alert("본인확인이 필요합니다.");
};

const editProfieAuth = () => (to, from, next) => {
  if (store.getters.getProfileAuth) {
    return next();
  }
  next("/member/check");
  alert("본인확인이 필요합니다.");
};

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    children: [
      {
        path: "login",
        name: "userlogin",
        component: UserLogin,
      },
      {
        path: "signup",
        name: "usersignup",
        component: UserSignup,
      },
      {
        path: "id",
        name: "userid",
        component: UserId,
      },
      {
        path: "check",
        name: "usercheck",
        component: UserCheck,
      },
      {
        path: "pw",
        name: "userpw",
        component: UserPw,
        beforeEnter: setPWAuth(),
      },
    ],
  },
  {
    path: "/member",
    name: "member",
    component: MemberView,
    beforeEnter: requireAuth(),
    children: [
      {
        path: "check",
        name: "membercheck",
        component: MemberCheck,
      },
      {
        path: "edit",
        name: "memberedit",
        component: MemberEdit,
        beforeEnter: editProfieAuth(),
      },
    ],
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
  },
  {
    path: "/vlist",
    name: "vlist",
    component: VlistView,
    beforeEnter: requireAuth(),
    children: [
      {
        path: "like",
        name: "vlistlike",
        component: VlistLike,
      },
      {
        path: "watched",
        name: "vlistwatched",
        component: VlistWatched,
        children: [],
      },
    ],
  },
  {
    path: "/vdetail/:id",
    name: "vdetail",
    component: VdetailView,
    beforeEnter: requireAuth(),
    // 추가해야함
    // children: [
    //   path: ""
    // ]
  },

  // 팀별 기능
  {
    path: "/livechat",
    name: "livechat",
    component: LivechatView,
    beforeEnter: requireAuth(),
    // 컴포넌트로 room 연결
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    //스크롤을 0,0 위치로 되돌림
    return { x: 0, y: 0 };
  },
});

export default router;
