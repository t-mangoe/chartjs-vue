<template>
  <div>
    <table>
      <template v-for="tr in chartData.labels">
        <tr :key="tr.index">
          <td>{{ tr }}</td>
        </tr>
      </template>
      <tr>
        <th>aa</th>
        <th>bb</th>
      </tr>
    </table>

    <div id="chart-div">
      <PieChart id="chart" :chartData="chartData"></PieChart>
    </div>
  </div>
</template>

<script>
import PieChart from "./PieChart.js";
export default {
  components: {
    PieChart,
  },
  name: "AssetChart",
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Sample1",
            data: [28, 20, 30, 40, 50],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
#chart {
  width: 500px;
  margin-right: 0px;
  margin-left: auto;
}
</style>
