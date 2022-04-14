<template>
  <div class="main_app">
    <h1>Currency Conversion</h1>
    <h2>$ {{ price }}</h2>

    <h3>{{ this.from }}-{{ this.to }}</h3>

    from:
    <select v-model="from">
      <option
        v-for="option in options"
        :value="option.slug"
        :key="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    to:
    <select v-model="to">
      <option
        v-for="option in options"
        :value="option.slug"
        :key="option.value"
      >
        {{ option.text }}
      </option>
    </select>

    <input style="margin-top: 15px" @input="calculatePrice" type="number" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "popupView",
  data() {
    return {
      msg: 0,
      to: null,
      from: null,
      quotes: {},
      error: "",
      price: 0,
      userInput: 0,
      options: [
        { text: "Dolar", slug: "USD", value: 1 },
        { text: "Euro", slug: "EUR", value: 2 },
        { text: "BRL", slug: "BRL", value: 3 },
      ],
    };
  },
  mounted() {
    chrome.storage.sync.get("prices", (data) => {
      this.quotes = data.prices;
    });
  },
  methods: {
    calculatePrice(event) {
      if (!this.from || !this.to) {
        this.error = "must select a pair";
        return;
      }
      let pair = `${this.from}-${this.to}`;
      console.log(pair);
      this.price = (this.quotes[pair] * event.target.value).toFixed(2);
      this.error = null;
    },
  },
};
</script>

<style>
.main_app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 300px;
  height: 300px;
  text-align: center;
  align-self: center;
}
</style>
