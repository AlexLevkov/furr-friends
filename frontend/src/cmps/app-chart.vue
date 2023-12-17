<script>
// import VueCharts from 'vue-chartjs'
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  props: {
    typesCountMap: Object,
  },

  mounted() {
    // Overwriting base render method with actual data.
    // console.log("this.typesCountMap:", this.typesCountMap);
    this.renderChart({
      labels: Object.keys(this.typesCountMap),

      datasets: [
        {
          // label: "GitHub Commits",
          backgroundColor: ["#f87979", "#a52010", "#101010", "#15a5b7"],
          data: Object.values(this.typesCountMap),
          // dataset-id-key:Object.values(this.typesCountMap),
        },
      ],
    });
  },
};
</script>
