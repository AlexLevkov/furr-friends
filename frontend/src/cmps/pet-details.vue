<template>
  <!-- <section class="pet-details main-layout"> -->
  <section class="main-layout min-height">
    <div v-if="pet" class="pet-details-container">
      <div v-if="pet.imgUrl" class="pet-details-pic-container">
        <article class="article-img-select">
          <img
            class="img-details img-1"
            :src="require('@/assets/images/animal/' + petImgSelected)"
          />
        </article>

        <div class="pet-preview-selector">
          <span class="img-arrow hvr-rotate" @click="changeMainPic('left')"
            ><i class="fa-solid fa-left-long"></i
          ></span>
          <article class="article-img-preview" @click="changeMainPic(0)">
            <img
              class="img-details"
              :src="require('@/assets/images/animal/' + petImg1)"
            />
          </article>
          <article class="article-img-preview" @click="changeMainPic(1)">
            <img
              class="img-details"
              :src="require('@/assets/images/animal/' + petImg2)"
            />
          </article>
          <article class="article-img-preview" @click="changeMainPic(2)">
            <img
              class="img-details"
              :src="require('@/assets/images/animal/' + petImg3)"
            />
          </article>
          <span @click="changeMainPic('right')" class="img-arrow hvr-forward"
            ><i class="fa-solid fa-right-long"></i
          ></span>
        </div>
      </div>

      <div class="pet-bio-container">
        <div class="pet-bio">
          <h2>{{ pet.name }}'s Story:</h2>
          <p>{{ this.petBio }}</p>
        </div>
        <div class="pet-details-likes">
          🧡 Liked by {{ pet.likes }} Users 🧡
        </div>

        <div class="pet-properties">
          <div class="flex-left">
            <span
              :class="{
                'pet-vaccinated pet-tag': pet.isVaccinated,
              }"
              v-show="pet.isVaccinated"
            >
              Received Vaccines</span
            >
            <span class="pet-trained pet-tag">
              Training: {{ pet.trainedLevel }}</span
            >

            <span
              :class="{
                'pet-safe pet-tag': pet.isSafeWithChild,
              }"
              v-show="pet.isSafeWithChild"
            >
              Safe with Children</span
            >
            <span
              :class="{
                'pet-castrated pet-tag': pet.isCastrated,
              }"
              v-show="pet.isCastrated"
            >
              Castrated</span
            >
            <span
              :class="{
                'pet-birth-certificate pet-tag': pet.isBirthCertificate,
              }"
              v-show="pet.isBirthCertificate"
            >
              Birth Certificate</span
            >
            <!-- <span class="pet-check pet-tag"> check</span>
            <span class="pet-random pet-tag"> random</span> -->
          </div>

          <div class="flex-right">
            <span
              :class="{
                'pet-dog pet-tag': pet.type === 'dog',
                'pet-cat pet-tag': pet.type === 'cat',
                'pet-fish pet-tag': pet.type === 'fish',
                'pet-rabbit pet-tag': pet.type === 'rabbit',
                'pet-parrot pet-tag': pet.type === 'parrot',
              }"
            >
              {{ pet.breed }}</span
            >
            <span class="pet-age pet-tag"> {{ pet.age }} years old</span>
            <span class="pet-weight pet-tag"> size: {{ pet.size }}</span>

            <span
              :class="{
                'pet-gender-male pet-tag': pet.gender === 'male',
                'pet-gender-female pet-tag': pet.gender === 'female',
              }"
            >
              {{ pet.gender }}</span
            >
            <span
              :class="{
                'pet-playful pet-tag': pet.isPlayful,
              }"
              v-show="pet.isPlayful"
            >
              Playful</span
            >
          </div>
        </div>

        <el-button
          @click="adoptPet"
          class="adopt-btn hvr-grow-rotate"
          type="success"
          round
        >
          Adopt Now!
        </el-button>

        <div class="pet-visit-share-container">
          <el-button
            class="pet-visit-owner-btn hvr-bounce-in"
            @click="showOwner"
            type="info"
            round
            >Visit Owner</el-button
          >

          <el-button
            class="pet-share-facebook hvr-wobble-skew"
            @click="shareOnFacebook"
            type="info"
            round
            >Share</el-button
          >
        </div>
      </div>
    </div>
    <!-- <pre>
      {{ pet }}
    </pre> -->
  </section>
</template>

<script>
  import { petService } from "../service/pet.service.js";
  import { socketService } from "../service/socket.service.js";
  export default {
    name: "pet-details",
    components: {},
    props: {},
    created() {
      this.getPet();
      window.scrollTo(0, 0);
    },
    data() {
      return {
        pet: {},
        picNum: 0,
      };
    },
    computed: {
      petId() {
        return this.$route.params.petId;
      },
      loggedinUser() {
        return this.$store.getters.loggedinUser;
      },
      petImg1() {
        return this.pet.imgUrl[0];
      },
      petImg2() {
        return this.pet.imgUrl[1];
      },
      petImg3() {
        return this.pet.imgUrl[2];
      },
      petImgSelected() {
        return this.pet.imgUrl[this.picNum];
      },
      petBio() {
        const gender = this.pet.gender === "male" ? "He" : "She";
        return `${this.pet.name} is a beautiful ${this.pet.type} looking for a new home.
      ${gender} is ${this.pet.age} years old, ${this.pet.color} colored and got ${this.pet.likes} likes on our site!
      Please see below more information about ${this.pet.name}.
      If you wish to adopt ${this.pet.name}, you may contact the owner - ${this.pet.owner.fullname} by clicking the "Adopt Now" button below.
      `;
      },
    },
    methods: {
      async getPet() {
        try {
          let petId = this.petId;
          let pet = await petService.getById(petId);
          this.pet = pet;
        } catch (err) {
          console.log(err);
        }
      },
      adoptPet() {
        if (this.loggedinUser) {
          if (this.loggedinUser._id === this.pet.owner._id) {
            const userName = this.pet.owner.fullname;
            const message = `This is your adoption offer, please select another`;
            const type = "warning";
            // update user
            this.$message({
              message,
              type,
            });
            return;
          }
          const orderToSave = {
            orderBy: this.loggedinUser,
            orderFor: this.pet,
            orderOwner: this.pet.owner,
            created: Date.now(),
          };
          this.$store // update store
            .dispatch({ type: "saveOrder", orderToSave })
            .then((savedOrder) => {
              // const petName = savedOrder.orderFor.name;
              const message =
                savedOrder.msg || `Your adoption request has been sent`;
              const type = savedOrder.type || "success";
              // update user
              this.$message({
                message,
                type,
              });
              // update socket
              const data = {
                type: "update-orders",
              };
              socketService.emit("order-msg", data);
            })
            .catch((err) => {
              console.log("err:", err);
              this.$message({
                message: "Error, please try again later",
                type: "error",
              });
            });
        } else {
          this.$store.commit({ type: "toggleUserModal" });
        }
      },
      showOwner() {
        if (this.loggedinUser) {
          this.$router.push({
            name: "user-details",
            params: { userId: this.pet.owner._id },
          });
        } else {
          this.$store.commit({ type: "toggleUserModal" });
        }
      },
      changeMainPic(num) {
        if (typeof num === "string") {
          if (num === "right") {
            this.picNum = this.picNum === 2 ? 0 : this.picNum + 1;
          }
          if (num === "left") {
            this.picNum = this.picNum === 0 ? 2 : this.picNum - 1;
          }
          return;
        }
        this.picNum = num;
      },
      shareOnFacebook() {
        const link = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${link}`);
      },
    },
  };
</script>
