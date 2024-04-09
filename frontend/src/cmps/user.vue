<template>
  <section class="user-main main-layout">
    <div
      :class="{
        'user-form-container': true,
        'loggedin-modal': loggedinUser,
      }"
    >
      <nav class="login-btns" v-if="!loggedinUser">
        <button @click="navLogin(true)">
          <h2>Login</h2>
        </button>
        <span>|</span>
        <button @click="navLogin(false)">
          <h2>Signup</h2>
        </button>

        <button @click="closeModal()" class="close-modal-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </nav>

      <form
        class="login-form"
        @submit.prevent="login()"
        v-if="!loggedinUser && isLoginMenu"
      >
        <!-- <h2 class="flex center">Please Login</h2> -->

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
        <h3>For Demo Login:</h3>
        <el-button
          class="user-login-btn"
          type="success"
          @click="loginGuest()"
          round
          >Continue</el-button
        >
      </form>

      <form
        class="signup-form"
        @submit.prevent="signup()"
        v-if="!loggedinUser && !isLoginMenu"
      >
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
        isLoginMenu: true,
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
      navLogin(value) {
        this.isLoginMenu = value;
      },
      signup() {
        if (
          !this.newUser.username ||
          !this.newUser.fullname ||
          !this.newUser.password
        ) {
          this.message("Please Enter Valid Credentials", "warning");
          return;
        }
        this.$store
          .dispatch({ type: "signup", userCred: this.newUser })
          .then(() => {
            this.message(`Welcome ${this.newUser.fullname}`, "success");
            this.newUser.username = "";
            this.newUser.fullname = "";
            this.newUser.password = "";
          })
          .catch((err) => console.log(err));
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
            this.message("Failed to Login", "error");
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

      message(message, type) {
        this.$message({ message, type, duration: 3500, showIcon: true });
      },
    },
  };
</script>
