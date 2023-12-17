<template>
  <section class="app-header main-layout full">
    <div class="header-container">
      <button @click.stop="toggleNav" class="header-nav-humburger">☰</button>
      <nav>
        <router-link class="logo-container" to="/"
          ><span class="logo"></span
          ><span class="logo-text">FurrFriends</span></router-link
        >
      </nav>
      <nav class="header-nav-wide">
        <div
          class="right-side-nav"
          :class="{ 'right-side-nav-display': isNavOpen }"
        >
          <router-link
            class="router-link hvr-underline-from-center white-underline"
            @click.native="toggleNav"
            to="/"
            >Home</router-link
          >
          <router-link
            class="router-link hvr-underline-from-center white-underline"
            @click.native="toggleNav"
            to="/pet"
            >Search</router-link
          >
          <router-link
            class="router-link hvr-underline-from-center white-underline"
            @click.native="toggleNav"
            to="/about"
            >About</router-link
          >
        </div>
        <div v-if="!loggedinUser" class="user-login">
          <button
            class="router-link hvr-underline-from-center white-underline"
            @click="openUserModal()"
          >
            Login/Signup
          </button>
        </div>

        <div
          v-else
          class="user-login hvr-underline-from-center white-underline"
          @click="openUserModal()"
        >
          <button class="user-name-avatar">
            {{ loggedinUser.username }}
          </button>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
  export default {
    name: "app-header",
    components: {},
    props: {},
    mounted() {
      const mainAppEl = document.querySelector("html");
      mainAppEl.addEventListener("click", () => {
        this.isNavOpen = false;
      });
    },
    data() {
      return {
        isNavOpen: false,
      };
    },
    computed: {
      loggedinUser() {
        return this.$store.getters.loggedinUser;
      },
    },
    methods: {
      openUserModal() {
        this.$store.commit({ type: "toggleUserModal" });
      },
      toggleNav() {
        this.isNavOpen = !this.isNavOpen;
      },
    },
  };
</script>
