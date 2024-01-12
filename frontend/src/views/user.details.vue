<template>
  <section v-if="user" class="user-details main-layout min-height">
    <h2>{{ user.fullname }}</h2>
    <div class="user-info-container">
      <div class="user-img">
        <img
          class="user-avatar"
          :src="require('@/assets/images/user/' + 'user-solid.svg')"
        />
      </div>
      <div class="user about">
        <h2>About</h2>
        <p>
          {{ user.about }}
        </p>
      </div>
    </div>

    <!-- <el-button
      @click="toggleReview"
      type="success"
      round
      v-if="loggedinUser._id !== user._id"
      >Add Review</el-button
    > -->

    <ul v-if="loggedinUserOrders.length && loggedinUser._id === user._id">
      <li>
        <h2>My Adoption Requests:</h2>
        <hr />
      </li>
      <li v-for="order in loggedinUserOrders" :key="order._id">
        <p>{{ new Date(order.created).toLocaleString() }}</p>

        <div class="order-container">
          <div class="img-request-container">
            <img
              class="img-request"
              :src="
                require('@/assets/images/animal/' + order.orderFor.imgUrl[0])
              "
            />
          </div>

          <div v-if="!order.isApproved" class="order-details">
            <p class="pet-order-p">Dear {{ order.orderBy.fullname }},</p>
            <p class="pet-order-p">
              Your addoption request for
              <span class="bold">{{ order.orderFor.name }}</span>
              has been delivered.
            </p>
            <p class="pet-order-p">
              <span class="bold">{{ order.orderOwner.fullname }}</span
              >, the owner, will update you soon.
            </p>
            <p class="pet-order-p">
              In the meanwhile you can choose one of the following actions:
            </p>
          </div>

          <div v-else>
            Congratulations {{ order.orderBy.fullname }}! Your adoption request
            for {{ order.orderFor.name }} has been approved. Please contact
            {{ order.orderOwner.fullname }} to complete the adoption process.
            <p class="pet-order-p">phone:0782634186</p>
            <p class="pet-order-p">mail:ARC@gmail.com</p>
            <p class="pet-order-p">good luck!😀</p>
          </div>

          <div class="request-action-container">
            <el-button
              class="action-btn"
              @click="removeOrder(order._id)"
              type="success"
              round
            >
              Delete Request</el-button
            >

            <el-button
              class="action-btn"
              @click="goToPet(order.orderFor._id)"
              type="success"
              round
              >Visit {{ order.orderFor.name }}'s' Page
            </el-button>
            <el-button
              class="action-btn"
              @click="goToUser(order.orderOwner._id)"
              type="success"
              round
            >
              Visit Owner's Page
            </el-button>
          </div>
        </div>

        <hr />
      </li>
    </ul>

    <ul v-if="loggedinUserPending.length && loggedinUser._id === user._id">
      <li><h2>Incoming Adoption Requests</h2></li>
      <li v-for="order in loggedinUserPending" :key="order._id">
        <hr />
        <p>{{ new Date(order.created).toLocaleString() }}</p>
        <div class="order-container">
          <div class="img-request-container">
            <img
              class="img-request"
              :src="
                require('@/assets/images/animal/' + order.orderFor.imgUrl[0])
              "
            />
          </div>
          <div v-if="!order.isApproved" class="order-details">
            <p class="pet-order-p">Dear {{ order.orderOwner.fullname }},</p>
            <p class="pet-order-p">
              We are happy to inform you about a new adoption request for
              <span class="bold">{{ order.orderFor.name }}.</span>
            </p>

            <p class="pet-order-p">
              The request was sent by
              <span class="bold">{{ order.orderBy.fullname }}</span>
            </p>
            <p class="pet-order-p">
              Please select one of the following actions:
            </p>
          </div>

          <div v-else>
            <p class="pet-order-p">Dear {{ order.orderOwner.fullname }},</p>
            Your approval for the adoption of
            {{ order.orderFor.name }} has been successfully submitted.Please
            wait for a call/email from {{ order.orderBy.fullname }} to contact
            you.
          </div>

          <div class="request-action-container">
            <el-button
              v-if="!order.isApproved"
              @click="approveOrder(order)"
              type="success"
              round
            >
              Approve Request
            </el-button>
            <el-button
              class="action-btn"
              @click="removeOrder(order._id)"
              type="success"
              round
            >
              Delete Request
            </el-button>
            <el-button
              class="action-btn"
              @click="goToPet(order.orderFor._id)"
              type="success"
              round
            >
              Visit {{ order.orderFor.name }}'s Page
            </el-button>
            <el-button
              class="action-btn"
              @click="goToUser(order.orderBy._id)"
              type="success"
              round
            >
              Visit {{ order.orderBy.fullname }}'s Page
            </el-button>
          </div>
        </div>
      </li>
    </ul>

    <form v-if="isReviewOpen" @submit.prevent="addReview">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 3 }"
        placeholder="Please Enter Review"
        v-model="reviewText"
      >
      </el-input>

      <el-button @click="addReview" type="success" round>Post</el-button>
    </form>

    <div
      :class="{
        'pet-form-container': true,
        'modal-close': !isFormOpen,
      }"
    >
      <form class="add-pet-form" v-if="isFormOpen" @submit.prevent="addPet">
        <div>
          <h2>Please Add Your Pet's Details</h2>
          <label class="pet-label">
            Name:
            <el-input
              class="pet-name"
              v-model="petToAdd.name"
              placeholder="Pet's name"
            ></el-input>
          </label>
        </div>

        <label class="pet-label"
          >Type:

          <el-select v-model="petToAdd.type" placeholder="Select Pet Type">
            <el-option :label="'Dog'" :value="'dog'">dog</el-option>
            <el-option :label="'Cat'" :value="'cat'">cat</el-option>
            <el-option :label="'Fish'" :value="'fish'">fish</el-option>
          </el-select>
        </label>

        <label class="pet-label"
          >Size:

          <el-select v-model="petToAdd.size" placeholder="Select Pet Size">
            <el-option :label="'Small'" :value="'small'">Small</el-option>
            <el-option :label="'Medium'" :value="'medium'">Medium</el-option>
            <el-option :label="'Large'" :value="'large'">Large</el-option>
          </el-select>
        </label>

        <label class="pet-label"
          >Training Level:
          <el-select
            v-model="petToAdd.trainedLevel"
            placeholder="Select Pet Type"
          >
            <el-option :label="'None'" :value="'none'">None</el-option>
            <el-option :label="'Basic'" :value="'basic'">Basic</el-option>
            <el-option :label="'Advanced'" :value="'advanced'"
              >Advanced</el-option
            >
          </el-select>
        </label>

        <label class="pet-label pet-box"
          >Gender:
          <el-radio v-model="petToAdd.gender" label="male"></el-radio>

          <el-radio v-model="petToAdd.gender" label="female"></el-radio>
        </label>

        <label class="pet-label pet-box"
          >Age:
          <input
            v-model="petToAdd.age"
            type="range"
            id="age"
            name="age"
            min="0"
            max="20"
            step="0.1"
          />
          <span id="sAge">{{ petToAdd.age }} years</span>
        </label>

        <el-checkbox class="pet-box" v-model="petToAdd.isVaccinated"
          >Vaccinated</el-checkbox
        >

        <el-checkbox class="pet-box" v-model="petToAdd.isSafeWithChild"
          >Safe With Children</el-checkbox
        >

        <el-checkbox class="pet-box" v-model="petToAdd.isPlayfull"
          >Playfull</el-checkbox
        >

        <el-button @click="addPet" type="success" round class="save-btn"
          >Save</el-button
        >
        <el-button
          class="close-modal-btn"
          @click="closeModal"
          type="info"
          circle
          >X</el-button
        >
      </form>
    </div>

    <article
      class="user-reviews"
      v-for="review in user.reviews"
      :key="review.byUser"
    >
      <h3>Given by {{ review.byUser }}</h3>
      <p>{{ review.text }}</p>
      <hr />
    </article>
  </section>
