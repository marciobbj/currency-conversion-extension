<template>
  <div class="main_app">
    <h1 style="">currency today</h1>
    <div class="form_container">
      <input
        id="user_input"
        placeholder="price"
        @input="updatePrice"
        type="number"
      />
      <div id="header">
        <h2>${{ price }}</h2>
        <h2>{{ this.from }} - {{ this.to }}</h2>
      </div>
      <div id="pair_group">
        <select id="from" v-model="from" @change="fromChangeCurrency">
          <option :value="null" disabled selected>...</option>
          <option
            v-for="option in options"
            :value="option.name"
            :key="option.__id"
          >
            {{ option.name }}
          </option>
        </select>
        <button id="switch" v-html="convertIcon" @click="switchCurrency"/>
        <select id="to" placeholder="to" v-model="to" @change="toChangeCurrency">
          <option :value="null" disabled selected>...</option>
          <option
            v-for="option in options"
            :value="option.name"
            :key="option.__id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
      <b
        ><p v-if="error" style="color: red">{{ error }}</p></b
      >
    </div>
    <footer v-if="!error" style="margin-top: 15px"><b>mj</b></footer>
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
      options: [],
      rawUserInput: 0,
      convertIcon: "<b>&#11138</b>",
    };
  },
  mounted() {
    // check if prices is in storage and prices has any property
    chrome.storage.sync.get("slugs", (result) => {
      this.options = result.slugs.slugs;
    });
    chrome.storage.sync.get("prices", (result) => {
      this.quotes = result.prices;
    });
  },
  unmounted() {
    //chrome.storage.sendMessage({message: "remove-item", key: "prices"})
    chrome.storage.sync.clear();
  },
  methods: {
    updatePrice(event) {
      if (!this.from || !this.to) {
        this.error = "must select a pair";
        return;
      }
      this.pair = `${this.from}-${this.to}`;
      this.price = (this.quotes[this.pair] * event.target.value).toFixed(2);
      this.rawUserInput = event.target.value
      this.error = null;
    },
    switchCurrency() {
      let tempTo = this.to
      let tempFrom = this.from

      this.from = tempTo
      this.to = tempFrom
      this.realCalc(this.rawUserInput)
    },
    toChangeCurrency(event) {
      this.to = event.target.value
      this.realCalc(this.rawUserInput)

    },
    fromChangeCurrency(event) {
      this.from = event.target.value
      this.realCalc(this.rawUserInput)
    },
    realCalc(price) {
      if (!this.from || !this.to) {
        return;
      }
      this.pair = `${this.from}-${this.to}`;
      this.price = (this.quotes[this.pair] * price).toFixed(2);
      this.error = null;
    }
  },
};
</script>

<style>
html {
  background-color: #333333;
  padding: 0;
  margin: 0;
}
.main_app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #333333;
  border: 1px solid #939393;
  border-radius: 4px;
  width: 275px;
  height: 300px;
  padding: 10px;
  margin: 0;
  text-align: center;
  align-self: center;
  color: rgb(255, 255, 255);
}
#from {
  width: 100px;
  margin: 0 0 15px 0;
  height: 35px;
  border-radius: 4px;
  background-color: #333333;
  border: 0.3px solid #939393;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 15px;
}
#to {
  width: 100px;
  margin: 0 0 15px 0;
  height: 35px;
  background-color: #333333;
  border: 0.3px solid #939393;
  border-radius: 4px;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 15px;
}
#switch {
  width: 40px;
  margin: 0 0 15px 0;
  height: 35px;
  background-color: #333333;
  border: 0.3px solid #939393;
  border-radius: 4px;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 15px;
}
#pair_group {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}
#user_input {
  width: 100%;
  margin: 0 0 0 0;
  padding: 0;
  height: 50px;
  border-radius: 4px;
  border: 0.3px solid #939393;
  background-color: #333333;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 22px;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgb(255, 255, 255);
  opacity: 1; /* Firefox */
}
#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
  padding: 10px 20px;
}
</style>
