<template>
  <div class="container">
    <div>
      <b-row>
        <b-col><h2>유저 리뷰 </h2></b-col>
        <b-col><h5 class="mt-3">{{ nums }}개</h5></b-col>
          <b-col cols="8"
                  >평점: <star-rating
                    :rating="video.avgRate / 2 > 0 ? video.avgRate / 2 : 0"
                    :read-only="true"
                    :increment="0.5"
                    :star-size="20"
                  ></star-rating
                ></b-col>
      </b-row>
    </div>
    <hr />
    <div class="container">
      <vdetail-review-create />
      <vdetail-review-list></vdetail-review-list>
    </div>
  </div>
</template>

<script>
import VdetailReviewList from "@/components/vdetail/review/VdetailReviewList.vue";
import VdetailReviewCreate from "@/components/vdetail/review/VdetailReviewCreate.vue";
import StarRating from "vue-star-rating";
import { mapState } from "vuex";

export default {
  name: "VdetailReview",
  components: {
    VdetailReviewList,
    VdetailReviewCreate,
    StarRating,
  },
  computed: {
    ...mapState(["reviews", "video"]),
    nums() {
      return this.reviews.length;
    },
  },
};
</script>

<style></style>
