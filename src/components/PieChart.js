import { Pie, mixins } from "vue-chartjs";

export default {
  extends: Pie,
  name: "PieChart",
  mixins: [mixins.reactiveProp],
  props: ["chartData", "options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
