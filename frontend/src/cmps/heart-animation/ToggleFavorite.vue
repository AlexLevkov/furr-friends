<template>
  <button class="toggle-favorite" @click.stop="toggle">
    <FavoriteIcon
      class="toggle-favorite__icon"
      :class="iconClasses"
      @animationend.native="onIconAnimationEnds"
    />
    <transition name="favorite-particles-transition">
      <div v-if="animating" class="toggle-favorite__particles"></div>
    </transition>
  </button>
</template>

<script>
  import FavoriteIcon from "@/cmps/heart-animation/FavoriteIcon.vue";
  export default {
    name: "ToggleFavorite",
    props: {
      pet: { type: Object },
    },
    components: {
      FavoriteIcon,
    },
    data() {
      return {
        favorited: false,
        animating: false,
      };
    },
    computed: {
      iconClasses() {
        return {
          "toggle-favorite__icon--favorited": this.favorited,
          "toggle-favorite__icon--animate": this.animating,
        };
      },
    },
    methods: {
      toggle() {
        // Only animate on favoriting.
        let petToAdd = this.pet;
        if (!this.favorited) {
          this.animating = true;
          petToAdd.likes++;
          this.$store.dispatch({ type: "savePet", petToAdd });
        } else {
          petToAdd.likes--;
          this.$store.dispatch({ type: "savePet", petToAdd });
        }
        this.favorited = !this.favorited;
      },
      onIconAnimationEnds() {
        this.animating = false;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $particles-animation-duration: 0.8s;
  $icon-animation-duration: 0.48s;
  $icon-color: #a71d31;
  $icon-border-color: hsl(0, 0%, 10%);

  @keyframes favorite-icon-animation {
    0% {
      opacity: 1;
      transform: scale(0.1);
    }

    50% {
      opacity: 1;
      transform: scale(1.1);
    }

    80% {
      opacity: 1;
      transform: scale(0.9);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes favorite-particles-animation {
    0% {
      background-position: left center;
    }
    100% {
      background-position: right center;
    }
  }

  // Particles animation.
  .favorite-particles-transition-enter-active {
    // background-image: url("/particles-sprite.png");
    background-image: url("~@/assets/images/particles-sprite.png");

    background-size: 2500% auto;
    background-position: left center;
    background-repeat: no-repeat;

    animation-duration: $particles-animation-duration;
    animation-timing-function: steps(24);
    animation-name: favorite-particles-animation;
  }

  .toggle-favorite {
    font-size: 20px;
    position: relative;
    // position: absolute;
    // right: 2%;
    // top: 1%;
    padding: 0;

    &:hover {
      background: none !important;
    }

    &__icon {
      height: 2.2em;
      width: 2.2em;
      margin: 5px;

      // Transition mainly for when un-favoriting
      transition: fill-opacity 0.2s, stroke 0.2s;
      fill: rgba(245, 245, 245, 0.75);
      stroke: #2d2d2d;
 

      &--favorited {
        fill-opacity: 1;
        stroke: $icon-color;
        fill: url(#grad1);
      }

      // Icon animation
      &--animate {
        opacity: 0;
        transform: scale(0);
        animation-duration: $icon-animation-duration;
        animation-delay: $particles-animation-duration -
          $icon-animation-duration;
        animation-name: favorite-icon-animation;
      }
    }

    &__particles {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 5em;
      height: 5em;
    }
  }
</style>
