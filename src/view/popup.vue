<template>
  <div class="main_app">
    <h1 style="">currency convertion</h1>
    <div class="form_container">
      <input
        id="user_input"
        placeholder="the price..."
        @input="calculatePrice"
        type="number"
      />
      <div id="header">
        <h2>${{ price }}</h2>
        <h2>{{ this.from }} - {{ this.to }}</h2>
      </div>
      <div id="pair_group">
        <select id="from" v-model="from">
          <option :value="null" disabled selected>USD...</option>
          <option
            v-for="option in options"
            :value="option.name"
            :key="option.__id"
          >
            {{ option.name }}
          </option>
        </select>
        <select id="to" placeholder="to" v-model="to">
          <option :value="null" disabled selected>EUR..</option>
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
html {
  background-color: #cecece;
  padding: 0;
}
.main_app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #efefef;
  border: 1px solid #cecece;
  width: 275px;
  height: 300px;
  padding: 0px;
  margin: 0;
  text-align: center;
  align-self: center;
  color: rgb(0, 0, 0);
}
#from {
  width: 100px;
  margin: 0 0 15px 0;
  height: 35px;
  border-radius: 1px;
  background-color: #efefef;
  border: 0.3px solid #3c3c3c7b;
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 15px;
}
#to {
  width: 100px;
  margin: 0 0 15px 0;
  height: 35px;
  background-color: #efefef;
  border: 0.3px solid #3c3c3c7b;
  border-radius: 1px;
  text-align: center;
  color: rgb(0, 0, 0);
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
  border-radius: 0px;
  border: 0.3px solid #cecece;
  background-color: #cecece;
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 22px;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
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
