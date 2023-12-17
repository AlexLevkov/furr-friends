<template>
  <section class="main-layout">
    <div class="pet-list-preview">
      <div
        @click="showPetDetails(pet._id)"
        class="pet-card"
        v-for="pet in pets"
        :key="pet._id"
      >
        <h3>{{ pet.name }}</h3>
        <img src="../assets/images/cat-logo.gif">
        <button @click.stop="goToUser(pet.owner._id)">Owend By: {{pet.owner.fullname}} </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "pet-list-preview",
  components: {},
  props: {
    pets: {
      type: Array,
    },
  },
  created() {},
  data() {
    return {
      
    }
  },
  computed: {},
  methods: {
    showPetDetails(petId) {
      this.$router.push(`/pet/${petId}`);
    },
    goToUser(ownerId){
        this.$router.push(`/user/${ownerId}`);
    }
  },
};
</script>
