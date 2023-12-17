<template>
  <div id="app">
    <user v-show="isUserModal" class="user-modal"></user>
    <app-header></app-header>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import user from "@/cmps/user.vue";
import appHeader from "./cmps/app-header.vue";
import appFooter from "./cmps/app-footer.vue";

export default {
  components: {
    user,
    appHeader,
    appFooter,
  },
  async created() {
    await this.$store.dispatch({ type: "loadPets" });
    await this.$store.dispatch({ type: "loadOrders" });
    this.pets = this.$store.getters.petsToShow;
    this.users = this.$store.getters.users;
    this.orders = this.$store.getters.orders;
  },
  data() {
    return {
      pets: [],
      orders: [],
      users: [],
    };
  },
  computed: {
    isUserModal() {
      return this.$store.getters.userModal;
    },
  },
};
</script>
