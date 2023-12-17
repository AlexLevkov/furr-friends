<template>
  <section class="pet-list">
    <div v-if="petsToShowStatus">
      <ul class="pet-preview-container">
        <li v-for="pet in pets" :key="pet._id">
          <pet-preview @edit="edit" :isUserPre="isUserPre" :pet="pet" />
        </li>
      </ul>
      <button class="see-more" v-if="isHomepage" @click="goToOwnersPets">
        See more...
      </button>
    </div>

    <div v-if="petsToShowStatus() === 'No results'">
      <div class="no-results-msg">
        No results found - please select another filter
      </div>
    </div>

    <div v-if="petsToShowStatus() === 'No Data'">
      <ul class="pet-preview-container">
        <li v-for="index in loaderArr" :key="index">
          <div class="pet-card">
            <img
              :src="require(`@/assets/images/loader${loader_idx(index)}.svg`)"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import petPreview from "./pet-preview.vue";
export default {
  name: "pet-list",
  components: {
    petPreview,
  },
  props: {
    pets: {
      type: Array,
    },
    isHomepage: {
      type: Boolean,
      default: false,
    },
    isUserPre: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  data() {
    return {
      loaderArr: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
  computed: {},
  methods: {
    goToOwnersPets() {
      const filterCopy = {
        ownerId: this.pets[0].owner._id,
        type: "all",
      };
      this.$store.commit({ type: "setFilterBy", filterCopy });
      this.$router.push("/pet");
      window.scrollTo(0, 0);
    },
    edit(petToEdit) {
      this.$emit("edit", petToEdit);
    },
    loader_idx(index) {
      if (index % 2 === 0) return "_2";
      else return "";
    },
    petsToShowStatus() {
      if (!this.pets.length) return "No Data";
      if (this.pets[0] === "No results") return "No results";
      else return true;
    },
  },
};
</script>
