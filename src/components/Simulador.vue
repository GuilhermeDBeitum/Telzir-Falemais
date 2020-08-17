<template>
  <v-layout>
    <v-container class="my-4">
      <v-row>
        <v-card class="elevation-16">
          <v-col cols="12" md="12" class="my-10">
            <h4 tile class="text-center my-2">SIMULADOR</h4>
            <br />
            <v-card light outlined tile>
              <hr />

              <v-row>
                <v-col>
                  <v-col cols="12" class="text-center black--text font-weight-black">
                    <p class="black--text font-weight-black">ORIGEM</p>
                    <v-select
                      class="barjust elevation-5"
                      color="blue"
                      autocomplete="off"
                      type="number"
                      :items="origemDdds"
                      @click="trocarInput"
                      label="DDD"
                      v-model="origem"
                      outlined
                    ></v-select>
                  </v-col>
                </v-col>

                <v-col>
                  <v-col cols="12" class="text-center black--text font-weight-black">
                    <p class="black--text font-weight-black">DESTINO</p>
                    <v-select
                      class="barjust elevation-5"
                      color="blue"
                      autocomplete="off"
                      type="number"
                      :items="destinoDdds"
                      @click=" trocarInput"
                      label="DDD"
                      v-model="destino"
                      outlined
                    ></v-select>
                  </v-col>
                </v-col>

                <v-col>
                  <v-col cols="12" class="text-center black--text font-weight-black">
                    <p class="black--text font-weight-black">TEMPO</p>

                    <v-text-field
                      class="barjust elevation-5"
                      autocomplete="off"
                      color="blue"
                      v-model="tempo"
                      type="number"
                      onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                      label="MIN"
                      min="0"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-col>

                <v-col>
                  <v-col cols="12" class="text-center black--text font-weight-black">
                    <p class="black--text font-weight-black">PLANO</p>
                    <v-select
                      class="barjust plano elevation-5"
                      color="blue"
                      autocomplete="off"
                      type="number"
                      :items="planosFale"
                      label="FALEMAIS"
                      v-model="plano"
                      outlined
                    ></v-select>
                  </v-col>
                </v-col>

                <v-col>
                  <v-col class="text-center black--text font-weight-black my-5 elevation-5">
                    <p class="black--text font-weight-black">SEM FALEMAIS</p>
                    <v-data class="barjust">{{ formatarDinheiro(this.calcularSemFalemais()) }}</v-data>
                  </v-col>
                </v-col>

                <v-col>
                  <v-col
                    class="text-center black--text font-weight-black green--text fontsize my-5 elevation-18"
                  >
                    <p class="black--text font-weight-black">COM FALEMAIS</p>
                    <v-data class="barjust">{{ formatarDinheiro(this.calcularComFalemais()) }}</v-data>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>
            <hr />
          </v-col>
        </v-card>
      </v-row>

      <!-- Se quiser um botao para limpar todos os inputs -->

      <!-- <v-row align="center" justify="center">
        <v-btn
          fixed
          dark
          bottom
          @click="resetarVars()"
          class="text-center my-7 elevation-18"
          color="black"
          max-width="190"
        >
          <v-icon>Novo Cálculo</v-icon>
        </v-btn>
      </v-row>-->
    </v-container>
  </v-layout>
</template>

<style lang="scss">
.plano {
  width: 200px;
}
.barjust {
  height: 55px;
}
</style>

<script>
export default {
  components: {},
  nome: "simulador",

  data() {
    return {
      origem: 0,
      destino: 0,
      tempo: null,
      plano: 0,
      valor: 0,
      comFalemais: 0,
      semFalemais: 0,
      origemDdds: ["011", "016", "017", "018"],
      destinoDdds: ["011", "016", "017", "018"],
      planosFale: ["Fale+30", "Fale+60", "Fale+90", "Fale+120"],
    };
  },

  computed: {},

  methods: {
    calcularSemFalemais() {
      let origemC = this.origem;
      let destinoC = this.destino;
      let vTempo = this.tempo;

      let vTotal = 0;
      let tarifa = 0;
      this.tarifa = tarifa;

      if (vTempo < 0) {
        vTempo = null;
      }

      if (origemC === "011" && destinoC === "016") {
        this.tarifa = 1.9;
        vTotal = 1.9 * vTempo;
      } else if (origemC === "016" && destinoC === "011") {
        this.tarifa = 2.9;
        vTotal = 2.9 * vTempo;
      } else if (origemC === "011" && destinoC === "017") {
        this.tarifa = 1.7;
        vTotal = 1.7 * vTempo;
      } else if (origemC === "017" && destinoC === "011") {
        this.tarifa = 2.7;
        vTotal = 2.7 * vTempo;
      } else if (origemC === "011" && destinoC === "018") {
        this.tarifa = 0.9;
        vTotal = 0.9 * vTempo;
      } else if (origemC === "018" && destinoC === "011") {
        this.tarifa = 1.9;
        vTotal = 1.9 * vTempo;
      }

      return vTotal;
    },

    calcularComFalemais() {
      let maisPlano = this.plano;
      let vTempo = this.tempo;
      let vTarifa = this.tarifa;

      let vTotal = 0;
      this.vTotal = vTotal;

      switch (maisPlano) {
        case "Fale+30":
          if (vTempo <= 30) {
            return (this.vTotal = 0);
          } else {
            return (this.vTotal =
              (vTarifa + vTarifa * (10 / 100)) * (vTempo - 30));
          }

        case "Fale+60":
          if (vTempo <= 60) {
            return (this.vTotal = 0);
          } else {
            return (this.vTotal =
              (vTarifa + vTarifa * (10 / 100)) * (vTempo - 60));
          }

        case "Fale+90":
          if (vTempo <= 90) {
            return (this.vTotal = 0);
          } else {
            return (this.vTotal =
              (vTarifa + vTarifa * (10 / 100)) * (vTempo - 90));
          }

        case "Fale+120":
          if (vTempo <= 120) {
            return (this.vTotal = 0);
          } else {
            return (this.vTotal =
              (vTarifa + vTarifa * (10 / 100)) * (vTempo - 120));
          }

        default:
          return (this.vTotal = 0);
      }
    },

    formatarDinheiro(n) {
      return (
        "$ " +
        n
          .toFixed(2)
          .replace(".", ",")
          .replace(/(\d)(?=(\d{3})+,)/g, "$1.")
      );
    },

    trocarInput() {
      let origemC = this.origem;
      let destinoC = this.destino;

      switch (origemC) {
        case "":
          this.destinoDdds = ["", "011", "016", "017", "018"];
          break;
        case "011":
          this.destinoDdds = ["011", "016", "017", "018"];
          break;

        case "016":
          this.destinoDdds = ["011"];
          break;

        case "017":
          this.destinoDdds = ["011"];
          break;

        case "018":
          this.destinoDdds = ["011"];
          break;
        default:
          break;
      }

      switch (destinoC) {
        case "":
          this.origemDdds = ["", "011", "016", "017", "018"];
          break;
        case "011":
          this.origemDdds = ["011", "016", "017", "018"];
          break;

        case "016":
          this.origemDdds = ["011"];
          break;

        case "017":
          this.origemDdds = ["011"];
          break;

        case "018":
          this.origemDdds = ["011"];
          break;
        default:
          break;
      }
    },

    // Se quiser um botao para limpar todos os inputs
    resetarVars() {
      this.origem = 0;
      this.destino = 0;
      this.tempo = null;
      this.plano = 0;
    },
  },
  mounted() {},
};
</script>


