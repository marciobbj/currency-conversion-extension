<template>
  <div class="main_app">
    <h1>Currency Conversion</h1>
    <div id="header">
      <h2>${{ price }}</h2>
      <h3>{{ this.from }} - {{ this.to }}</h3>
    </div>
    <div class="form_container">
      <div id="pair_group">
        <select id="from" v-model="from">
          <option :value="null" disabled selected>USD...</option>
          <option
            v-for="option in options"
            :value="option.slug"
            :key="option.value"
          >
            {{ option.text }}
          </option>
        </select>
        <select id="to" placeholder="to" v-model="to">
          <option :value="null" disabled selected>EUR..</option>
          <option
            v-for="option in options"
            :value="option.slug"
            :key="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

      <input
        id="user_input"
        placeholder="Price..."
        @input="calculatePrice"
        type="number"
      />
      <p v-if="error">{{ error }}</p>
    </div>
    <footer style="margin: 10px;">mj</footer>
  </div>
</template>

<script>
export default {
  name: "popupView",
  data() {
    return {
      to: null,
      from: null,
      quotes: {},
      error: "",
      price: 0,
      pair: "",
      options: [
        { text: "Dollar", slug: "USD", value: 1 },
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
      this.pair = `${this.from}-${this.to}`;
      this.price = (this.quotes[this.pair] * event.target.value).toFixed(2);
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
  width: 275px;
  height: 220px;
  padding: 0px 25px;
  text-align: center;
  align-self: center;
}
#from {
  width: 100px;
  margin: 0 0 15px 0;
  height: 25px;
  border: 0.3px solid rgb(233, 233, 233);
  border-radius: 5px;
  background-color: rgb(233, 233, 233);
  text-align: center;
  color: rgb(153, 153, 153);
  font-size: 10px;
}
#to {
  width: 100px;
  margin: 0 0 15px 0;
  height: 25px;
  border: 0.3px solid rgb(233, 233, 233);
  border-radius: 5px;
  background-color: rgb(233, 233, 233);
  text-align: center;
  color: rgb(153, 153, 153);
  font-size: 10px;
}
#pair_group {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}
#user_input {
  width: 75px;
  margin: 0 0 15px 0;
  height: 25px;
  border-radius: 5px;
  border: 0.3px solid rgb(233, 233, 233);
  background-color: rgb(233, 233, 233);
  text-align: center;
  color: rgb(153, 153, 153);
  font-size: 10px;
}
#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
  margin: 0;
}
</style>
