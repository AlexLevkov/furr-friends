<template>
  <section class="pet-filter">
    <label
      >Select Owner:
      <el-select
        v-model="filter.ownerId"
        placeholder="Select Shelter"
        @change="setFilter"
      >
        <el-option
          v-for="user in users"
          :key="user._id"
          :label="user.fullname"
          :value="user._id"
        >
        </el-option>
        <el-option :label="'All Owners'" :value="'all'">All Owners</el-option>
      </el-select>
    </label>

    <label>
      Select Pet Type:
      <el-select
        v-model="filter.type"
        @change="setFilter"
        placeholder="Select Pet Type"
      >
        <el-option :label="'All Pets'" :value="'all'">All</el-option>
        <el-option :label="'Dog'" :value="'dog'">Dog</el-option>
        <el-option :label="'Cat'" :value="'cat'">Cat</el-option>
        <el-option :label="'Fish'" :value="'fish'">Fish</el-option>
        <el-option :label="'Rabbit'" :value="'rabbit'">Rabbit</el-option>
        <el-option :label="'Parrot'" :value="'parrot'">Parrot</el-option>
      </el-select>
    </label>

    <label>
      Select Pet Male/Female:
      <el-select
        v-model="filter.gender"
        @change="setFilter"
        placeholder="Select Pet Male/Female"
      >
        <el-option :label="'All'" :value="'all'">All</el-option>
        <el-option :label="'Male'" :value="'male'">Male</el-option>
        <el-option :label="'Female'" :value="'female'">Female</el-option>
      </el-select>
    </label>

    <label>
      Select Pet Size:
      <el-select
        v-model="filter.size"
        @change="setFilter"
        placeholder="Select Pet Size"
      >
        <el-option :label="'All'" :value="'all'">All</el-option>
        <el-option :label="'Small'" :value="'small'">Small</el-option>
        <el-option :label="'Big'" :value="'big'">Big</el-option>
      </el-select>
    </label>

    <!-- <label for=""> -->
    <button class="clear-filter-btn" @click="clearFilters">
      <i class="fa-solid fa-filter-circle-xmark"></i>Clear Filters
    </button>

    <!-- </label> -->

    <label for="random">Find me a random pet: </label>

    <div class="hvr-icon-spin random-container">
      <img
        id="random"
        @click="randomPet"
        :src="require(`@/assets/images/random.svg`)"
        class="random-img hvr-icon"
      />
    </div>
  </section>
</template>

<script>
  export default {
    name: "pet-filter",
    components: {},
    props: {},
    created() {
      this.filter = JSON.parse(JSON.stringify(this.$store.getters.filterBy));
    },
    destroyed() {
      // this.clearFilters();
    },
    data() {
      return {
        filter: {
          // ownerId: "all",
          // type: "all",
          // gender: "all",
          // size: "all",
          // randomId: null,
        },
        filteredUserNames: ["ARC", "P2S", "A.SOS"],
      };
    },
    computed: {
      users() {
        return this.$store.getters.users.filter((user) => {
          return this.filteredUserNames.includes(user.username);
        });
      },
    },
    methods: {
      search() {
        this.$emit("filterBy", this.filter);
      },
      setFilter() {
        const filterCopy = JSON.parse(JSON.stringify(this.filter));
        this.$store.commit({ type: "setFilterBy", filterCopy });
      },
      randomPet() {
        const pets = this.$store.getters.getAllPets;
        const idsArr = pets.map((pet) => pet._id);
        const id = idsArr[Math.floor(Math.random() * idsArr.length)];
        this.filter.randomId = id;
        const filterCopy = JSON.parse(JSON.stringify(this.filter));
        this.$store.commit({ type: "setFilterBy", filterCopy });
        this.filter.randomId = null;
      },
      clearFilters() {
        this.filter = {
          ownerId: "all",
          type: "all",
          gender: "all",
          size: "all",
        };
        this.setFilter();
      },
    },
    watch: {
      "$route.params": {
        immediate: true,
        handler() {
          this.filter = {
            ownerId: "all",
            type: "all",
            gender: "all",
            size: "all",
          };
          this.setFilter();
        },
      },
    },
  };
</script>
