<template>
  <section class="app-header main-layout full">
    <div class="header-container">
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
            ><span class="home-icon">Home</span>
          </router-link>
          <router-link
            class="router-link hvr-underline-from-center white-underline"
            @click.native="toggleNav"
            to="/pet"
            ><span class="search-icon">Search</span>
          </router-link>
          <router-link
            class="router-link hvr-underline-from-center white-underline"
            @click.native="toggleNav"
            to="/about"
            ><span class="about-icon">About</span>
          </router-link>

          <router-link
            class="router-link hvr-underline-from-center white-underline user-link"
            @click.native="openUserModal()"
            to="/"
          >
            <div v-if="!loggedinUser">
              <span class="user-icon">Login/Signup</span>
            </div>
            <!-- <div v-else class="user-name-avatar"> -->
            <div v-else>
              <span class="user-icon">{{ loggedinUser.username }}</span>
            </div>
          </router-link>

          <!-- <div v-if="!loggedinUser" class="user-login">
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
          </div> -->
        </div>
      </nav>
      <button @click.stop="toggleNav" class="header-nav-humburger">
        <i
          style="font-size: 1.5rem"
          :class="{
            'fa-solid fa-bars': !isNavOpen,
            'fa-solid fa-xmark': isNavOpen,
          }"
        ></i>
      </button>
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
        mainAppEl.style.overflow = "visible";
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
        const mainAppEl = document.querySelector("html");
        this.isNavOpen = !this.isNavOpen;
        if (this.isNavOpen) mainAppEl.style.overflow = "hidden";
        else mainAppEl.style.overflow = "visible";
      },
    },
  };
</script>
