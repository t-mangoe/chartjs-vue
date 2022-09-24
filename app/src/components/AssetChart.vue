<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn class="ma-5" @click="updateChart">update chart</v-btn>
        <v-btn class="ma-5" @click="registData">regist</v-btn>
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
                <td>
                  <v-btn icon @click="deleteTableRow(item.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
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
import axios from "axios";

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
          id: 0,
          name: "Frozen Yogurt",
          value: 159,
        },
        {
          id: 1,
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
    this.init();
    // this.updateChart();
  },
  methods: {
    init: function() {
      axios
        // CORSエラーが出るので、nginxを導入して対応する => 対応済み
        .get("/express/getData/")
        .then((response) => {
          console.log(response);
          this.displayedData = response.data;
          this.updateChart();
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
    deleteTableRow: function(id) {
      confirm("行を削除する処理です. id = " + id);
      const _this = this;
      axios
        .delete("/express/deleteData/", {
          data: { id },
        })
        .then((response) => {
          console.log(response);
          confirm("削除成功");

          // クライアント側のデータから該当IDのデータを削除
          // for (const item of _this.displayedData) {
          //   if (item.id == id) {
          //     console.log("find delete id !!!!");
          //   }
          // }

          const filterdData = _this.displayedData.filter((item) => {
            return item.id !== id;
          });
          _this.displayedData = filterdData;
        })
        .catch((error) => {
          console.log(error);
          alert("削除失敗");
        });
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
    registData: function() {
      confirm("データを登録します");
      const registedData = this.displayedData;
      axios
        .post("/express/registData/", {
          data: registedData,
        })
        .then((response) => {
          console.log(response);
          confirm("データの登録に成功しました");
        })
        .catch((error) => {
          console.error(error);
          confirm("データの登録に失敗しました");
        });
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