</template>

<script>
  import { userService } from "../service/user.service.js";
  import { petService } from "../service/pet.service.js";
  import petList from "../cmps/pet-list.vue";
  import { socketService } from "../service/socket.service.js";
  export default {
    name: "user-details",
    components: {
      petList,
    },
    props: {},
    mounted() {
      const { userId } = this.$route.params;
      userService.getById(userId).then((user) => {
        this.user = user;
      });
      this.petToAdd = petService.getEmptyPet();
      socketService.on("update-orders", () => {
        // console.log("update-orders");
        this.getOrders();
      });
    },
    data() {
      return {
        user: null,
        isAdopted: false,
        isFormOpen: false,
        petToAdd: null,
        isReviewOpen: false,
        reviewText: "",
      };
    },
    computed: {
      // FIX: this is for the dev
      orders() {
        return this.$store.getters.orders;
      },
      usersPets() {
        return this.$store.getters.petsToShow.filter(
          (pet) => pet.owner._id === this.user._id
        );
      },
      isLoggedinUser() {
        // is the loggedin user is page's user
        return this.$store.getters.loggedinUser._id === this.user._id;
      },
      loggedinUser() {
        return this.$store.getters.loggedinUser;
      },
      loggedinUserOrders() {
        return this.$store.getters.orders.filter((order) => {
          if (order._id) return order.orderBy._id === this.user._id; // BUG:
        });
      },
      loggedinUserPending() {
        return this.$store.getters.orders.filter((order) => {
          if (order._id) return order.orderOwner._id === this.user._id;
        });
      },
    },

    methods: {
      isOrderApproved(idx) {
        console.log("idx:", idx);
        // this.$store.getters.pet("getPet", { idx });
        return true;
      },
      toggleForm() {
        this.isFormOpen = !this.isFormOpen;
      },
      toggleReview() {
        this.isReviewOpen = !this.isReviewOpen;
      },
      addPet() {
        const petToAdd = JSON.parse(JSON.stringify(this.petToAdd));
        petToAdd.owner = {
          fullname: this.user.fullname,
          _id: this.user._id,
        };
        this.$store.dispatch({ type: "savePet", petToAdd }).then(() => {
          this.petToAdd = petService.getEmptyPet();
          this.toggleForm();
        });
        // this.$store.commit({ type: "toggleUserModal" });
      },
      editPet(petToEdit) {
        this.toggleForm();
        this.petToAdd = petToEdit;
      },
      addReview() {
        const review = {
          byUser: this.$store.getters.loggedinUser.fullname,
          text: this.reviewText,
        };
        this.$store
          .dispatch({
            type: "addReview",
            review: review,
            user: this.user,
          })
          .then(() => {
            this.reviewText = "";
            this.toggleReview();
          });
      },
      removeOrder(orderId) {
        const data = {
          type: "update-orders",
          action: "delete",
        };
        this.$store
          .dispatch({ type: "removeOrder", orderId })
          .then(socketService.emit("order-msg", data));
      },
      approveOrder(order) {
        const orderToSave = { ...order, isApproved: true };
        const data = {
          type: "update-orders",
          action: "approved",
        };
        this.$store
          .dispatch({ type: "saveOrder", orderToSave })
          .then(socketService.emit("order-msg", data));

        // this.isAdopted = true; // FIX:
        // const newOwner = order.orderBy;
        // let petToAdd = order.orderFor;
        // petToAdd.owner = newOwner;
        // this.$store.dispatch({
        //   type: "savePet",
        //   petToAdd,
        // });
        //   .then((pet) => {
        //     // this.removeOrder(order._id);
        //     socketService.emit("order approved", pet);
        //   });
      },
      goToPet(petId) {
        this.$router.push({
          name: "pet-details",
          params: { petId },
        });
      },
      // showUserDetails() {
      // 	this.$router.push({
      // 		name: "pet-details",
      // 		params: { petId: this.pet._id },
      // 	});
      // },
      goToUser(userId) {
        this.$router.push(`/user/${userId}`);
      },
      closeModal() {
        this.isFormOpen = !this.isFormOpen;
        // this.$store.commit({ type: "toggleUserModal" });
      },
      getOrders() {
        this.$store.dispatch({ type: "loadOrders" });
      },
      loadPets() {
        this.$store.dispatch({ type: "loadPets" });
      },
    },

    watch: {
      "$route.params.userId": {
        immediate: true,
        handler() {
          const { userId } = this.$route.params;
          userService.getById(userId).then((user) => (this.user = user));
          this.isAdopted = false;
        },
      },
    },
  };
</script>
