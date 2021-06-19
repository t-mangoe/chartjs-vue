<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Input Name
        </v-card-title>

        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="名前" v-model="name"></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="done">
            決定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "InputNameDialog",
  data() {
    return {
      dialog: false,
      name: "",
    };
  },
  methods: {
    show: function() {
      this.dialog = true;
    },
    done: function() {
      this.dialog = false;
      const name = this.name;
      this.$emit("input-done", name);
    },
  },
};
</script>
