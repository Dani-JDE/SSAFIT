<template>
  <div>
    <vdetail-video />
    <vdetail-review />
  </div>
</template>

<script>
import VdetailVideo from "@/components/vdetail/VdetailVideo.vue";
import VdetailReview from "@/components/vdetail/VdetailReview.vue";
import { mapState } from "vuex";

export default {
  components: {
    VdetailVideo,
    VdetailReview,
  },
  computed: {
    ...mapState(["video", "reviews"]),
  },
  created() {
    const pathName = new URL(document.location).pathname.split("/");
    const id = pathName[pathName.length - 1];
    this.$store.dispatch("getVideo", id);
    this.$store.dispatch("getReviews", id);
  },
  methods: {
    // moveUpdate() {
    //   this.$router.push({ name: "boardUpdate" });
    // },
    // deleteBoard() {
    //   this.$store.dispatch("deleteBoard", this.board.id);
    // },
  },
};
</script>

<style></style>
