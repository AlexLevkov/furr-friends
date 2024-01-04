<template>
  <section class="user-main main-layout">
    <div
      v-if="!hint"
      :class="{
        'user-form-container': true,
        'loggedin-modal': loggedinUser,
      }"
    >
      <div class="login-btns">
        <button @click.prevent="showHint" class="hint">
          <img :src="require('@/assets/images/hint.gif')" />
        </button>
        <el-button
          class="close-modal-btn"
          @click="closeModal()"
          type="info"
          circle
          >X</el-button
        >
      </div>

      <form class="login-form" @submit.prevent="login()" v-if="!loggedinUser">
        <h2 class="flex center">Please Login</h2>

        <el-input
          required
          placeholder="User Name"
          v-model="selectedUsername"
          clearable
        >
        </el-input>

        <el-input
          required
          placeholder="Password"
          v-model="password"
          show-password
        ></el-input>
        <el-button class="user-login-btn" @click="login()" type="success" round
          >Login</el-button
        >
      </form>

      <form class="signup-form" @submit.prevent="signup()" v-if="!loggedinUser">
        <h2>Or Signup</h2>
        <el-input
          required
          placeholder="Full name"
          v-model="newUser.fullname"
          clearable
        >
        </el-input>
        <el-input
          required
          placeholder="User Name"
          v-model="newUser.username"
          clearable
        >
        </el-input>
        <el-input
          required
          placeholder="Password"
          v-model="newUser.password"
          show-password
        ></el-input>
        <el-button class="user-login-btn" @click="signup()" type="success" round
          >Signup</el-button
        >
      </form>

      <div v-if="loggedinUser" class="loggedin-modal-btns">
        <h1 class="user-name-avatar">Dear {{ loggedinUser.fullname }}</h1>

        <el-button
          class="modal-manage-btn"
          @click="manageAccount"
          type="info"
          round
          >Manage Your Account</el-button
        >

        <el-button class="modal-manage-btn" @click="logout" type="info" round
          >Logout</el-button
        >
      </div>

      <div v-if="hint"></div>
    </div>

    <div v-if="hint" class="user-form-container loggedin-modal">
      <div class="login-btns">
        <button @click.prevent="showHint" class="hint">
          <img :src="require('@/assets/images/hint.gif')" />
        </button>
        <el-button
          class="close-modal-btn"
          @click="closeModal()"
          type="info"
          circle
          >X</el-button
        >
      </div>
      <h2>Dear Guest</h2>
      <p class="hint-p">Welcome to the app's testing area</p>
      <p class="hint-p">Click below to continue as a guest.</p>
      <el-button
        class="user-login-btn"
        type="success"
        @click="loginGuest()"
        round
        >Continue</el-button
      >
    </div>
  </section>
</template>

<script>
  export default {
    name: "user-main",
    components: {},
    props: {},
    created() {
      this.$store.dispatch("loadUsers");
    },
    data() {
      return {
        newUser: {
          fullname: "",
          username: "",
          password: "",
          isAdmin: false,
        },
        selectedUsername: null,
        password: "",
        hint: false,
      };
    },
    computed: {
      users() {
        return this.$store.getters.users;
      },
      loggedinUser() {
        return this.$store.getters.loggedinUser;
      },
    },
    methods: {
      signup() {
        if (
          !this.newUser.username ||
          !this.newUser.fullname ||
          !this.newUser.password
        )
          return;
        this.$store
          .dispatch({ type: "signup", userCred: this.newUser })
          .then(() => {
            this.newUser.username = "";
            this.newUser.fullname = "";
            this.newUser.password = "";
          });
      },
      login() {
        const selectedUser = this.users.find(
          (user) => user.username === this.selectedUsername
        );
        if (!selectedUser) {
          this.message("Invalid User Name", "warning");
          return;
        }
        selectedUser.password = this.password;
        this.$store
          .dispatch({ type: "login", userCred: selectedUser })
          .then(() => {
            this.selectedUsername = null;
            this.password = "";
            this.message(`Welcome ${selectedUser.fullname}`, "success");
          })
          .catch((error) => {
            console.log("error:", error);
            this.message("Failed to Login", "warning");
          });
      },
      loginGuest() {
        const selectedUser = {
          username: "Guest",
          password: "1234",
          _id: "6444f0c5963c843d28d04240",
        };
        this.$store
          .dispatch({ type: "login", userCred: selectedUser })
          .then(this.showHint());
      },
      logout() {
        this.$store.dispatch({ type: "logout" }).then(() => {
          if (this.$route.name !== "home") this.$router.push({ name: "home" });
        });
      },
      closeModal() {
        this.$store.commit({ type: "toggleUserModal" });
        // login
        this.selectedUsername = null;
        this.password = "";
        // signup
        this.newUser.fullname = "";
        this.newUser.username = "";
        this.newUser.password = "";
        this.hint = false;
      },
      manageAccount() {
        this.closeModal();
        this.$router.push({
          name: "user-details",
          params: { userId: this.loggedinUser._id },
        });
      },
      showHint() {
        this.hint = !this.hint;
      },
      message(message, type) {
        this.$message({ message, type });
      },
    },
  };
</script>
