import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  name: "PieChart",
  props: ["chartData", "options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
