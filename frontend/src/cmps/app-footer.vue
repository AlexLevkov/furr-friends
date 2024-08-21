<template>
  <section class="main-layout full app-footer">
    <!-- <footer>Copyrights - FurrFriends {{ year }} ©</footer> -->
    <footer>
      Built with 🧡 by &nbsp;<a
        href="https://alexlevkov.com"
        class="footer-link"
      >
        Alex Levkov
      </a>
      &nbsp;| GitHub &nbsp;
      <a href="https://github.com/AlexLevkov/furr-friends" class="footer-link"
        >Repository</a
      >
    </footer>
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

<style scoped>
  .footer-link {
    color: #283b3f;
    text-decoration: underline;
  }

  footer {
    transform: scale(0.8);
    text-wrap: nowrap;
    justify-content: center;
  }
</style>
