<template>
  <section class="main-layout full app-footer">
    <footer>Copyrights - FurrFriends {{ year }} ©</footer>
  </section>
</template>

<script>
  export default {
    name: "app-footer",
    components: {},
    props: {},
    created() {},
    data() {
      return {};
    },
    computed: {
      year() {
        const date = new Date();
        return date.getFullYear();
      },
    },
    methods: {},
  };
</script>
