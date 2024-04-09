<template>
  <section class="app-home main-layout min-height">
    <div class="hero full">
      <div class="slogan">
        <h2>
          <span>Adoption makes at least</span>
          <br />
          <span> two lives happier </span>
        </h2>
      </div>
    </div>

    <h2>Top liked pets</h2>
    <pet-list :pets="sortedByLikes" :isHomepage="true"></pet-list>
  </section>
</template>

<script>
  import petApp from "./pet-app.vue";
  import petList from "../cmps/pet-list.vue";
  export default {
    name: "app-home",
    components: {
      petApp,
      petList,
    },
    props: {},
    created() {},
    data() {
      return {};
    },
    computed: {
      sortedByLikes() {
        return this.$store.getters.sortedByLikes;
      },
    },
    methods: {},
  };
</script>
