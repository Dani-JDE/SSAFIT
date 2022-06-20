<template>
  <v-container>
    <div class="review">
      <div>
        <img
          style="border: 2px solid; border-radius: 70%"
          :src="require(`@/assets/images/${userinfo.profile}.png`)"
          width="40px"
        />
      </div>

      <div class="review-write">
        <b-row>
          <b-col cols="2" class="mt-2"> {{ userinfo.nickname }}</b-col>
          <b-col cols="10">
            <star-rating
              v-model="rating"
              :increment="0.5"
              :star-size="20"
            ></star-rating>
          </b-col>
        </b-row>
        <v-text-field
          @keyup.enter="createReview"
          v-model="content"
          label="리뷰를 작성해주세요"
        ></v-text-field>
      </div>
    </div>
    <div class="btn">
      <b-button variant="outline-secondary" @click="createReview"
        >등록</b-button
      >
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import StarRating from "vue-star-rating";
export default {
  data() {
    return {
      content: "",
      rating: 5,
    };
  },
  computed: {
    ...mapState(["video", "userinfo"]),
  },
  components: {
    StarRating,
  },
  methods: {
    createReview() {
      let newReview = {
        uid: 0,
        vid: this.video.id,
        rate: this.rating * 2,
        content: this.content,
        depth: 0,
      };

      this.$store.dispatch("createReview", newReview);
      this.content = "";
    },
    setRating: function (rating) {
      this.rating = rating;
    },
  },
};
</script>

<style scoped>
.review {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.btn {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
.review-write {
  margin-left: 20px;
  width: 90%;
}
</style>
>
