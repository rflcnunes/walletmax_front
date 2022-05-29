<template>
  <div class="container">
    <NavbarComponent></NavbarComponent>
    <div class="row">
      <div>
        <h5>Hello, {{ userName }}</h5>
        <h5>Total balance: <money disabled class="inputBalance" v-model="totalBalance" v-bind="money"></money></h5>
      </div>
    </div>
    <o-historic></o-historic>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { Money } from "v-money";
import NavbarComponent from "@/components/NavbarComponent";
import OHistoric from "@/components/organisms/OHistoric";

const axios = require('axios').default;

export default {
  name: "HomePageView",
  components: {
    Money,
    NavbarComponent,
    OHistoric
  },
  data() {
    return {
      totalBalance: '',
      userName: '',
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: ' #',
        precision: 2,
        masked: false
      }
    }
  },
  created() {
    this.getBalance();
  },
  methods: {
    getBalance() {
      const token = Cookie.get('_my_app_token');
      axios.get('http://localhost/api/balance/json', {
        headers: {
          'Authorization': "Bearer " + token,
        }
      }).then(response => {
        console.log(response.data.data.value);

        this.userName = response.data.data.username;
        this.totalBalance = response.data.data.value;

      }).catch(function (error) {
        console.log(error);
      })
    },
  }
}
</script>

<style scoped>
.inputBalance {
  border: 0;
  background: none;
  color: black;
}
</style>