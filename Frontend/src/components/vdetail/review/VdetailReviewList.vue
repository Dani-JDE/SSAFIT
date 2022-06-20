<template>
  <div class="container">
    <div v-if="reviews.length">
      <b-table-simple hover responsive>
        <b-tr v-for="(review, index) in reviews" :key="index + 'p'">
          <b-td>
            <img
              style="border: 2px solid; border-radius: 70%"
              :src="require(`@/assets/images/${review.profile}.png`)"
              width="40px"
            />
          </b-td>
          <b-td width="65%">
            <!-- 리뷰/수정폼 토글 -->
            <div v-if="!editReview[review.id]">
              <b-row>
                <b-col>{{ review.writer }}</b-col>
                <b-col
                  ><star-rating
                    :rating="review.rate / 2"
                    :read-only="true"
                    :increment="0.5"
                    :star-size="20"
                  ></star-rating
                ></b-col>
              </b-row>
              <b-tr>
                {{ review.content }}
              </b-tr>
            </div>
            <!-- 수정폼 -->
            <div v-else>
              <b-row>
                <b-col cols="2" class="mt-2"> {{ review.writer }}</b-col>
                <b-col cols="10">
                  <star-rating
                    v-model="filleditRate[review.id]"
                    :increment="0.5"
                    :star-size="20"
                  ></star-rating>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="review-write mt-2" cols="8">
                  <v-text-field
                    v-model="filleditReview[review.id]"
                    label="별점 및 내용을 수정해주세요"
                    @keyup.enter="updateReview(review.id)"
                  ></v-text-field>
                </b-col>
                <b-col class="btn mt-5" cols="3">
                  <b-button
                    variant="outline-secondary"
                    @click="updateReview(review.id)"
                    class="btn-sm"
                    >등록</b-button
                  >
                  <b-button
                    class="btn-sm"
                    variant="outline-secondary"
                    @click="toggleShowEditReview(review)"
                    >취소</b-button
                  >
                </b-col>
              </b-row>
            </div>

            <!-- 답글작성폼 -->
            <b-tr class="review" :id="index + 'p'" style="display: none">
              <br />
              <b-row>
                <b-col cols="1">
                  <img
                    style="border: 2px solid; border-radius: 70%"
                    :src="require(`@/assets/images/${userinfo.profile}.png`)"
                    width="30px"
                  />
                </b-col>
                <b-col class="review-write" cols="8">
                  {{ userinfo.nickname }}
                  <v-text-field
                    v-model="content[index]"
                    label="답글을 작성해주세요"
                    @keyup.enter="createReply(review.id, index)"
                  ></v-text-field>
                </b-col>
                <b-col class="btn mt-10" cols="3">
                  <b-button
                    variant="outline-secondary"
                    @click="createReply(review.id, index)"
                    class="btn-sm"
                    >등록</b-button
                  >
                  <b-button
                    class="btn-sm"
                    variant="outline-secondary"
                    @click="toggleCreateReply(index + 'p')"
                    >취소</b-button
                  >
                </b-col>
              </b-row>
            </b-tr>
            <br />

            <!-- 답글리스트 -->
            <b-tr>
              <b-link @click="toggleShowReply(review.id)"
                >답글 {{ replyNum[review.id] }}개</b-link
              >

              <div class="reply" :id="review.id" style="display: none">
                <div v-if="replyNum[review.id] == 0">
                  등록된 답글이 없습니다.
                </div>
                <b-tr v-for="(reply, index) in replies" :key="index + 'c'">
                  <div v-if="review.id === reply.re_id">
                    <b-td>
                      <img
                        style="border: 2px solid; border-radius: 70%"
                        :src="require(`@/assets/images/${reply.profile}.png`)"
                        width="30px"
                      />
                    </b-td>
                    <b-td width="70%">
                      <b-tr>{{ reply.writer }}</b-tr>

                      <div v-if="!editReview[reply.id]">
                        <b-tr>{{ reply.content }}</b-tr>
                      </div>
                      <!-- 답글수정 -->
                      <div v-else>
                        <b-row>
                          <b-col class="review-write mt-2" cols="8">
                            <v-text-field
                              v-model="filleditReview[reply.id]"
                              label="내용을 수정해주세요"
                              @keyup.enter="updateReview(reply.id)"
                            ></v-text-field>
                          </b-col>
                          <b-col class="btn mt-5" cols="3">
                            <b-button
                              variant="outline-secondary"
                              @click="updateReview(reply.id)"
                              class="btn-sm"
                              >등록</b-button
                            >
                            <b-button
                              class="btn-sm"
                              variant="outline-secondary"
                              @click="toggleShowEditReview(reply)"
                              >취소</b-button
                            >
                          </b-col>
                        </b-row>
                      </div>
                    </b-td>
                    <b-td>
                      <div v-if="userinfo.id === reply.uid">
                        <v-btn
                          small
                          class="mx-2"
                          @click="toggleShowEditReview(reply)"
                        >
                          <v-icon dark> mdi-pencil </v-icon>
                        </v-btn>
                        <v-btn
                          small
                          class="mx-2"
                          @click="deleteReview(reply.id)"
                        >
                          <v-icon dark> mdi-delete </v-icon>
                        </v-btn>
                      </div>
                    </b-td>
                  </div>
                </b-tr>
              </div>
            </b-tr>
          </b-td>
          <b-td>
            <v-btn @click="toggleCreateReply(index + 'p')">답글</v-btn>
          </b-td>
          <b-td>
            <div v-if="userinfo.id === review.uid">
              <v-btn class="mx-2" @click="toggleShowEditReview(review)">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
              <v-btn class="mx-2" @click="deleteReview(review.id)">
                <v-icon dark>mdi-delete </v-icon>
              </v-btn>
            </div>
          </b-td>
        </b-tr>
      </b-table-simple>
    </div>
    <div v-else>등록된 리뷰가 없습니다.</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StarRating from "vue-star-rating";
