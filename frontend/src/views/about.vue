<template>
  <section class="app-about min-height main-layout">
    <h1>About</h1>
    <p class="about-p">
      Thank you for visitng FurrFriends. 🐶👍 This conceptual app has been
      designed with love for animals and passion for code. The app is developed
      to ensure a smooth and enjoyable journey as you explore the various
      features offered. Find more projects
      <a style="color: darkred" href="https://alexlevkov.com" target="_blank"
        >here.</a
      >
    </p>
    <div class="about-main">
      <h1>Tech Stack</h1>

      <div class="tech-container">
        <div>
          <img
            class="tech-img"
            :src="require('@/assets/images/tech/html5.png')"
            alt=""
          />
        </div>
        <div>
          <img
            class="tech-img"
            :src="require('@/assets/images/tech/css.png')"
            alt=""
          />
        </div>
        <div>
          <img
            class="tech-img"
            :src="require('@/assets/images/tech/js.png')"
            alt=""
          />
        </div>
        <div>
          <img
            class="tech-img"
            :src="require('@/assets/images/tech/sass.png')"
            alt=""
          />
        </div>
        <div>
          <img
            class="tech-img"
            :src="require('@/assets/images/tech/vue.png')"
            alt=""
          />
        </div>
        <div>
          <img
            class="tech-img"
            :src="require('@/assets/images/tech/nodejs.png')"
            alt=""
          />
        </div>
      </div>
      <div v-if="typesCountMap" class="charts-container">
        <br />
        <h2>Site Statistics</h2>
        <app-chart :typesCountMap="typesCountMap" class="chart"></app-chart>
      </div>
    </div>
  </section>
</template>

<script>
  import appChart from "../cmps/app-chart.vue";
  import appMap from "../cmps/app-map.vue";
  export default {
    name: "about",
    components: {
      appChart,
      appMap,
    },
    props: {},
    created() {},
    data() {
      return {};
    },
    computed: {
      pets() {
        return this.$store.getters.petsToShow;
      },
      typesCountMap() {
        return this.pets.reduce((acc, pet) => {
          if (!acc[pet.type]) {
            acc[pet.type] = 0;
          }
          acc[pet.type]++;
          return acc;
        }, {});
      },
    },
    methods: {},
  };
</script>
