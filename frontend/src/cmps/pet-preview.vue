<template>
  <section class="pet-preview">
    <article v-if="pet" class="pet-card" @click="showPetDetails(pet._id)">
      <div class="pet-likes-container">
        <ToggleFavorite :pet="this.pet" />
      </div>

      <div class="pet-card-img-container">
        <img :src="require('@/assets/images/animal/' + petImg)" />
      </div>

      <div class="pet-card-info">
        <h2>
          {{ pet.name }}
        </h2>
        <div class="pet-edit-container" v-if="isUserPre">
          <button @click.stop="editPet">Edit</button>
          <button @click.stop="removePet">Delete</button>
        </div>
        <div class="pet-card-age-gender" v-else>
          <span>{{ pet.age }} y.o.</span>
          <span
            :class="{
              'pet-gender-male pet-tag': pet.gender === 'male',
              'pet-gender-female pet-tag': pet.gender === 'female',
            }"
          ></span>
        </div>

        <div class="pet-card-info-extra">
          {{ pet.owner.fullname }}
          <span class="pet-likes-cnt">{{ pet.likes }} Likes</span>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import ToggleFavorite from "@/cmps/heart-animation/ToggleFavorite.vue";
export default {
  name: "pet-preview",
  components: {
    ToggleFavorite,
  },
  props: {
    pet: {
      type: Object,
    },
    isUserPre: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  data() {
    return {};
  },
  computed: {
    petImg() {
      if (this.pet.imgUrl) {
        return this.pet.imgUrl[0];
      } else {
        return "cat-logo.gif";
      }
    },
  },
  methods: {
    showPetDetails() {
      this.$router.push({
        name: "pet-details",
        params: { petId: this.pet._id },
      });
    },
    removePet() {
      this.$store.dispatch({ type: "removePet", petId: this.pet._id });
    },
    editPet() {
      const petToEdit = JSON.parse(JSON.stringify(this.pet));
      this.$emit("edit", petToEdit);
    },
  },
};
</script>