export default {
  name: "VdetailReviewList",
  data() {
    return {
      content: [],
      num: [],
      editReview: [],
      filleditReview: [],
      filleditRate: [],
      // editReply:
    };
  },
  computed: {
    ...mapState(["video", "reviews", "userinfo", "replies", "replyNum"]),
  },
  components: {
    StarRating,
  },
  methods: {
    toggleShowEditReview(review) {
      this.filleditReview[review.id] = review.content;
      this.filleditRate[review.id] = review.rate / 2;
      let tmp = this.editReview[review.id];
      console.log(tmp)
      if(tmp === undefined) {
        this.editReview[review.id] = false;
      console.log(this.editReview[review.id]);

      }
      this.editReview.splice(review.id, 1, !tmp? true : false);
      console.log(this.editReview[review.id]);
    },
    toggleCreateReply(index) {
      let e = document.getElementById(index);
      e.style.display = e.style.display != "none" ? "none" : "block";
    },
    toggleShowReply(reviewid) {
      let e = document.getElementById(reviewid);
      e.style.display = e.style.display != "none" ? "none" : "block";
    },
    createReply(re_id, index) {
      let newReply = {
        uid: 0,
        vid: this.video.id,
        content: this.content[index],
        depth: 1,
        re_id,
      };
      this.$store.dispatch("createReview", newReply);
      this.content[index] = "";
    },
    updateReview(id) {
      let modify = {
        id: id,
        vid: this.video.id,
        content: this.filleditReview[id],
        rate: this.filleditRate[id] * 2,
      };
      this.$store.dispatch("modifyReview", modify);
      this.editReview.splice(id, 1, false);
      // 객체만들어서 수정내용(review는 별점 포함, reply는 미포함) dispatch 후,
      //  edit폼 끄기 (토글)
    },
    deleteReview(id) {
      let payload = { id: id, vid: this.video.id };
      this.$store.dispatch("deleteReview", payload);
    },
  },
  created() {
    for (let i = 0; i < this.reviews.length; i++) {
      this.content[i] = "";
    }
  },
};
</script>

<style></style>
