<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="updateChart">update</v-btn>
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in displayedData" :key="item.name">
                <td class="text-left">{{ item.name }}</td>
                <td><v-text-field v-model="item.value"></v-text-field></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          @click="showNameInputDialog"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <div id="chart-div">
          <PieChart id="chart" :chartData="chartData"></PieChart>
        </div>
      </v-col>
    </v-row>
    <InputNameDialog
      @input-done="addTableRow"
      ref="inputNameDialog"
    ></InputNameDialog>
  </v-container>
</template>

<script>
import PieChart from "./PieChart.js";
import InputNameDialog from "./InputNameDialog.vue";
export default {
  components: {
    PieChart,
    InputNameDialog,
  },
  name: "AssetChart",
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Sample1",
            // data: [28, 20, 30, 40, 50],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              // "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              // "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      displayedData: [
        {
          name: "Frozen Yogurt",
          value: 159,
        },
        {
          name: "Ice cream sandwich",
          value: 237,
        },
        // {
        //   name: "Eclair",
        //   value: 262,
        // },
      ],
    };
  },
  mounted: function() {
    this.updateChart();
  },
  methods: {
    addData: function() {
      const newChartData = Object.assign({}, this.chartData);
      newChartData.datasets[0].data.push(10);
      this.chartData = newChartData;
    },
    addTableRow: function(name) {
      console.log(name);
      const rowData = {};
      rowData.name = name;
      rowData.value = 0;
      this.displayedData.push(rowData);
    },
    updateChart: function() {
      const newChartData = Object.assign({}, this.chartData);
      // ラベルを作成
      const newLabel = [];
      // データを作成
      const newData = [];
      for (const item of this.displayedData) {
        newLabel.push(item.name);
        newData.push(item.value);
      }
      newChartData.labels = newLabel;
      newChartData.datasets[0].data = newData;

      this.chartData = newChartData;
    },
    showNameInputDialog: function() {
      this.$refs.inputNameDialog.show();
    },
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
